import { z } from "zod";
import { PersonSchema } from "./Person";
import { ClubSchema } from "./Club";
import { CredentialSchema } from "./Credential";

export const MemberSchema = z.object({
  id: z.number().optional(),
  person: PersonSchema.omit({}),
  club: ClubSchema.pick({id: true, nama: true}),
  credential: CredentialSchema.pick({email: true, password: true}).optional(),
  tanggal_gabung: z.date().optional()
});

export type Member = z.infer<typeof MemberSchema>;