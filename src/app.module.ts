import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppService } from './app.service';
import { Connection } from 'typeorm';
import { UsersModule } from './users/users.module';
import { User } from './users/user.entity'
import { AuthModule } from './auth/auth.module';
import { MenuModule } from './menu/menu.module';
import { PlatModule } from './plat/plat.module';
import { Plat } from './plat/plat.entity';
import { Menu } from './menu/menu.entity';
import { IngredientModule } from './ingredient/ingredient.module';
import { Ingredient } from './ingredient/ingredient.entity';
import { BlogModule } from './blog/blog.module';
import { ArticleModule } from './article/article.module';
import { Article } from './article/article.entity';
import { Blog } from './blog/blog.entity';
@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'sofiene',
      database: 'simangia',
      entities: [User,Menu,Plat,Ingredient,Blog,Article],
      synchronize: true,
    }),
    AuthModule,
    UsersModule,
    MenuModule,
    PlatModule,
    IngredientModule,
    BlogModule,
    ArticleModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  constructor(private connection: Connection) {}
}

