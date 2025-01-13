import { Request, Response} from "express";

import { IProductRepository } from "../../domain/repositories";
import { CreateProduct, DeleteProduct, GetProducts, UpdateProduct } from "../../domain/use-case";

import { handleError } from "../../shared/handleError";
import { CreateProductDto } from "../../domain/dtos/products/create-product.dto";


interface ProductFields {
    id: number,
    negocio_id: string,
    name: string,
    stock: number,
    price: number,
    available: boolean,
}

export class ProductsController {

    constructor(
        private readonly productRepository: IProductRepository
    ){}



    getProducts = (req: Request, res: Response) => {

        new GetProducts(this.productRepository)
            .execute()
            .then((users)=>res.status(200).json(users))
            .catch(error => handleError(error, res));

    }

    createProduct = (req: Request, res: Response) => {

        const [error, createUserDto] = CreateProductDto.create(req.body);

        console.log("errr arr", error);
        if(error?.length) return res.status(400).json({error});

        new CreateProduct(this.productRepository)
            .execute(createUserDto!)
            .then((user)=>res.status(200).json(user))
            .catch(error => handleError(error, res));

    }

    updateProduct = (req: Request, res: Response) => {

        const productId = Number(req.params.productId);

        if (isNaN(productId)) {
            return res.status(400).json({error:'Invalid id.'});
        }


        const { negocio_id, name, stock, price, available, } = req.body;

        if (!name || !productId) {
            return res.status(400).json({ error: 'name, productId are required.' });
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
            return res.status(400).json({ error: 'At least one field must be provided to update.' });
        }

        new UpdateProduct(this.productRepository)
            .execute(productId, updateData)
            .then((user)=>res.status(200).json(user))
            .catch(error => handleError(error, res));

    }

    deleteProduct = (req: Request, res: Response) => {

        const productId = Number(req.params.productId);

        if(!productId) return res.sendStatus(400).json({error:'productId is required.'});

        new DeleteProduct(this.productRepository)
            .execute(productId)
            .then(()=>res.sendStatus(204))
            .catch(error => handleError(error, res));

    }
}
