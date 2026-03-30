import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, Types } from "mongoose";

export type FavouriteDocument = Favourite & Document;

@Schema({ timestamps: true })
export class Favourite {
  @Prop({ type: String, required: true })
  userId: string;

  @Prop({ type: String, ref: 'Property', required: true })
  propertyId: string;
}

export const FavouriteSchema = SchemaFactory.createForClass(Favourite);
// Important: Ensure one user can only favourite a specific property once
FavouriteSchema.index({ userId: 1, propertyId: 1 }, { unique: true });
