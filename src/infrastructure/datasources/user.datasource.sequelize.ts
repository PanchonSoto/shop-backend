import { CustomError } from "../../domain/errors/custom.error";
import { IUserDataSource } from "../../domain/datasources";
import { UsersModel } from "../../data/postgres/models/user.model";
import { UserEntity } from "../../domain/entities";



export class UserDataSource implements IUserDataSource {

    constructor(){}




    async updateUser(userId: number, data: Partial<UserEntity>): Promise<UserEntity> {

        try {
            const [updatedRows, [updatedUser]] = await UsersModel.update(data, {
                where: { id: userId },
                returning: true,
            });

            if (updatedRows === 0) {
                throw CustomError.notFound('User does not exist');
            }

            return new UserEntity(
                updatedUser.id!,
                updatedUser.name,
                updatedUser.email,
                "",
                updatedUser.role,
                updatedUser.is_verified!
            );

        } catch (error) {
            console.log({ error })
            if (error instanceof Error) {
                throw error;
            }

            throw CustomError.interlServerError();
        }


    }




    async getUsers(): Promise<UserEntity[]> {
        try {
            const users = await UsersModel.findAll();



            return users.map(user => new UserEntity(
                user.dataValues.id!,
                user.dataValues.name,
                user.dataValues.email,
                "",
                user.dataValues.role,
                user.dataValues.is_verified!,
            ));

        } catch (error) {
            console.log({ error })
            if (error instanceof Error) {
                throw error;
            }

            throw CustomError.interlServerError();
        }
    }




    async deleteUser(id: number): Promise<void> {
        try {
            const exist = await UsersModel.findOne({
                where: { id: id }
            });

            if (exist==null) throw CustomError.notFound('User does not exist');

            await exist.destroy();

        } catch (error) {

            console.log({ error })
            if (error instanceof Error) {
                throw error;
            }

            throw CustomError.interlServerError();
        }
    }

}
