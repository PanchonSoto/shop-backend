import { UserEntity } from "../entities";


export abstract class IUserDataSource {


    abstract getUsers(): Promise<UserEntity[]>;

    abstract deleteUser(id: number): Promise<void>;

    abstract updateUser(userId: number, data: Partial<UserEntity>): Promise<UserEntity>;



}
