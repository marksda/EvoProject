import { z } from "zod";
import { ProvinsiSchema } from "./Provinsi";
import { KabupatenSchema } from "./Kabupaten";
import { KecamatanSchema } from "./Kecamatan";
import { DesaSchema } from "./Desa";

export const AlamatSchema = z.object({
  propinsi: ProvinsiSchema.pick({id: true, nama: true}),
  kabupaten: KabupatenSchema.pick({id: true, nama: true}),
  kecamatan: KecamatanSchema.pick({id: true, nama: true}),
  desa: DesaSchema.pick({id: true, nama: true}),
  detail: z.string(),
  kodepos: z.string({required_error: "harus diisi"}).regex(new RegExp(/^[0-9]*$/), 'hanya diisi deretan angka tanpa spasi').length(5, 'panjang harus 5 digit').nullable(),
});

export type Alamat = z.infer<typeof AlamatSchema>;