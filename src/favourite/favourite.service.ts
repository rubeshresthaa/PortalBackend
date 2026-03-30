import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Favourite, FavouriteDocument } from './schema/favourite.schema';
import { Property, PropertyDocument } from '../property/schema/property.schema';

@Injectable()
export class FavouriteService {
  constructor(
    @InjectModel(Favourite.name) private favouriteModel: Model<FavouriteDocument>,
    @InjectModel(Property.name) private propertyModel: Model<PropertyDocument>
  ) {}

  async getMyFavourites(userId: string) {
    const favList = await this.favouriteModel
      .find({ userId })
      .sort({ createdAt: -1 })
      .lean();

 

    const properties = await Promise.all(
      favList.map(async (fav) => {
        if (!fav.propertyId) return null;
        try {
          let query: any = { _id: fav.propertyId };
          if (/^[0-9a-fA-F]{24}$/.test(fav.propertyId)) {
            query = { $or: [{ _id: fav.propertyId }, { _id: new (require('mongoose').Types.ObjectId)(fav.propertyId) }] };
          }
          const property = await this.propertyModel.collection.findOne(query);
          return property || null;
        } catch {
          return null;
        }
      })
    );

    const filtered = properties.filter(Boolean);
  
    return filtered;
  }

  async toggleFavourite(userId: string, propertyId: string) {

    if (!propertyId || propertyId.trim() === '') {
      throw new BadRequestException('propertyId is required');
    }

    // Verify the property actually exists
    let query: any = { _id: propertyId };
    if (/^[0-9a-fA-F]{24}$/.test(propertyId)) {
      query = { $or: [{ _id: propertyId }, { _id: new (require('mongoose').Types.ObjectId)(propertyId) }] };
    }
    const property = await this.propertyModel.collection.findOne(query);

    if (!property) {
      throw new NotFoundException(`Property with id "${propertyId}" not found`);
    }
    const existing = await this.favouriteModel.findOne({ userId, propertyId });

    if (existing) {
      await this.favouriteModel.deleteOne({ userId, propertyId });
      return { isFavourited: false, data: null };
    } else {
      await this.favouriteModel.create({ userId, propertyId });
      return { isFavourited: true, data: property };
    }
  }
}
