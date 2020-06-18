import { Entity, Column, PrimaryGeneratedColumn, OneToMany, ManyToOne } from 'typeorm';
import { UserCourse } from './UserCourse';

@Entity()
export class DetailProgress {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    chapterId: number;

    @Column()
    finishedOn: Date;

    @Column()
    isActive: boolean;

    @Column()
    CreatedOn: Date;

    @Column({ nullable: true })
    LastModifiedOn: Date;

    //properties and relations 
    @ManyToOne(type => UserCourse, uc => uc.DetailProgress) 
    UserCourse: UserCourse;

}