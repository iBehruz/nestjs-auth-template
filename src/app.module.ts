import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './authentication/auth.module';
import { UsersModule } from './users/users.module';
import { ProductsModule } from './products/products.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtAuthGuard } from './common/guards/jwt-auth.guard';
import { APP_GUARD } from '@nestjs/core/constants';
import { User } from './users/enteties/user.entetiy';
import { Product } from './products/entities/product.entity';
import { BaseEntity } from './model/base.entity';
import { Item } from './model/item.entity';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './common/contants/constants';

@Module({
  imports: [AuthModule, UsersModule, ProductsModule, TypeOrmModule.forRoot({
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'postgres',
    password: 'pass123',
    database: 'postgres',
    entities: [User, Product, BaseEntity, Item],
    autoLoadEntities: true,
    synchronize: true
  }),  JwtModule.register({
    secret: jwtConstants.secret,
    signOptions: {expiresIn: '60s'}
  })],
  controllers: [AppController],
  providers: [AppService,   {
    provide: APP_GUARD,
    useClass: JwtAuthGuard,
  },],
})
export class AppModule {}
