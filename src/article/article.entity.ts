import { Ingredient } from 'src/ingredient/ingredient.entity';
import { Menu } from 'src/menu/menu.entity';
import { User } from 'src/users/user.entity';
import { BaseEntity, Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Article extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  title: string;
  @Column()
  description: string;
  @Column()
  image: string;
  @Column()
  text: string;

  @ManyToMany((type) => User ,user => user.blogs)
  users: User[];

}
