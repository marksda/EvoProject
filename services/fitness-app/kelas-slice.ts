import { Kelas } from "@/features/schema-resolver/Kelas";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import _ from 'lodash';

const initialState: Kelas = {};

export const kelasSlice = createSlice({
  name: 'kelas',
  initialState,
  reducers: {
    setKelas: (state, action: PayloadAction<Kelas>) => {
      state.id = action.payload.id;
      state.nama = action.payload.nama;
      state.kelas_kategori = _.cloneDeep(action.payload.kelas_kategori);
      state.level = _.cloneDeep(action.payload.level);
      state.durasi = action.payload.durasi;
      state.deskripsi = action.payload.deskripsi;
    },
    resetKelas: (state, action: PayloadAction<null>) => {
      return {};
    },
  }
});

export const { setKelas, resetKelas } = kelasSlice.actions;

export default kelasSlice.reducer;