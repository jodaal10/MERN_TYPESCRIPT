import {Entity,Column,PrimaryGeneratedColumn, ManyToOne, OneToMany} from 'typeorm'
import { User } from './User'
import { Course } from './Course'
import { DetailProgress } from './DetailProgress'

@Entity()
export class UserCourse {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    progress: number;

    @Column()
    isActive: boolean;

    @Column()
    CreatedOn: Date;

    @Column({ nullable: true })
    LastModifiedOn: Date;
    
    //properties and relations 
    @ManyToOne(type => User, user => user.UserCourses)
    User: User;

    @ManyToOne(type => Course, course => course.UserCourses)
    Course: Course;

    @OneToMany(type => DetailProgress, dc => dc.UserCourse) 
    DetailProgress: DetailProgress[];
}