import { z } from "zod";
import { PersonSchema } from "./Person";
import { ClubSchema } from "./Club";

export const MemberSchema = z.object({
  id: z.number().optional(),
  person: PersonSchema.omit({}),
  club: ClubSchema.pick({id: true, nama: true}),
  tanggal_gabung: z.date().optional()
});

export const RegistrasiMemberSchema = z.object({
  identifier: z.string({required_error: "harus diisi"}).length(16, 'harus 16 digit').regex(new RegExp(/^[0-9]*$/), 'hanya angka tanpa spasi'), 
  club_id: z.number({required_error: "harus diisi"}),
  nama: z.string({required_error: "harus diisi"}).min(3, { message: "minimal 3 abjad"}),
  tanggal_lahir: z.string().date(),
  jenis_kelamin_id: z.string({required_error: "harus diisi"}).length(2, 'harus 2 digit').regex(new RegExp(/^[0-9]*$/), 'hanya angka tanpa spasi'),
  agama_id: z.string({required_error: "harus diisi"}).length(2, 'harus 2 digit').regex(new RegExp(/^[0-9]*$/), 'hanya angka tanpa spasi'),
  provinsi_id: z.string({required_error: "harus diisi"}).length(2, 'harus 2 digit').regex(new RegExp(/^[0-9]*$/), 'hanya angka tanpa spasi'),
  kabupaten_id: z.string({required_error: "harus diisi"}).length(4, 'harus 4 digit').regex(new RegExp(/^[0-9]*$/), 'hanya angka tanpa spasi'),
  kecamatan_id: z.string({required_error: "harus diisi"}).length(7, 'harus 7 digit').regex(new RegExp(/^[0-9]*$/), 'hanya angka tanpa spasi'),
  desa_id: z.string({required_error: "harus diisi"}).length(10, 'harus 10 digit').regex(new RegExp(/^[0-9]*$/), 'hanya angka tanpa spasi'),
  alamat: z.string({required_error: "harus diisi"}),
  kode_pos: z.string().length(5, 'harus 5 digit').regex(new RegExp(/^[0-9]*$/), 'hanya angka tanpa spasi').optional(),
  email: z.string({required_error: "harus diisi"}).email('penulisan email tidak memenuhi standar'),
  no_hp: z.string({required_error: "harus diisi"}).regex(new RegExp(/^[0-9]*$/), 'hanya angka tanpa spasi'),
  tinggi_badan: z.number({required_error: "harus diisi"}).min(2, { message: "minimal 2 digit"}).optional(),
  berat_badan: z.number({required_error: "harus diisi"}).min(2, { message: "minimal 2 digit"}).optional(),
  password: z.string({required_error: "harus diisi"}).min(3, { message: "minimal 3 karakter"})
});

export type RegistrasiMember = z.infer<typeof RegistrasiMemberSchema>;
export type Member = z.infer<typeof MemberSchema>;