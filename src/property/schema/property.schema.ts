import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, Types } from "mongoose";

export type PropertyDocument = Property & Document;

@Schema({ timestamps: true })
export class Property {
  @Prop({ type: String, required: true, default: () => new Types.ObjectId().toString() })
  _id: string; // Manually assignable or auto-generated string ID

  @Prop({ required: true })
  propertyTitle: string;

  @Prop({ required: true })
  propertyAddress: string;

  @Prop({ required: true })
  propertyPrice: number;

  @Prop({ required: false })
  propertyImage?: string;

  @Prop({ required: false })
  propertyType?: string;

  @Prop({ required: false })
  propertyBeds?: number;

  @Prop({ required: false })
  propertyBaths?: number;
}

export const PropertySchema = SchemaFactory.createForClass(Property);