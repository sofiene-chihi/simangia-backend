import { Blog } from 'src/blog/blog.entity';
import { Plat } from 'src/plat/plat.entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn, OneToMany, OneToOne, BaseEntity, JoinTable, ManyToMany } from 'typeorm';


@Entity()
export class User extends BaseEntity{
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @ManyToMany((type) => Plat, plat => plat.users)
  @JoinTable({name : "command"})
  plats: Plat[];

  @ManyToMany((type) => Blog, blog=> blog.users)
  @JoinTable({
    name:"favorite_blog"
  })
  blogs: Blog[];

}