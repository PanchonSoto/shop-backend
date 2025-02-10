import { Request, Response } from "express";

import {
  INegocioRepository,
  IProductRepository,
} from "../../domain/repositories";
import {
  CreateProduct,
  DeleteProduct,
  GetProducts,
  UpdateProduct,
} from "../../domain/use-case";

import { handleError } from "../../shared/handleError";
import { CreateProductDto } from "../../domain/dtos/products/create-product.dto";

interface ProductFields {
  id: number;
  negocio_id: number;
  name: string;
  stock: number;
  price: number;
  available: boolean;
}

export class ProductsController {
  constructor(
    private readonly productRepository: IProductRepository,
    private readonly negocioRepository: INegocioRepository
  ) {}

  getProducts = (req: Request, res: Response) => {
    const user = req.user;
    const search = req.query.search as string | undefined;

    new GetProducts(this.productRepository, this.negocioRepository)
      .execute(user!, search)
      .then((products) => res.status(200).json(products))
      .catch((error) => handleError(error, res));
  };

  createProduct = (req: Request, res: Response) => {
    const [error, createProductDto] = CreateProductDto.create(req.body);
    const user = req.user;

    if (error?.length) return res.status(400).json({ error });

    new CreateProduct(this.productRepository, this.negocioRepository)
      .execute(user!, createProductDto!)
      .then((createdProduct) => res.status(200).json(createdProduct))
      .catch((error) => handleError(error, res));
  };

  updateProduct = (req: Request, res: Response) => {
    const productId = Number(req.params.productId);

    if (isNaN(productId)) {
      return res.status(400).json({ error: "Invalid id." });
    }

    const { negocio_id, name, stock, price, available } = req.body;
    const user = req.user;

    if (!name || !productId) {
      return res.status(400).json({ error: "name, productId are required." });
    }

    const updateData: Partial<ProductFields> = {
      ...(productId && { productId }),
      ...(name && { name }),
      ...(negocio_id && { negocio_id }),
      ...(stock !== undefined && { stock }),
      ...(price !== undefined && { price }),
      ...(available !== undefined && { available }),
    };

    if (Object.keys(updateData).length === 0) {
      return res
        .status(400)
        .json({ error: "At least one field must be provided to update." });
    }

    new UpdateProduct(this.productRepository, this.negocioRepository)
      .execute(user!, productId, updateData)
      .then((updatedProduct) => res.status(200).json(updatedProduct))
      .catch((error) => handleError(error, res));
  };

  deleteProduct = (req: Request, res: Response) => {
    const productId = Number(req.params.productId);
    const user = req.user;

    if (!productId)
      return res.sendStatus(400).json({ error: "productId is required." });

    new DeleteProduct(this.productRepository, this.negocioRepository)
      .execute(productId, user!)
      .then(() => res.sendStatus(204))
      .catch((error) => handleError(error, res));
  };
}
