


export class RegexUtils {




    static get email() {
        return /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    }

    static get password() {
        return /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/;
    }
}
