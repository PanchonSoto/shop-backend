import { IUserRepository } from '../../repositories/user.repository.interface';







export class DeleteUser {

    constructor(
        private readonly userRepository: IUserRepository,
    ){}

    async execute(id: number): Promise<void> {
        await this.userRepository.deleteUser(id);
    }

}
