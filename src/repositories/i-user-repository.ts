export interface UserCreateInput {
  name: string, 
  email: string,
  password_hash: string
}

export interface User{
  id: string;
  name: string, 
  email: string,
  password_hash: string
}

export interface IUsersRepository{
  findByEmail(email: string): Promise<User | null>
  create(data: UserCreateInput): Promise<User>
}