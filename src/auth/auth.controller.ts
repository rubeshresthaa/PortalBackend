import { Body, ConflictException, Controller, HttpStatus, Post, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';

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
        },
        statusCode: HttpStatus.OK
      };
    } catch (error) {
       throw new UnauthorizedException('Invalid credentials');
    }
  }
}
