import { z } from "zod";

export const LevelSchema = z.object({
  id: z.string({ required_error: "harus diisi", invalid_type_error: " harus abjad" }).length(2, 'harus 2 digit').regex(new RegExp(/^[0-9]*$/), '2 digit numerik tanpa sepasi'),
  nama: z.string({ required_error: "harus diisi", invalid_type_error: "harus abjad" })
});

export type Level = z.infer<typeof LevelSchema>;