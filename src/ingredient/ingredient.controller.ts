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
import { CreateIngredientDto } from './dto/createIngredient.dto';
import { Ingredient } from './ingredient.entity';
import { IngredientService } from './ingredient.service';

@Controller('ingredient')
export class IngredientController {
  constructor(private readonly ingredientService: IngredientService) {}

  @Get('all')
  all(): Promise<Ingredient[]> {
    return this.ingredientService.findAll();
  }

  @Get(':id')
  getIngredient(@Param('id') id): Promise<Ingredient> {
    return this.ingredientService.getIngredient(id);
  }

  @Post('create')
  createService(
    @Body() createIngredientDto: CreateIngredientDto,
  ): Promise<Ingredient> {
    return this.ingredientService.createIngredient(createIngredientDto);
  }

  @Post('upload')
  @UseInterceptors(
    FileInterceptor('ingredientImage', { dest: 'uploads/ingredients/' }),
  )
  uploadFile(@UploadedFile() file: Express.Multer.File, @Param('id') id) {
    console.log(file);
    this.ingredientService.updateIngredientImage(file.filename, id);
  }

  @Delete(':id')
  delete(@Param('id') id) {
    return this.ingredientService.removeIngredient(id);
  }

  @Put(':id')
  update(
    @Body() createIngredientDto: CreateIngredientDto,
    @Param('id') id,
  ): Promise<Ingredient> {
    return this.ingredientService.updateIngredient(createIngredientDto, id);
  }
}
