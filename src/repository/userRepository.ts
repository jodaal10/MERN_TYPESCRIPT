/**
 * @interface IUserRepository
 * @desc Responsible for pulling users from persistence.
 **/
import { injectable } from "inversify";
import "reflect-metadata";
import {getRepository} from 'typeorm';
import {User} from '../entity/User'

export interface IUserRepository {
     getUsers (): Promise<User[]>;
     getUser (id: number): Promise<User>;
     getUserByEmail (email: string): Promise<User>;
     registerUser(user: User): Promise<User>;
}

@injectable()
export class UserRepository implements IUserRepository {
  
    async getUsers (): Promise<User[]> {
        const users = await getRepository(User).find();
        console.log(users);
        return users;
    }

    async getUser (id: number): Promise<User>{
        return  await getRepository(User).findOne({id: id}) as User;
    }

    async getUserByEmail (email: string): Promise<User>{
        return  await getRepository(User).findOne({corporateEmail:email }) as User;
    }

    async registerUser(user: User): Promise<User>{
        user.isActive = true;
        user.CreatedOn = new Date();
        var newUser = getRepository(User).create(user);
        var result = await getRepository(User).save(newUser);
        return newUser;
    }
}


