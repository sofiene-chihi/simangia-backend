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
@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'sofiene',
      database: 'simangia',
      entities: [User,Menu,Plat],
      synchronize: true,
    }),
    AuthModule,
    UsersModule,
    MenuModule,
    PlatModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  constructor(private connection: Connection) {}
}

