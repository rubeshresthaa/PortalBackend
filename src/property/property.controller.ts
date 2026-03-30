import { Body, Controller, Delete, Get, HttpStatus, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { PropertyService } from './property.service';
import { AddPropertyDto } from './dto/create.Property.dto';
import { EditPropertyDto } from './dto/update.property.dto';
import { JwtAuthGuard } from '../guards/JwtGuards';

@Controller('api/v1/property')
export class PropertyController {
  constructor(private readonly propertyService: PropertyService) {}

  @Get('all')
  async getAll() {
    const data = await this.propertyService.getAllProperties();
    return { success: true, message: 'Properties fetched', data, statusCode: HttpStatus.OK };
  }

  @Get(':id')
  async getOne(@Param('id') id: string) {
    const data = await this.propertyService.getPropertyById(id);
    return { success: true, message: 'Property details fetched', data, statusCode: HttpStatus.OK };
  }

  @UseGuards(JwtAuthGuard)
  @Post('create')
  async create(@Body() body: AddPropertyDto) {
    const data = await this.propertyService.createProperty(body);
    return { success: true, message: 'Property created successfully', data, statusCode: HttpStatus.CREATED };
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  async update(@Param('id') id: string, @Body() body: EditPropertyDto) {
    const data = await this.propertyService.editProperty(id, body);
    return { success: true, message: 'Property updated successfully', data, statusCode: HttpStatus.OK };
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async remove(@Param('id') id: string) {
    const data = await this.propertyService.removeProperty(id);
    return { success: true, message: 'Property removed successfully', data, statusCode: HttpStatus.OK };
  }
}

