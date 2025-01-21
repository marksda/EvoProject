import { z } from "zod";

export const KecamatanSchema = z.object({
  id: z.string({required_error: "id harus diisi", invalid_type_error: "id harus abjad"}).length(7, 'panjang id harus 7 digit').regex(new RegExp(/^[0-9]*$/), 'id hanya digital 7 digit tanpa sepasi'),
  nama: z.string({ required_error: "Nama kecamatan harus diisi", invalid_type_error: "Nama kecamatan harus abjad"})
});

export type Kecamatan = z.infer<typeof KecamatanSchema>;