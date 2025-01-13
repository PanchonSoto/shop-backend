import { IUserDataSource } from "../../domain/datasources";
import { UserEntity } from "../../domain/entities";
import { IUserRepository } from "../../domain/repositories";





export class UserRepository implements IUserRepository {


    constructor(
        private readonly userDataSource: IUserDataSource
    ) {}



    updateUser(userId: number, data: Partial<UserEntity>): Promise<UserEntity> {
        return this.userDataSource.updateUser(userId, data);
    }


    getUsers(): Promise<UserEntity[]> {
        return this.userDataSource.getUsers();
    }


    deleteUser(id: number): Promise<void> {
        return this.userDataSource.deleteUser(id);
    }


}
