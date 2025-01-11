import { CustomError } from "../../domain/errors/custom.error";
import { IAuthDatasource } from "../../domain/datasources";
import { RegisterUserDto } from "../../domain/dtos";
import { UserEntity, UserRole } from "../../domain/entities";



export class AuthDataSource implements IAuthDatasource {

    loginUser(): Promise<string> {
        throw new Error("Method not implemented.");
    }

    registerUser(registerUserDto: RegisterUserDto): Promise<UserEntity> {

        const { email, password, name, role } = registerUserDto;

        try {

            const user = new UserEntity(
                "1",
                name,
                email,
                password,
                UserRole.CLIENTE,
                new Date(),
                new Date()
            );

            return Promise.resolve(user);


        } catch (error) {

            if(error instanceof Error){
                throw error;
            }

            throw CustomError.interlServerError();

        }

    }

}
