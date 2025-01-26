import { z } from "zod";

export const CredentialSchema = z.object({
  email: z.string({required_error: "harus diisi"}).email('penulisan email tidak memenuhi standar'),
  password: z.string({required_error: "harus diisi"})
});

export type Credential = z.infer<typeof CredentialSchema>;