import { z } from "zod";
import { PersonSchema } from "./Person";
import { ClubSchema } from "./Club";

export const MemberSchema = z.object({
  id: z.number().nullable(),
  person: PersonSchema.omit({}),
  club: ClubSchema.pick({id: true, nama: true, alamat: true}),
  tanggal_gabung: z.date()
});

export type Member = z.infer<typeof MemberSchema>;