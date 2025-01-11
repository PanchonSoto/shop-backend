import { IAuthDatasource } from "../../domain/datasources";
import { IAuthRepository } from "../../domain/repositories/auth.repository.interface";
import { RegisterUserDto } from "../../domain/dtos";
import { UserEntity } from "../../domain/entities";




export class AuthRepository implements IAuthRepository {


    constructor(
        private readonly authDataSource: IAuthDatasource
    ) {}


    registerUser(registerUserDto: RegisterUserDto): Promise<UserEntity> {
        return this.authDataSource.registerUser(registerUserDto);
    }


}
