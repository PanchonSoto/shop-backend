export enum UserRole {
  NEGOCIO = "NEGOCIO",
  CLIENTE = "CLIENTE",
  ADMIN = "ADMIN",
}

export class UserEntity {
  constructor(
    public id: number,
    public name: string,
    public email: string,
    public password: string,
    public role: UserRole | string,
    public is_verified: boolean
    // public created_at: Date,
    // public updated_at: Date
  ) {}
}
