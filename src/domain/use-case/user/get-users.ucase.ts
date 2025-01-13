import { UserEntity } from '../../entities';
import { IUserRepository } from '../../repositories/user.repository.interface';







export class GetUsers {

    constructor(
        private readonly userRepository: IUserRepository,
    ){}

    async execute(): Promise<UserEntity[]> {
        return await this.userRepository.getUsers();
    }

}
