import { z } from "zod";

export const KabupatenSchema = z.object({
  id: z.string({
    required_error: "id harus diisi",
    invalid_type_error: "id harus abjad",
  })
  .length(4, 'panjang id harus 4 digit')
  .regex(new RegExp(/^[0-9]*$/), 'id hanya digital 4 digit tanpa sepasi'),
  nama: z.string({
    required_error: "Nama kabupaten harus diisi",
    invalid_type_error: "Nama kabupaten harus abjad",
  })
});

export type Kabupaten = z.infer<typeof KabupatenSchema>;