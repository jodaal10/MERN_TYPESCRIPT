import { Entity, Column, PrimaryGeneratedColumn, OneToMany, ManyToOne } from 'typeorm';
import { Course } from './Course';

@Entity()
export class Chapter {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    chapterName: string;

    @Column()
    length: number;

    @Column({type: "decimal"})
    percentage: number;

    @Column()
    isActive: boolean;

    @Column()
    CreatedOn: Date;

    @Column({ nullable: true })
    LastModifiedOn: Date;

    //properties and relations 
    @ManyToOne(type => Course, Course => Course.Chapters) 
    Course: Course;
}