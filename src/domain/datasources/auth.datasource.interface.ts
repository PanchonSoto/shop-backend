import { UserEntity } from "../entities";
import { RegisterUserDto } from '../dtos/auth/register-user.dto';



export abstract class IAuthDatasource {

    abstract loginUser(): Promise<string>;

    abstract registerUser(registerUserDto: RegisterUserDto): Promise<UserEntity>;



}
