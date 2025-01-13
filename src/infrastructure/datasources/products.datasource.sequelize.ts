import { CustomError } from "../../domain/errors/custom.error";
import { IProductDataSource } from "../../domain/datasources";
import { ProductEntity } from "../../domain/entities";
import { CreateProductDto } from "../../domain/dtos/products/create-product.dto";

import { ProductModel } from "../../data/postgres/models/products.model";
import { NegocioModel } from "../../data/postgres/models/negocio.model";


export class ProductsDataSource implements IProductDataSource {


    constructor(){}


    async getProducts(): Promise<ProductEntity[]> {

        try {

            const products = await ProductModel.findAll();


            return products.map(product => new ProductEntity(
                product.id!,
                product.negocio_id,
                product.name,
                product.stock,
                product.price,
                product.available,
            ));


        } catch (error) {
            console.log({ error })
            if (error instanceof Error) {
                throw error;
            }

            throw CustomError.interlServerError();
        }

    }

    async createProduct(createProductDto: CreateProductDto): Promise<ProductEntity> {

        const { available, name, negocio_id, price, stock } = createProductDto;

        try {

            const existNegocio = await NegocioModel.count({
                where: { id: negocio_id }
            });
            if (existNegocio===0) throw CustomError.badRequest('Negocio does not exists');

            const createdProduct = await ProductModel.create({
                available,
                name,
                negocio_id,
                price,
                stock,
            });

            return new ProductEntity(
                createdProduct.id!,
                createdProduct.negocio_id,
                createdProduct.name,
                createdProduct.stock,
                createdProduct.price,
                createdProduct.available,
            );

        } catch (error) {
            console.log({ error })
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
                throw CustomError.badRequest('product does not exist.');
            }

            await product.destroy();

        } catch (error) {
            console.log({ error })
            if (error instanceof Error) {
                throw error;
            }

            throw CustomError.interlServerError();
        }
    }

    async updateProduct(ProductId: number, data: Partial<ProductEntity>): Promise<ProductEntity> {

        try {

        const [updatedRows, [updatedProduct]] = await ProductModel.update(data, {
            where: { id: ProductId },
            returning: true,
        });

        if (updatedRows===0) {
            throw CustomError.notFound('Negocio or user-negocio relation not exist.');
        }

        return new ProductEntity(
            updatedProduct.id!,
            updatedProduct.negocio_id,
            updatedProduct.name,
            updatedProduct.stock,
            updatedProduct.price,
            updatedProduct.available,
        );


        } catch (error) {
            console.log({ error })
            if (error instanceof Error) {
                throw error;
            }

            throw CustomError.interlServerError();
        }
    }

}
