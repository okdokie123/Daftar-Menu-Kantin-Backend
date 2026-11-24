export interface CreateMenuDto {
  nama: string;
  harga: number;
  kategori: string;
  deskripsi?: string;
}

export type UpdateMenuDto = Partial<CreateMenuDto>;