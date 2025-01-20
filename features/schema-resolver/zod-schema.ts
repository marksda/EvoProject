import { z } from "zod";

export const AgamaSchema = z.object({
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

export const KontakSchema = z.object({
  email: z.string({
    required_error: "harus diisi"
  }).email('penulisan email tidak memenuhi standar'),
  no_hp: z.string({
    required_error: "harus diisi",
    invalid_type_error: "nama harus abjad digital",
  }).regex(new RegExp(/^[0-9]*$/), 'hanya diisi deretan angka tanpa spasi'),
});

export const PropinsiSchema = z.object({
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

export const KabupatenSchema = z.object({
  id: z.string({
    required_error: "id harus diisi",
    invalid_type_error: "id harus abjad",
  })
  .length(4, 'panjang id harus 4 digit')
  .regex(new RegExp(/^[0-9]*$/), 'id hanya digital 4 digit tanpa sepasi'),
  nama: z.string({
    required_error: "Nama kabupaten harus diisi",
    invalid_type_error: "Nama kabupaten harus abjad",
  })
});

export const KecamatanSchema = z.object({
  id: z.string({required_error: "id harus diisi", invalid_type_error: "id harus abjad"}).length(7, 'panjang id harus 7 digit').regex(new RegExp(/^[0-9]*$/), 'id hanya digital 7 digit tanpa sepasi'),
  nama: z.string({ required_error: "Nama kecamatan harus diisi", invalid_type_error: "Nama kecamatan harus abjad"})
});

export const DesaSchema = z.object({
  id: z.string({required_error: "id harus diisi", invalid_type_error: "id harus abjad"}).length(10, 'panjang id harus 10 digit').regex(new RegExp(/^[0-9]*$/), 'id hanya digital 10 digit tanpa sepasi'),
  nama: z.string({required_error: "Nama desa harus diisi", invalid_type_error: "Nama desa harus abjad"})
});

export const AlamatSchema = z.object({
  propinsi: PropinsiSchema.pick({id: true, nama: true}),
  kabupaten: KabupatenSchema.pick({id: true, nama: true}),
  kecamatan: KecamatanSchema.pick({id: true, nama: true}),
  desa: DesaSchema.pick({id: true, nama: true}),
  detail: z.string(),
  kodepos: z.string({required_error: "harus diisi"}).regex(new RegExp(/^[0-9]*$/), 'hanya diisi deretan angka tanpa spasi').length(5, 'panjang harus 5 digit').nullable(),
});

export const PersonSchema = z.object({
  id: z.number().nullable(),
  nik: z.string({required_error: "harus diisi", invalid_type_error: "nama harus abjad"}).length(16, 'panjang nik harus 16 digit').regex(new RegExp(/^[0-9]*$/), 'nik hanya berisi deretan angka tanpa spasi'),
  nama: z.string({required_error: "harus diisi", invalid_type_error: "nama harus abjad"}).min(3, { message: "nama minimal 3 abjad"}),
  tanggal_lahir: z.date(),
  berat_badan: z.number({required_error: "harus diisi"}).min(2, { message: "minimal 2 digit"}),
  tinggi_badan: z.number({required_error: "harus diisi"}).min(2, { message: "minimal 2 digit"}),
  kontak: KontakSchema.pick({email: true, no_hp: true}),
  agama: AgamaSchema.pick({id: true, nama: true}),
  gender: GenderSchema.pick({id: true, nama: true}),
  alamat: AlamatSchema.pick({propinsi: true, kabupaten: true, kecamatan: true, desa: true, detail: true, kodepos: true})
});

export const PatnerSchema = z.object({
  id: z.string(),
  nama: z.string(),
  npwp: z.string(),
  alamat: AlamatSchema.pick({propinsi: true, kabupaten: true, kecamatan: true, desa: true, detail: true, kodepos: true}),
  pemilik: PersonSchema.pick({id: true, nik: true, nama: true})
});