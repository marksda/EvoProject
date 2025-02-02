import { z } from "zod";
import { KategoriKelasSchema } from "./KategoriKelas";
import { LevelSchema } from "./Level";

export const KelasSchema = z.object({
  id: z.string({ required_error: "harus diisi", invalid_type_error: " harus abjad" }).length(2, 'harus 2 digit').regex(new RegExp(/^[0-9]*$/), '2 digit numerik tanpa sepasi'),
  nama: z.string({ required_error: "harus diisi", invalid_type_error: "harus abjad" }),
  kelas_kategori: KategoriKelasSchema.pick({id: true, nama: true}),
  durasi: z.string({ required_error: "harus diisi", invalid_type_error: " harus abjad" }),
  level: LevelSchema.pick({id: true, nama: true}),
});

export type Kelas = z.infer<typeof KelasSchema>;