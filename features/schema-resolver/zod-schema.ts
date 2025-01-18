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

export const KontakSchema = z.object({
  email: z.string({
    required_error: "email harus diisi"
  }).email('penulisan email tidak memenuhi standar'),
  no_hp: z.string({
    required_error: "nomor handphone harus diisi",
    invalid_type_error: "nama harus abjad digital",
  }).regex(new RegExp(/^[0-9]*$/), 'nomor hp hanya berisi deretan angka tanpa spasi'),
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

export const AlamatSchema = z.object({
  propinsi: PropinsiSchema.pick({id: true, nama: true}),
});

export const  PersonSchema = z.object({
  id: z.number().nullable(),
  nama: z.string({
    required_error: "Nama harus diisi",
    invalid_type_error: "nama harus abjad",
  }).min(3, { message: "nama minimal 3 abjad"}),
  nik: z.string({
    required_error: "nik harus diisi",
    invalid_type_error: "nama harus abjad"
  }).regex(new RegExp(/^[0-9]*$/), 'nik hanya berisi deretan angka tanpa spasi'),
  kontak: KontakSchema.pick({email: true, no_hp: true}),
  agama: AgamaSchema.pick({id: true, nama: true}),
  alamat: AlamatSchema.pick({propinsi: true})
});