import {Entity,Column,PrimaryGeneratedColumn, OneToMany} from 'typeorm'
import { Course } from './Course';

@Entity()
export class Category {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    categoryName: string;

    @Column()
    type: number;

    @Column()
    isActive: boolean;

    @Column()
    CreatedOn: Date;

    @Column({ nullable: true })
    LastModifiedOn: Date;
    
    //properties and relations 
    @OneToMany(type => Course, Course => Course.category) // note: we will create author property in the Photo class below
    Courses: Course[];
}