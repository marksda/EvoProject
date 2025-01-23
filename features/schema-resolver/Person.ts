import { z } from "zod";
import { KontakSchema } from "./Kontak";
import { AgamaSchema } from "./Agama";
import { GenderSchema } from "./Gender";
import { AlamatSchema } from "./Alamat";

export const PersonSchema = z.object({
  id: z.number().optional(),
  identifier: z.string({required_error: "harus diisi", invalid_type_error: "nama harus abjad"}).length(16, 'panjang nik harus 16 digit').regex(new RegExp(/^[0-9]*$/), 'nik hanya berisi deretan angka tanpa spasi'),
  nama: z.string({required_error: "harus diisi", invalid_type_error: "nama harus abjad"}).min(3, { message: "nama minimal 3 abjad"}),
  tanggal_lahir: z.string().date(),
  berat_badan: z.number({required_error: "harus diisi"}).min(2, { message: "minimal 2 digit"}).optional(),
  tinggi_badan: z.number({required_error: "harus diisi"}).min(2, { message: "minimal 2 digit"}).optional(),
  kontak: KontakSchema.pick({email: true, no_hp: true}),
  agama: AgamaSchema.pick({id: true, nama: true}),
  gender: GenderSchema.pick({id: true, nama: true}),
  alamat: AlamatSchema.pick({provinsi: true, kabupaten: true, kecamatan: true, desa: true, detail: true, kodepos: true})
});

export type Person = z.infer<typeof PersonSchema>;