import { Ingredient } from 'src/ingredient/ingredient.entity';
import { Menu } from 'src/menu/menu.entity';
import { User } from 'src/users/user.entity';
import { BaseEntity, Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Plat {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  image: string;
  @Column()
  name: string;
  @Column()
  description: string;
  @Column()
  price: number;

  @ManyToMany((type) => Menu ,menu => menu.plats)
  menus: Menu[];

  @ManyToMany((type) => User ,user => user.plats)
  users: User[];

  @ManyToMany((type) => Ingredient, ingredient=> ingredient.plats)
  @JoinTable()
  ingredients: Ingredient[];
}
