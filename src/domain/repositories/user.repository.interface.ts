import { UserEntity } from '../entities';



export abstract class IUserRepository {

    abstract getUsers(): Promise<UserEntity[]>;

    abstract deleteUser(id: number): Promise<void>;

    abstract updateUser(userId: number, data: Partial<UserEntity>): Promise<UserEntity>;

}
