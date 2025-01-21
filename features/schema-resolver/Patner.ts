import { z } from "zod";
import { AlamatSchema } from "./Alamat";
import { PersonSchema } from "./Person";
import { KontakSchema } from "./Kontak";

export const PatnerSchema = z.object({
  id: z.number(),
  nama: z.string(),
  npwp: z.string(),
  alamat: AlamatSchema.pick({propinsi: true, kabupaten: true, kecamatan: true, desa: true, detail: true, kodepos: true}),
  pemilik: PersonSchema.pick({id: true, nik: true, nama: true}),
  tanggal_gabung: z.date(),
  kontak: KontakSchema.pick({email: true, no_hp: true})
});

export type Patner = z.infer<typeof PatnerSchema>;