import {Entity,Column,PrimaryGeneratedColumn, OneToMany} from 'typeorm'
import { TagCourse } from './TagCourse';

@Entity()
export class Tag {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    TagName: string;

    @Column()
    isActive: boolean;

    @Column()
    CreatedOn: Date;

    @Column({ nullable: true })
    LastModifiedOn: Date;
    
    //properties and relations 
    @OneToMany(type => TagCourse, tc => tc.Tag) 
    TagCourses: TagCourse[];
  
}