import { JwtAdapter } from "../../../config/jwt";
import { RegisterUserDto } from "../../dtos/auth/register-user.dto";
import { CustomError } from "../../errors/custom.error";
import { IAuthRepository } from "../../repositories";

interface UserToken {
  token: string;
  user: {
    id: number;
    name: string;
    email: string;
  };
}

interface RegisterUserUseCase {
  execute(registerUserDto: RegisterUserDto): Promise<UserToken>;
}

type SignToken = (payload: Object, duration: string) => Promise<unknown>;

export class RegisterUser implements RegisterUserUseCase {
  constructor(
    private readonly authRepository: IAuthRepository,
    private readonly signToken: SignToken = JwtAdapter.generateToken
  ) {}

  async execute(registerUserDto: RegisterUserDto): Promise<UserToken> {
    const user = await this.authRepository.registerUser(registerUserDto);

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
