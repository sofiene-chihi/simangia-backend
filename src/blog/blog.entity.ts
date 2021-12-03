import { Ingredient } from 'src/ingredient/ingredient.entity';
import { Menu } from 'src/menu/menu.entity';
import { User } from 'src/users/user.entity';
import { BaseEntity, Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Blog {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  image: string;
  @Column()
  title: string;

  @ManyToMany((type) => User ,user => user.blogs)
  users: User[];

}
