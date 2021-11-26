import { Ingredient } from 'src/ingredient/ingredient.entity';
import { Menu } from 'src/menu/menu.entity';
import { BaseEntity, Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Plat extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  imageUrl: string;
  @Column()
  name: string;
  @Column()
  description: string;
  @Column()
  price: number;

  @ManyToMany((type) => Menu ,menu => menu.plats)
  menus: Menu[];

  @ManyToMany((type) => Ingredient, ingredient=> ingredient.plats)
  @JoinTable()
  ingredients: Ingredient[];
}
