import { UserEntity } from '../../entities';
import { IUserRepository } from '../../repositories/user.repository.interface';







export class UpdateUser {

    constructor(
        private readonly userRepository: IUserRepository,
    ){}

    async execute(userId: number, data: Partial<UserEntity>): Promise<UserEntity> {
        return await this.userRepository.updateUser(userId, data);
    }

}
