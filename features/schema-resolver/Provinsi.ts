import { z } from "zod";

export const ProvinsiSchema = z.object({
  id: z.string({
    required_error: "id harus diisi",
    invalid_type_error: "id harus abjad",
  })
  .length(2, 'panjang id harus 2 digit')
  .regex(new RegExp(/^[0-9]*$/), 'id hanya digital 2 digit tanpa sepasi'),
  nama: z.string({
    required_error: "Nama propinsi harus diisi",
    invalid_type_error: "nama propinsi harus abjad",
  })
});

export type Provinsi = z.infer<typeof ProvinsiSchema>;