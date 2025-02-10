import { CustomError } from "../../domain/errors/custom.error";
import { IStoreDataSource } from "../../domain/datasources";
import { StoreEntity } from "../../domain/entities";

import { StoreModel } from "../../data/postgres/models/store.model";
import { UsersModel } from "../../data/postgres/models/user.model";

export class StoreDataSource implements IStoreDataSource {
  constructor() {}

  //obtain stores by name and id
  async verifyStoreExists(storeId?: number, name?: string): Promise<number> {
    try {
      const whereCondition: any = {};

      if (storeId) {
        whereCondition.id = storeId;
      }
      if (name) {
        whereCondition.name = name;
      }

      const existStore = await StoreModel.count({
        where: whereCondition,
      });

      return existStore;
    } catch (error) {
      throw CustomError.interlServerError("Internal server error");
    }
  }

  async getStoreByUser(userId: number): Promise<StoreEntity | null> {
    try {
      const userStore = await StoreModel.findOne({
        where: { user_id: userId },
      });

      if (!userStore) return null;

      return new StoreEntity(userStore.id!, userStore.name, userStore.user_id);
    } catch (error) {
      throw CustomError.interlServerError();
    }
  }

  async getStores(): Promise<StoreEntity[]> {
    try {
      const stores = await StoreModel.findAll();

      return stores.map(
        (store) => new StoreEntity(store.id!, store.name, store.user_id)
      );
    } catch (error) {
      throw CustomError.interlServerError();
    }
  }

  async createStore(userId: number, name: string): Promise<StoreEntity> {
    try {
      const userExists = await UsersModel.count({
        where: { id: userId },
      });
      if (userExists === 0) throw CustomError.badRequest("User does not exist");

      const createdStore = await StoreModel.create({
        name: name,
        user_id: userId,
      });

      return new StoreEntity(
        createdStore.id!,
        createdStore.name,
        createdStore.user_id
      );
    } catch (error) {
      console.log({ error });
      if (error instanceof Error) {
        throw error;
      }

      throw CustomError.interlServerError();
    }
  }

  async deleteStore(id: number): Promise<void> {
    try {
      const store = await StoreModel.findByPk(id);

      if (!store) {
        throw CustomError.notFound("Store does not exist.");
      }

      await store.destroy();
    } catch (error) {
      console.log({ error });
      if (error instanceof Error) {
        throw error;
      }

      throw CustomError.interlServerError();
    }
  }

  async updateStore(
    storeId: number,
    data: Partial<StoreEntity>
  ): Promise<StoreEntity> {
    try {
      const [updatedRows, [updatedStore]] = await StoreModel.update(data, {
        where: { id: storeId, user_id: data.user_id },
        returning: true,
      });

      if (updatedRows === 0) {
        throw CustomError.notFound("Store or user-store relation not exist.");
      }

      return new StoreEntity(
        updatedStore.id!,
        updatedStore.name,
        updatedStore.user_id
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
