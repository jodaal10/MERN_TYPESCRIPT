import {Entity,Column,PrimaryGeneratedColumn, ManyToOne, OneToMany} from 'typeorm'
import { Tag } from './Tag'
import { Course } from './Course'

@Entity()
export class TagCourse {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    isActive: boolean;

    @Column()
    CreatedOn: Date;

    @Column({ nullable: true })
    LastModifiedOn: Date;
    
    //properties and relations 
    @ManyToOne(type => Course, course => course.TagCourses)
    Course: Course;

    @ManyToOne(type => Tag, tag => tag.TagCourses)
    Tag: Tag;

}