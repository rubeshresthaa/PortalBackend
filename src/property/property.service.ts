import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { Property, PropertyDocument } from './schema/property.schema';
import { AddPropertyDto } from './dto/create.Property.dto';
import { EditPropertyDto } from './dto/update.property.dto';

@Injectable()
export class PropertyService {
  constructor(@InjectModel(Property.name) private propertyModel: Model<PropertyDocument>) {}

  async getAllProperties() {
    return this.propertyModel.find().sort({ createdAt: -1 });
  }

  async getPropertyById(id: string) {
    return this.propertyModel.findById(id);
  }

  async createProperty(addDto:AddPropertyDto) {
    return this.propertyModel.create(addDto);
  }

  async editProperty(id: string, updateData: EditPropertyDto) {
    return this.propertyModel.findByIdAndUpdate(id, { $set: updateData }, { new: true });
  }

  async removeProperty(id: string) {
    return this.propertyModel.deleteOne({ _id: id });
  }
}
