import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { MenuService } from './menu.service.js';
import type { CreateMenuDto, UpdateMenuDto } from './menu.dto.js';

@Controller('menu')
export class MenuController {
  constructor(private readonly menuService: MenuService) {}

  @Get()
  findAll(@Query('kategori') kategori?: string) {
    return this.menuService.findAll(kategori);
  }

  @Get('statistik')
  statistik() {
    return this.menuService.statistik();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.menuService.findOne(id);
  }


  @Post()
  create(@Body() body: CreateMenuDto) {
    return this.menuService.create(body);
  }

  @Patch(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() body: UpdateMenuDto) {
    return this.menuService.update(id, body);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.menuService.remove(id);
  }
}