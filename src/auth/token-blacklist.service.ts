import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class TokenBlacklistService {
  constructor(@InjectModel('BlacklistedToken') private blacklistedTokenModel: Model<any>) {}

  async addToBlacklist(token: string, userId: string): Promise<void> {
  
    
    // Decode token to get expiration time
    const decoded = JSON.parse(Buffer.from(token.split('.')[1], 'base64').toString());
    const expiresAt = new Date(decoded.exp * 1000);

    await this.blacklistedTokenModel.create({
      token,
      userId,
      expiresAt
    });

  }

  async isTokenBlacklisted(token: string): Promise<boolean> {    
    const blacklisted = await this.blacklistedTokenModel.findOne({ token });
    if (!blacklisted) {
      return false;
    }

    
    // Remove expired tokens from blacklist
    if (new Date() > blacklisted.expiresAt) {
      await this.blacklistedTokenModel.deleteOne({ _id: blacklisted._id });
      return false;
    }


    return true;
  }

  async cleanupExpiredTokens(): Promise<void> {
    await this.blacklistedTokenModel.deleteMany({
      expiresAt: { $lt: new Date() }
    });
  }
}
