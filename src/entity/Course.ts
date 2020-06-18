import {Entity,Column,PrimaryGeneratedColumn, ManyToOne, OneToMany} from 'typeorm'
import { Category} from './Category'
import { Chapter} from './Chapter'
import { UserCourse} from './UserCourse'
import { TagCourse} from './TagCourse'

@Entity()
export class Course {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;

    @Column()
    link: string;

    @Column()
    isActive: boolean;

    @Column()
    CreatedOn: Date;

    @Column({ nullable: true })
    LastModifiedOn: Date;

    //properties and relations 
    @ManyToOne(type => Category, category => category.Courses)
    category: Category;

    @OneToMany(type => Chapter, chapter => chapter.Course) 
    Chapters: Chapter[];

    @OneToMany(type => UserCourse, uc => uc.Course) 
    UserCourses: UserCourse[];

    @OneToMany(type => TagCourse, tc => tc.Course) 
    TagCourses: TagCourse[];

}