import { BcryptAdapter } from "../../config";
import { CustomError } from "../../domain/errors/custom.error";
import { IAuthDatasource } from "../../domain/datasources";
import { RegisterUserDto } from "../../domain/dtos";
import { UserEntity } from "../../domain/entities";
import { UsersModel } from "../../data/postgres/models/user.model";
import { LoginUserDto } from '../../domain/dtos/auth/login-user.dto';



type HashFunction = (password: string) => string;
type CompareFunction = (password: string, hashed: string) => boolean;


export class AuthDataSource implements IAuthDatasource {

    constructor(
        private readonly hashPass: HashFunction = BcryptAdapter.hash,
        private readonly comparePass: CompareFunction = BcryptAdapter.compare,
    ) { }




    async activateAccount(email: string): Promise<any> {
        const user = await UsersModel.findOne({ where: { email } });

        if (!user) {
            throw CustomError.notFound('user not found');
        }

        if (user.is_verified) {
          throw CustomError.badRequest('account already active');
        }

        const activatedUser = await user.update({ is_verified: true });

        return activatedUser;

    }

    async loginUser(loginUserDto: LoginUserDto): Promise<UserEntity> {

        const { email } = loginUserDto;

        try {

            const exist = await UsersModel.findOne({
                where: { email: email }
            });
            if (!exist) throw CustomError.badRequest('User does not exist');

            if(!exist.is_verified) throw CustomError.forbidden('Access deneid please activate your account.');

            const match = BcryptAdapter.compare(loginUserDto.password, exist.password);
            if(!match) throw CustomError.badRequest('Incorrect credentials');

            const { password, ...userWithoutPassword } = exist;

            return new UserEntity(
                userWithoutPassword.dataValues.id!,
                userWithoutPassword.dataValues.name,
                userWithoutPassword.dataValues.email,
                "",
                userWithoutPassword.dataValues.role,
                userWithoutPassword.dataValues.is_verified!,
            );

        } catch (error) {

            console.log({ error })
            if (error instanceof Error) {
                throw error;
            }

            throw CustomError.interlServerError();
        }

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

            return new UserEntity(
                user.id!,
                user.email,
                user.name,
                user.role,
                "",
                user.is_verified!
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
