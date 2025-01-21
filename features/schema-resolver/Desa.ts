import { z } from "zod";

export const DesaSchema = z.object({
  id: z.string({required_error: "id harus diisi", invalid_type_error: "id harus abjad"}).length(10, 'panjang id harus 10 digit').regex(new RegExp(/^[0-9]*$/), 'id hanya digital 10 digit tanpa sepasi'),
  nama: z.string({required_error: "Nama desa harus diisi", invalid_type_error: "Nama desa harus abjad"})
});

export type Desa = z.infer<typeof DesaSchema>;