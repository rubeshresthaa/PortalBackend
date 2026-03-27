import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";
export type FavouriteDocument=Favourite & Document;
@Schema()
export class Favourite {
  @Prop({required: true})
  userId: string;
  
  @Prop({required: true})
  propertyId: string;
}



export const FavouriteSchema=SchemaFactory.createForClass(Favourite);