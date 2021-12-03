import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateMenuDto } from './dto/createMenu.dto';
import { Menu } from './menu.entity';

@Injectable()
export class MenuService {


    constructor(
        @InjectRepository(Menu) private menuRepository: Repository<Menu>,
      ) {}
    
      async findAll(): Promise<Menu[]> {
        return await this.menuRepository.find();
      }
    
      async getMenu(id: number): Promise<Menu> {
        return await this.menuRepository.findOne({ id: id });
      }
    
      async createMenu(menu: CreateMenuDto): Promise<Menu> {
        const newMenu: Menu = this.menuRepository.create(menu);
    
        return await this.menuRepository.save(newMenu);
      }
    
      async removeMenu(id: number) {
        const menu = await this.menuRepository.findOne({ id: id });
        if (await this.menuRepository.delete(id)) {
          return menu;
        }
        throw new BadRequestException("menu doesn't exist in the database");
      }
    
      async updateMenu(data: CreateMenuDto, id: number): Promise<Menu> {
        if (await this.menuRepository.findOne(id)) {
          await this.menuRepository.update(id, data);
          return await this.menuRepository.findOne(id);
        }
        throw new BadRequestException('menu not found !');
      }
    
      async updateMenuImage(image: string, id: number): Promise<Menu> {
        if (await this.menuRepository.findOne(id)) {
          await this.menuRepository.update(id, { image });
          return await this.menuRepository.findOne(id);
        }
        throw new BadRequestException('menu not found !');
      }


}
