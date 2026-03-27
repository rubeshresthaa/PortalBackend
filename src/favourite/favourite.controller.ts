import { Body, Controller, Delete, Get, Param, Post, Req } from '@nestjs/common';
import { FavouriteService } from './favourite.service';
import type { AuthenticatedRequest } from '../auth/request.interface';

@Controller('api/v1/favourite')
export class FavouriteController {
  constructor(private readonly favouriteService: FavouriteService){}
  
  @Get('my-favourites')
  getMyFavourites(@Req() req: AuthenticatedRequest) {
    return this.favouriteService.getMyFavourites(req.user.userId);
  }

  @Post('add')
  addFavourite(@Req() req: AuthenticatedRequest,@Body() body:{propertyId:string}) {
    return this.favouriteService.addFavourite(req.user.userId, body.propertyId);
  }

  @Delete(':id')
  removeFavourite(@Req() req: AuthenticatedRequest,@Param('id') id: string) {
    return this.favouriteService.removeFavourite(req.user.userId, id);
  }
}
