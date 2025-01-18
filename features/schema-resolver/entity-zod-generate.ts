import { z } from "zod";
import { AgamaSchema, AlamatSchema, KabupatenSchema, KontakSchema, PersonSchema, PropinsiSchema } from "./zod-schema";

export type Agama = z.infer<typeof AgamaSchema>;
export type Propinsi = z.infer<typeof PropinsiSchema>;
export type Kabupaten = z.infer<typeof KabupatenSchema>;
export type Alamat = z.infer<typeof AlamatSchema>;
export type Kontak = z.infer<typeof KontakSchema>;
export type Person = z.infer<typeof PersonSchema>;