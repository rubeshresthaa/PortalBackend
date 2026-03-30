import { Module } from '@nestjs/common';

import { FavouriteController } from './favourite.controller';

import { FavouriteService } from './favourite.service';

import { MongooseModule } from '@nestjs/mongoose';

import { Favourite, FavouriteSchema } from './schema/favourite.schema';

import { AuthModule } from '../auth/auth.module';

import { PropertyModule } from '../property/property.module';



@Module({

  imports: [

    MongooseModule.forFeature([{ name: Favourite.name, schema: FavouriteSchema }]),

    AuthModule,

    PropertyModule,

  ],

  controllers: [FavouriteController],

  providers: [FavouriteService]

})

export class FavouriteModule {}

