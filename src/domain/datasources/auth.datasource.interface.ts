import { UserEntity } from "../entities";
import { RegisterUserDto } from '../dtos/auth/register-user.dto';
import { LoginUserDto } from "../dtos/auth/login-user.dto";



export abstract class IAuthDatasource {

    abstract loginUser(loginUserDto: LoginUserDto): Promise<UserEntity>;

    abstract registerUser(registerUserDto: RegisterUserDto): Promise<UserEntity>;

    abstract activateAccount(email: string): Promise<any>;


}
