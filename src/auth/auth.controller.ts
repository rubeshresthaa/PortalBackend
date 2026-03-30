import { Body, ConflictException, Controller, HttpStatus, Post, UnauthorizedException, Get, Req, Headers, UseGuards, InternalServerErrorException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { JwtAuthGuard } from '../guards/JwtGuards';

@Controller('api/v1')
export class AuthController {
  constructor(private readonly authService: AuthService){}

  @Post('register')
  async register(@Body() data: RegisterDto){
    try {
      const user=await this.authService.registerUser(data);
      return{
        success: true,
        message: 'User registered successfully',
        data: {
          id:user._id,
          email:user.email,
          firstName:user.firstName,
          lastName:user.lastName,
          role:user.role
        },
        statusCode:HttpStatus.CREATED
      };
    } catch (error) {
          if (error.code === 11000) {
        throw new ConflictException('Email already exists');
      }
      throw error;
    }
  }

  @Post('login')
  async login(@Body() data: { email: string; password: string }) {
    try {
      const user = await this.authService.loginUser(data.email, data.password);
      return {
        success: true,
        message: 'User logged in successfully',
        data: {
          email: user.user.email,
          access_token: user.access_token,
          userId:user.user.id,
          firstName:user.user.firstName,
          lastName:user.user.lastName,
          role:user.user.role
        },
        statusCode: HttpStatus.OK
      };
    } catch (error) {
       throw new UnauthorizedException('Invalid credentials');
    }
  }

  @Post('logout')
  @UseGuards(JwtAuthGuard)
  async logout(@Req() req) {
    try {
      const token = req.headers.authorization?.replace('Bearer ', '');
      const userId = req.user?.sub || req.user?.id;

      
      if (!token || !userId) {
        throw new UnauthorizedException('Invalid logout request: missing token or user ID');
      }

      const result = await this.authService.logout(userId, token);
      return {
        success: true,
        message: result.message,
        statusCode: result.statusCode
      };
    } catch (error) {
      console.error('Logout error:', error);
      throw new UnauthorizedException(error.message || 'Logout failed');
    }
  }

  @Get('user')
  @UseGuards(JwtAuthGuard)
  async getCurrentUser(@Req() req) {
    try {
      const userId = req.user?.sub || req.user?.id;
      const user = await this.authService.getCurrentUser(userId);
      return {
        success: true,
        message: 'User retrieved successfully',
        data: user,
        statusCode: HttpStatus.OK
      };
    } catch (error) {
      throw new InternalServerErrorException('Failed to retrieve user');
    }
  }
}
