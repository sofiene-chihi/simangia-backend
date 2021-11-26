import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

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
}
