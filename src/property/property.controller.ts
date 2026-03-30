import { Body, Controller, Delete, Get, HttpStatus, Param, Patch, Post, Req, UseGuards } from '@nestjs/common';
import { PropertyService } from './property.service';
import { AddPropertyDto } from './dto/create.Property.dto';
import { EditPropertyDto } from './dto/update.property.dto';
import { JwtAuthGuard } from '../guards/JwtGuards';
import { Roles } from '../decorators/roles.decorator';
import { UserRole } from '../auth/schema/user.schema';

@Controller('api/v1/property')
export class PropertyController {
  constructor(private readonly propertyService: PropertyService) {}

  @Get('all')
  async getAll() {
    const data = await this.propertyService.getAllProperties();
    return { success: true, message: 'Properties fetched', data, statusCode: HttpStatus.OK };
  }

  @UseGuards(JwtAuthGuard)
  @Get('my-properties')
  @Roles(UserRole.SELLER)
  async getMyProperties(@Req() req) {
    const data = await this.propertyService.getMyProperties(req.user.userId);
    return { success: true, message: 'Properties fetched', data, statusCode: HttpStatus.OK };
  }

  @Get(':id')
  async getOne(@Param('id') id: string) {
    const data = await this.propertyService.getPropertyById(id);
    return { success: true, message: 'Property details fetched', data, statusCode: HttpStatus.OK };
  }

  @UseGuards(JwtAuthGuard)
  @Post('create')
  @Roles(UserRole.SELLER)
  async create(@Body() body: AddPropertyDto, @Req() req) {
    const data = await this.propertyService.createProperty(req.user.userId, body);
    return { success: true, message: 'Property created successfully', data, statusCode: HttpStatus.CREATED };
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  @Roles(UserRole.SELLER)
  async update(@Param('id') id: string, @Body() body: EditPropertyDto, @Req() req) {
    const data = await this.propertyService.editProperty(id, body);
    return { success: true, message: 'Property updated successfully', data, statusCode: HttpStatus.OK };
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  @Roles(UserRole.SELLER)
  async remove(@Param('id') id: string, @Req() req) {
    const data = await this.propertyService.removeProperty(id);
    return { success: true, message: 'Property removed successfully', data, statusCode: HttpStatus.OK };
  }
}
