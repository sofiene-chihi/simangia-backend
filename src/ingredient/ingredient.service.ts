import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateIngredientDto } from './dto/createIngredient.dto';
import { Ingredient } from './ingredient.entity';

@Injectable()
export class IngredientService {

    constructor(
        @InjectRepository(Ingredient) private ingredientRepository: Repository<Ingredient>,
      ) {}

      
    async findAll(): Promise<Ingredient[]>{
        return await this.ingredientRepository.find();
    }

    async getIngredient(id: number) : Promise<Ingredient> {
        return await this.ingredientRepository.findOne({id: id});
        
    }

    async createIngredient( ingredient: CreateIngredientDto): Promise<Ingredient> {
        const newIngredient: Ingredient = this.ingredientRepository.create(ingredient)

        return await this.ingredientRepository.save(newIngredient);
    }

    async removeIngredient( id: number){
        const ingredient = await this.ingredientRepository.findOne({id :id})
        if (await this.ingredientRepository.delete(id)) {
            return ingredient;
          }
          throw new BadRequestException("product doesn't exist in the database");
    }


    async updateIngredient(data: CreateIngredientDto, id:number): Promise<Ingredient>{

        if( await this.ingredientRepository.findOne(id)){
            await this.ingredientRepository.update(id, data)
            return await this.ingredientRepository.findOne(id);

        }
        throw new BadRequestException('product not found !');
    }

    async updateIngredientImage(image: string, id:number): Promise<Ingredient>{

        if( await this.ingredientRepository.findOne(id)){
            await this.ingredientRepository.update(id, {image})
            return await this.ingredientRepository.findOne(id);
        }
        throw new BadRequestException('product not found !');
    }
    


}
