import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Favourite, FavouriteDocument } from './schema/favourite.schema';

@Injectable()
export class FavouriteService {
  constructor(@InjectModel(Favourite.name) private favouriteModel: Model<FavouriteDocument>){}

  async getMyFavourites(userId: string) {
    return this.favouriteModel.find({ userId });
  }

  async addFavourite(userId: string, propertyId: string) {
    return this.favouriteModel.create({ userId, propertyId });
  }

  async removeFavourite(userId: string, propertyId: string) {
    return this.favouriteModel.deleteOne({ userId, propertyId });
  }
}
