import { Module } from '@nestjs/common';
import { PropertyService } from './property.service';
import { PropertyController } from './property.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Property, PropertySchema } from './schema/property.schema';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports:[
    MongooseModule.forFeature([{ name: Property.name, schema: PropertySchema }]),
    AuthModule
  ],
  providers: [PropertyService],
  controllers: [PropertyController],
  exports: [MongooseModule]
})
export class PropertyModule {}

