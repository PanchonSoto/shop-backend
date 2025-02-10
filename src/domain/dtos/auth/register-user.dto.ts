import { RegexUtils } from "../../../config/regex-utils";

export class RegisterUserDto {
  private constructor(
    public name: string,
    public email: string,
    public password: string,
    public role: string
  ) {}

  static create(object: { [key: string]: any }): [string?, RegisterUserDto?] {
    const { name, email, password, role } = object;

    if (!name) return ["name is required"];

    if (!email) return ["email is required"];
    if (!RegexUtils.email.test(email)) return ["email is invalid"];

    if (!password) return ["password is required"];
    if (!RegexUtils.password.test(password))
      return [
        "password must have at least one number, one lowercase and one uppercase letter, and between 6 and 20 characters",
      ];

    if (!role) return ["role is required"];
    if (!["STORE", "CLIENTE"].includes(role))
      return ["role must be STORE or CLIENTE"];

    return [undefined, new RegisterUserDto(name, email, password, role)];
  }

  // static create(name: string, email: string, password: string, role: string): RegisterUserDto {
  //     return new RegisterUserDto(name, email, password, role);
  // }
}
