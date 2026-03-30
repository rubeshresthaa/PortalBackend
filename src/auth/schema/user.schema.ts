import { Document } from "mongoose";
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

export enum UserRole {
  BUYER = 'buyer',
  SELLER = 'seller'
}

export type UserDocument=User & Document;
@Schema()
export class User{
    @Prop({ 
        required: true,
        trim: true,
        minlength: 2,
        maxlength: 50
    })
    firstName: string;

    @Prop({ 
        required: true,
        trim: true,
        minlength: 2,
        maxlength: 50
    })
    lastName: string;
  
  @Prop({required: true,unique: true})
  email: string;
  
  @Prop({required: true})
  password: string;

  @Prop({required: true, enum: UserRole, default: UserRole.BUYER})
  role: UserRole;
}

export const UserSchema=SchemaFactory.createForClass(User);