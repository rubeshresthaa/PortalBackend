import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';

import { Property, PropertyDocument } from './schema/property.schema';
import { AddPropertyDto } from './dto/create.Property.dto';
import { EditPropertyDto } from './dto/update.property.dto';

@Injectable()
export class PropertyService {
  constructor(@InjectModel(Property.name) private propertyModel: Model<PropertyDocument>) {}

  async getMyProperties(userId: string) {
    return this.propertyModel.find({ userId }).sort({ createdAt: -1 });
  }

  async getAllProperties() {
    return this.propertyModel.find().sort({ createdAt: -1 });
  }

  async getPropertyById(id: string) {
    let property = null;
    if (Types.ObjectId.isValid(id)) {
      property = await this.propertyModel.findById(id);
    }

    if (!property) {
      // Fallback for properties created while Custom String ID schema was active
      const rawDoc = await this.propertyModel.collection.findOne({ _id: id } as any);
      if (rawDoc) property = rawDoc as any;
    }
    if (!property) throw new NotFoundException(`Property with ID ${id} not found`);
    return property;
  }

  async createProperty(userId: string, addDto:AddPropertyDto) {
    return this.propertyModel.create({ ...addDto, userId });
  }

  async editProperty(id: string, updateData: EditPropertyDto) {
    let property = null;
    if (Types.ObjectId.isValid(id)) {
      property = await this.propertyModel.findByIdAndUpdate(id, updateData, { new: true });
    }
    
    // Fallback for custom string IDs like "PROP-12345"
    if (!property) {
      const result = await this.propertyModel.collection.findOneAndUpdate(
        { _id: id } as any,
        { $set: updateData },
        { returnDocument: 'after' }
      );
      if (result) property = (result.value || result) as any;
    }

    if (!property) throw new NotFoundException(`Property with ID ${id} not found`);
    return property;
  }

  async removeProperty(id: string): Promise<PropertyDocument | null> {
    let deletedProperty = null;
    if (Types.ObjectId.isValid(id)) {
      deletedProperty = await this.propertyModel.findByIdAndDelete(id);
    }
    
    // Fallback for custom string IDs like "PROP-12345"
    if (!deletedProperty) {
      const result = await this.propertyModel.collection.findOneAndDelete({ _id: id } as any);
      if (result) deletedProperty = (result.value || result) as any;
    }

    if (!deletedProperty) {
      throw new NotFoundException(`Property with ID ${id} not found`);
    }
    return deletedProperty;
  }
}
