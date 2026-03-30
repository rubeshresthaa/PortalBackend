import { Module } from '@nestjs/common';
import { FavouriteController } from './favourite.controller';
import { FavouriteService } from './favourite.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Favourite, FavouriteSchema } from './schema/favourite.schema';
import { Property, PropertySchema } from '../property/schema/property.schema';
import { AuthModule } from '../auth/auth.module';
import { PropertyModule } from '../property/property.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Favourite.name, schema: FavouriteSchema },
      { name: Property.name, schema: PropertySchema }
    ]),
    AuthModule,
    PropertyModule,
  ],
  controllers: [FavouriteController],
  providers: [FavouriteService]
})
export class FavouriteModule {}
