import { RegexUtils } from "../../../config/regex-utils";


export class LoginUserDto {

    private constructor(
        public email: string,
        public password: string,
    ){}



    static create(object:{[key: string]: any}): [string?, LoginUserDto?] {
        const { email, password } = object;


        if(!email) return ['email is required'];
        if(!RegexUtils.email.test(email)) return ['email is invalid'];

        if(!password) return ['password is required'];
        if(!RegexUtils.password.test(password)) return ['password must have at least one number, one lowercase and one uppercase letter, and between 6 and 20 characters'];

        return [undefined, new LoginUserDto(email, password)];

    }


    // static create(name: string, email: string, password: string, role: string): RegisterUserDto {
    //     return new RegisterUserDto(name, email, password, role);
    // }

}
