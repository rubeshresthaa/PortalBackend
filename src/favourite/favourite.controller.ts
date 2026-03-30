import { Body, Controller, Delete, Get, HttpStatus, Param, Post, Req, UseGuards } from '@nestjs/common';
import { FavouriteService } from './favourite.service';
import type { AuthenticatedRequest } from '../auth/request.interface';
import { JwtAuthGuard } from '../guards/JwtGuards';


@UseGuards(JwtAuthGuard)
@Controller('api/v1/favourite')
export class FavouriteController {
  constructor(private readonly favouriteService: FavouriteService){}
  @Get('my-favourites')
  async getMyFavourites(@Req() req: AuthenticatedRequest) {
    const data = await this.favouriteService.getMyFavourites(req.user.userId);
    return { success: true, message: 'Favourites fetched', data, statusCode: HttpStatus.OK };
  }

  @Post('add')
  async toggleFavourite(@Req() req: AuthenticatedRequest, @Body() body: { propertyId: string }) {
    const result = await this.favouriteService.toggleFavourite(req.user.userId, body.propertyId);
    const message = result.isFavourited ? 'Added to favourites' : 'Removed from favourites';
    return { success: true, message, data: result.data, statusCode: HttpStatus.OK };
  }
}

