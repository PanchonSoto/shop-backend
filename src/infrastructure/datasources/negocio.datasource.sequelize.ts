import { CustomError } from "../../domain/errors/custom.error";
import { INegocioDataSource } from "../../domain/datasources";
import { NegocioEntity } from "../../domain/entities";

import { NegocioModel } from "../../data/postgres/models/negocio.model";
import { UsersModel } from "../../data/postgres/models/user.model";

export class NegocioDataSource implements INegocioDataSource {
  constructor() {}

  async getNegocioByUser(userId: number): Promise<NegocioEntity> {
    try {
      const userNegocio = await NegocioModel.findOne({
        where: { user_id: userId },
      });

      //todo: consider return a null to validate on use cases.
      if (!userNegocio)
        throw CustomError.badRequest("User negocio does not exists.");

      return new NegocioEntity(
        userNegocio.id!,
        userNegocio.name,
        userNegocio.user_id
      );
    } catch (error) {
      console.log({ error });
      if (error instanceof Error) {
        throw error;
      }

      throw CustomError.interlServerError();
    }
  }

  async getNegocios(): Promise<NegocioEntity[]> {
    try {
      const negocios = await NegocioModel.findAll();

      return negocios.map(
        (negocio) =>
          new NegocioEntity(negocio.id!, negocio.name, negocio.user_id)
      );
    } catch (error) {
      console.log({ error });
      if (error instanceof Error) {
        throw error;
      }

      throw CustomError.interlServerError();
    }
  }

  async createNegocio(userId: number, name: string): Promise<NegocioEntity> {
    try {
      const existNegocio = await NegocioModel.findOne({
        where: { name: name },
      });
      if (existNegocio) throw CustomError.badRequest("Negocio already exists");

      const existUserNegocio = await NegocioModel.findOne({
        where: { user_id: userId },
      });
      if (existUserNegocio)
        throw CustomError.badRequest("User already have a negocio.");

      const userExists = await UsersModel.count({
        where: { id: userId },
      });
      if (userExists === 0) throw CustomError.badRequest("User does not exist");

      const createdNegocio = await NegocioModel.create({
        name: name,
        user_id: userId,
      });

      return new NegocioEntity(
        createdNegocio.id!,
        createdNegocio.name,
        createdNegocio.user_id
      );
    } catch (error) {
      console.log({ error });
      if (error instanceof Error) {
        throw error;
      }

      throw CustomError.interlServerError();
    }
  }

  async deleteNegocio(id: number): Promise<void> {
    try {
      const negocio = await NegocioModel.findByPk(id);

      if (!negocio) {
        throw CustomError.badRequest("Negocio does not exist.");
      }

      await negocio.destroy();
    } catch (error) {
      console.log({ error });
      if (error instanceof Error) {
        throw error;
      }

      throw CustomError.interlServerError();
    }
  }

  async updateNegocio(
    negocioId: number,
    data: Partial<NegocioEntity>
  ): Promise<NegocioEntity> {
    try {
      const [updatedRows, [updatedNegocio]] = await NegocioModel.update(data, {
        where: { id: negocioId, user_id: data.user_id },
        returning: true,
      });

      if (updatedRows === 0) {
        throw CustomError.notFound(
          "Negocio or user-negocio relation not exist."
        );
      }

      return new NegocioEntity(
        updatedNegocio.id!,
        updatedNegocio.name,
        updatedNegocio.user_id
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
