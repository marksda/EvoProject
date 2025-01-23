import { z } from "zod";
import { AlamatSchema } from "./Alamat";

export const ClubSchema = z.object({
  id: z.number().optional(),
  nama: z.string(),
  alamat: AlamatSchema.pick({provinsi: true, kabupaten: true, kecamatan: true, desa: true, detail: true, kodepos: true}),
  status: z.boolean()
});

export type Club = z.infer<typeof ClubSchema>;