import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth/auth.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { FavouriteModule } from './favourite/favourite.module';

@Module({
  imports: [ConfigModule.forRoot({
    isGlobal: true,
  }),
MongooseModule.forRootAsync({
  imports: [ConfigModule],
  inject:[ConfigService],
  useFactory: (configService: ConfigService) => ({
    uri: configService.get('MONGODB_URI'),
  }),
}),
AuthModule,
FavouriteModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
