import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service.js';
import type { CreateMenuDto, UpdateMenuDto } from './menu.dto.js';

@Injectable()
export class MenuService {
  constructor(private readonly prisma: PrismaService) {}

  findAll() {
    return this.prisma.menu.findMany({ orderBy: { id: 'asc' } });
  }

  async findOne(id: number) {
    const menu = await this.prisma.menu.findUnique({ where: { id } });
    if (!menu) {
      throw new NotFoundException(`Menu dengan id ${id} tidak ditemukan`);
    }
    return menu;
  }

  create(data: CreateMenuDto) {
    if (!data?.nama?.trim() || !data.kategori?.trim() || !this.hargaValid(data.harga)) {
      throw new BadRequestException(
        'nama, kategori, dan harga (bilangan bulat lebih dari 0) wajib diisi',
      );
    }
    return this.prisma.menu.create({
      data: {
        nama: data.nama.trim(),
        harga: data.harga,
        kategori: data.kategori.trim(),
        deskripsi: data.deskripsi?.trim() ?? '',
      },
    });
  }

  async update(id: number, data: UpdateMenuDto) {
    await this.findOne(id); // 404 kalau id tidak ada

    if (data.harga !== undefined && !this.hargaValid(data.harga)) {
      throw new BadRequestException('harga harus bilangan bulat lebih dari 0');
    }
    return this.prisma.menu.update({
      where: { id },
      data: {
        nama: data.nama?.trim(),
        harga: data.harga,
        kategori: data.kategori?.trim(),
        deskripsi: data.deskripsi?.trim(),
      },
    });
  }

  async remove(id: number) {
    await this.findOne(id);
    return this.prisma.menu.delete({ where: { id } });
  }

  private hargaValid(harga: unknown): harga is number {
    return Number.isInteger(harga) && (harga as number) > 0;
  }
}