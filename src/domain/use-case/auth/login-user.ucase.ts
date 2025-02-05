import { JwtAdapter } from "../../../config/jwt";
import { RegisterUserDto } from "../../dtos/auth/register-user.dto";
import { CustomError } from "../../errors/custom.error";
import { IAuthRepository } from "../../repositories";
import { LoginUserDto } from "../../dtos/auth/login-user.dto";

interface UserToken {
  token: string;
  user: {
    id: number;
    name: string;
    email: string;
  };
}

interface LoginUserUseCase {
  execute(loginUserDto: LoginUserDto): Promise<UserToken>;
}

type SignToken = (payload: Object, duration: string) => Promise<unknown>;

export class LoginUser implements LoginUserUseCase {
  constructor(
    private readonly authRepository: IAuthRepository,
    private readonly signToken: SignToken = JwtAdapter.generateToken
  ) {}

  async execute(loginUserDto: LoginUserDto): Promise<UserToken> {
    const user = await this.authRepository.loginUser(loginUserDto);

    const userPayload = { id: user.id, name: user.name, email: user.email };

    const token = await this.signToken({ user: userPayload }, "5d");

    if (!token) throw CustomError.interlServerError("Create token error");

    return {
      token: token.toString(),
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
      },
    };
  }
}
