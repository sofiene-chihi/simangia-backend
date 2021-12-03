import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { CreateMenuDto } from './dto/createMenu.dto';
import { Menu } from './menu.entity';
import { MenuService } from './menu.service';

@Controller('menu')
export class MenuController {
  constructor(private readonly menuService: MenuService) {}

  @Get('all')
  all(): Promise<Menu[]> {
    return this.menuService.findAll();
  }

  @Get(':id')
  getPlat(@Param('id') id): Promise<Menu> {
    return this.menuService.getMenu(id);
  }

  @Post('create')
  createPlat(@Body() createMenuDto: CreateMenuDto): Promise<Menu> {
    return this.menuService.createMenu(createMenuDto);
  }

  @Post('upload/:id')
  @UseInterceptors(FileInterceptor('menuImage', { dest: 'uploads/menus/' }))
  uploadFile(@UploadedFile() file: Express.Multer.File, @Param('id') id) {
    this.menuService.updateMenuImage(file.filename, id);
    const response = {
      originalname: file.originalname,
      filename: file.filename,
    };
    return response;
  }

  @Delete(':id')
  delete(@Param('id') id) {
    return this.menuService.removeMenu(id);
  }

  @Put(':id')
  update(@Body() createMenuDto: CreateMenuDto, @Param('id') id): Promise<Menu> {
    return this.menuService.updateMenu(createMenuDto, id);
  }
}
