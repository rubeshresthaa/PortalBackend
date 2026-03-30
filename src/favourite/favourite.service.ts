import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Favourite, FavouriteDocument } from './schema/favourite.schema';
@Injectable()
export class FavouriteService {
  constructor(@InjectModel(Favourite.name) private favouriteModel: Model<FavouriteDocument>) {}

  async getMyFavourites(userId: string) {
    const list = await this.favouriteModel
      .find({ userId })
      .populate('propertyId')
      .sort({ createdAt: -1 });

    // Return only records where the property still exists
    return list
      .filter(fav => fav.propertyId)
      .map(fav => fav.propertyId); // Return the populated property objects directly
  }
  
  async toggleFavourite(userId: string, propertyId: string) {
    if (!propertyId || propertyId.trim() === '') {
      throw new BadRequestException('propertyId is required');
    }

    const existing = await this.favouriteModel.findOne({ userId, propertyId });
    if (existing) {
      await this.favouriteModel.deleteOne({ userId, propertyId });
      return { isFavourited: false, data: null };
    } else {
      const created = await this.favouriteModel.create({ userId, propertyId });
      const populated = await created.populate('propertyId');
      return { isFavourited: true, data: populated.propertyId }; 
    }
  }
}

