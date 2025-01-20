import { z } from "zod";
import { AgamaSchema, AlamatSchema, DesaSchema, GenderSchema, KabupatenSchema, KecamatanSchema, KontakSchema, PatnerSchema, PersonSchema, PropinsiSchema } from "./zod-schema";

export type Agama = z.infer<typeof AgamaSchema>;
export type Gender = z.infer<typeof GenderSchema>;
export type Propinsi = z.infer<typeof PropinsiSchema>;
export type Kabupaten = z.infer<typeof KabupatenSchema>;
export type Kecamatan = z.infer<typeof KecamatanSchema>;
export type Desa = z.infer<typeof DesaSchema>;
export type Alamat = z.infer<typeof AlamatSchema>;
export type Kontak = z.infer<typeof KontakSchema>;
export type Person = z.infer<typeof PersonSchema>;
export type Patner = z.infer<typeof PatnerSchema>;