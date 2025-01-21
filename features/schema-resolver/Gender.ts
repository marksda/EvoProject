import { z } from "zod";

export const GenderSchema = z.object({
  id: z.string({
    required_error: "id harus diisi",
    invalid_type_error: "id harus abjad",
  })
  .length(2, 'panjang id harus 2 digit')
  .regex(new RegExp(/^[0-9]*$/), 'id hanya digital 2 digit tanpa sepasi'),
  nama: z.string({
    required_error: "Nama harus diisi",
    invalid_type_error: "nama harus abjad",
  })
});

export type Gender = z.infer<typeof GenderSchema>;