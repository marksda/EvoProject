import { z } from "zod";

export const KontakSchema = z.object({
  email: z.string({
    required_error: "harus diisi"
  }).email('penulisan email tidak memenuhi standar'),
  no_hp: z.string({
    required_error: "harus diisi",
    invalid_type_error: "nama harus abjad digital",
  }).regex(new RegExp(/^[0-9]*$/), 'hanya diisi deretan angka tanpa spasi'),
});

export type Kontak = z.infer<typeof KontakSchema>;
