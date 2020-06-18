import {Entity,Column,PrimaryGeneratedColumn, OneToMany} from 'typeorm'
import { UserCourse} from './UserCourse'
import { Course } from './Course'

@Entity()
export class User {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    firstName: string;

    @Column()
    lastName: string;

    @Column()
    corporateEmail: string;

    @Column({ nullable: true })
    password: string;

    @Column()
    isActive: boolean;

    @Column()
    CreatedOn: Date;

    @Column({ nullable: true })
    LastModifiedOn: Date;

    //properties and relations 
    @OneToMany(type => UserCourse, uc => uc.User) 
    UserCourses: UserCourse[];

}