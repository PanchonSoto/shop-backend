import { BcryptAdapter } from "../../config";
import { CustomError } from "../../domain/errors/custom.error";
import { IAuthDatasource } from "../../domain/datasources";
import { RegisterUserDto } from "../../domain/dtos";
import { UserEntity } from "../../domain/entities";
import { UsersModel } from "../../data/postgres/models/user.model";



type HashFunction = (password: string) => string;
type CompareFunction = (password: string, hashed: string) => boolean;


export class AuthDataSource implements IAuthDatasource {

    constructor(
        private readonly hashPass: HashFunction = BcryptAdapter.hash,
        private readonly comparePass: CompareFunction = BcryptAdapter.compare,
    ) { }


    loginUser(): Promise<string> {
        throw new Error("Method not implemented.");
    }

    async registerUser(registerUserDto: RegisterUserDto): Promise<UserEntity> {

        const { email, password, name, role } = registerUserDto;

        try {

            const exist = await UsersModel.findOne({
                where: { email: email }
            });
            if (exist) throw CustomError.badRequest('User already exists');

            const user = await UsersModel.create({
                email,
                password: this.hashPass(password),
                name,
                role,
            });



            // return {
            //     id: user.id!,
            //     email: user.email,
            //     name: user.name,
            //     role: user.role,
            //     password: "",
            // }

            return new UserEntity(
                user.id!,
                user.email,
                user.name,
                user.role,
                "",
            );

            // return Promise.resolve(user);


        } catch (error) {
            console.log({ error })
            if (error instanceof Error) {
                throw error;
            }

            throw CustomError.interlServerError();

        }

    }

}
