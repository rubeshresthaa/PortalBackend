import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './schema/user.schema';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtStrategy } from './jwt.strategy';
import { PassportModule } from '@nestjs/passport';
import { TokenBlacklistService } from './token-blacklist.service';
import { BlacklistedToken, BlacklistedTokenSchema } from './schema/blacklisted-token.schema';

@Module({
  imports:[
    PassportModule,
    MongooseModule.forFeature([
      { name: User.name, schema: UserSchema },
      { name: BlacklistedToken.name, schema: BlacklistedTokenSchema }
    ]),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        return {
          secret: configService.get('JWT_SECRET'),
          signOptions: {
            expiresIn: '1h',
          },
        };
      },
    }),
  ],
  providers: [AuthService, JwtStrategy, TokenBlacklistService],
  controllers: [AuthController],
  exports: [AuthService, JwtModule, TokenBlacklistService]
})
export class AuthModule {}
