import { UserEntity } from '../entities';
import { RegisterUserDto } from '../dtos/auth/register-user.dto';



export abstract class IAuthRepository {

    // abstract login(registerUserDto: RegisterUserDto): Promise<UserEntity>;
    abstract registerUser(registerUserDto: RegisterUserDto): Promise<UserEntity>;

}
