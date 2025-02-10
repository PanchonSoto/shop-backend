import { Op } from "sequelize";

import { CreateProductDto } from "../../domain/dtos/products/create-product.dto";
import { CustomError } from "../../domain/errors/custom.error";
import { IProductDataSource } from "../../domain/datasources";
import { ProductEntity } from "../../domain/entities";

import { ProductModel } from "../../data/postgres/models/products.model";
import { StoreModel } from "../../data/postgres/models/store.model";

export class ProductsDataSource implements IProductDataSource {
  constructor() {}

  async getProductById(id: number): Promise<ProductEntity | null> {
    const product = await ProductModel.findByPk(id);

    if (!product) return null;

    return new ProductEntity(
      product.id!,
      product.store_id,
      product.name,
      product.stock,
      product.price,
      product.available
    );
  }

  async getProducts(
    searchParam?: string,
    storeId?: number
  ): Promise<ProductEntity[]> {
    //sequelize conditions
    const whereCondition: any = {};

    //if search param add condition to search
    if (searchParam) {
      //verify if number of search param is number
      if (!isNaN(Number(searchParam))) {
        whereCondition.id = Number(searchParam);
      } else {
        whereCondition.name = { [Op.iLike]: `%${searchParam}%` };
      }
    }
    //if user is store search its products
    if (storeId) {
      whereCondition.store_id = storeId;
    }

    const products = await ProductModel.findAll({ where: whereCondition });

    return products.map(
      (product) =>
        new ProductEntity(
          product.id!,
          product.store_id,
          product.name,
          product.stock,
          product.price,
          product.available
        )
    );
  }

  async createProduct(
    createProductDto: CreateProductDto
  ): Promise<ProductEntity> {
    const { available, name, store_id, price, stock } = createProductDto;

    try {
      //todo: probably must move this store validation to an use case or service
      const existStore = await StoreModel.count({
        where: { id: store_id },
      });
      if (existStore === 0)
        throw CustomError.badRequest("Store does not exists");

      const createdProduct = await ProductModel.create({
        available,
        name,
        store_id,
        price,
        stock,
      });

      return new ProductEntity(
        createdProduct.id!,
        createdProduct.store_id,
        createdProduct.name,
        createdProduct.stock,
        createdProduct.price,
        createdProduct.available
      );
    } catch (error) {
      console.log({ error });
      if (error instanceof Error) {
        throw error;
      }

      throw CustomError.interlServerError();
    }
  }

  async deleteProduct(id: number): Promise<void> {
    try {
      const product = await ProductModel.findByPk(id);

      if (!product) {
        throw CustomError.badRequest("product does not exist.");
      }

      await product.destroy();
    } catch (error) {
      console.log({ error });
      if (error instanceof Error) {
        throw error;
      }

      throw CustomError.interlServerError();
    }
  }

  async updateProduct(
    ProductId: number,
    data: Partial<ProductEntity>
  ): Promise<ProductEntity> {
    try {
      const [updatedRows, [updatedProduct]] = await ProductModel.update(data, {
        where: { id: ProductId },
        returning: true,
      });

      if (updatedRows === 0) {
        throw CustomError.notFound("Store or user-store relation not exist.");
      }

      return new ProductEntity(
        updatedProduct.id!,
        updatedProduct.store_id,
        updatedProduct.name,
        updatedProduct.stock,
        updatedProduct.price,
        updatedProduct.available
      );
    } catch (error) {
      console.log({ error });
      if (error instanceof Error) {
        throw error;
      }

      throw CustomError.interlServerError();
    }
  }
}
