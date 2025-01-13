import { IAuthDatasource } from "../../domain/datasources";
import { IAuthRepository } from "../../domain/repositories";
import { RegisterUserDto } from "../../domain/dtos";
import { UserEntity } from "../../domain/entities";
import { LoginUserDto } from '../../domain/dtos/auth/login-user.dto';




export class AuthRepository implements IAuthRepository {


    constructor(
        private readonly authDataSource: IAuthDatasource
    ) {}



    activateAccount(email: string): Promise<any> {
        return this.authDataSource.activateAccount(email);
    }

    registerUser(registerUserDto: RegisterUserDto): Promise<UserEntity> {
        return this.authDataSource.registerUser(registerUserDto);
    }

    loginUser(loginUserDto: LoginUserDto): Promise<UserEntity>{
        return this.authDataSource.loginUser(loginUserDto);
    }


}
