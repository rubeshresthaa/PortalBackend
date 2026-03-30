import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class BlacklistedToken {
  @Prop({ required: true })
  token: string;

  @Prop({ required: true })
  userId: string;

  @Prop({ required: true })
  expiresAt: Date;

  @Prop({ default: Date.now })
  createdAt: Date;
}

export const BlacklistedTokenSchema = SchemaFactory.createForClass(BlacklistedToken);
