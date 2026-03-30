import { ConflictException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument, UserRole } from './schema/user.schema';
import { RegisterDto } from './dto/register.dto';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { TokenBlacklistService } from './token-blacklist.service';


@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>, 
    private jwtService: JwtService,
    private tokenBlacklistService: TokenBlacklistService
  ){}

  async registerUser(registerDto: RegisterDto) {
    const existingUser=await this.userModel.findOne({email:registerDto.email});
    if(existingUser){
      throw new ConflictException('User already exists');
    }

    const hash=await bcrypt.hash(registerDto.password, 10);
    const user=await this.userModel.create({
      email:registerDto.email,
      password:hash,
      firstName:registerDto.firstName,
      lastName:registerDto.lastName,
      role: registerDto.role || UserRole.BUYER // Default to buyer if not specified
    });
    return user;
  }

  async loginUser(email:string, password:string) {

    const normalizedEmail = email.toLowerCase().trim();
    
    const user=await this.userModel.findOne({email:normalizedEmail});
    if(!user){
      throw new ConflictException('User not found');
    }
    const isPasswordValid=await bcrypt.compare(password,user.password);
    if(!isPasswordValid){
      throw new ConflictException('Invalid password');
    }
       const payload = { sub: user._id, email: user.email, role: user.role };
    const token = this.jwtService.sign(payload);
     return {
      access_token: token,
      user: {
        id: user._id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        role: user.role
      }
    }
  }

  async logout(userId: string, token: string): Promise<{message: string, statusCode: number}> {
    if (!userId || !token) {
      throw new ConflictException('User ID and token are required for logout');
    }

    try {
      const user = await this.userModel.findById(userId);
      if (!user) {
        throw new ConflictException('User not found');
      }

      // Add token to blacklist
      await this.tokenBlacklistService.addToBlacklist(token, userId);
      
      // Update last logout time
      await this.userModel.updateOne(
        { _id: userId },
        { lastLogout: new Date() }
      );
      
      return { message: 'Logout successful', statusCode: 200 };
    } catch (error) {
      throw new ConflictException('Logout failed');
    }
  }

  async getCurrentUser(userId: string) {
    const user = await this.userModel.findById(userId).select('-password');
    return user;
  }
  
  async getAllUsers(){
    return this.userModel.find().select('-password');
  }
}
