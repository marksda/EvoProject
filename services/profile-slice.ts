import { Profile } from "@/features/entities/fitness/profile";
import { storage } from "@/features/ssot/storageMMKV";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import _ from 'lodash';

const initialState: Profile = storage.getString('profile') != undefined ? JSON.parse(storage.getString('profile')!) : {person: null, club: null, tanggal_gabung: null, role: null, status: null};

export const tokenSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {
    setProfile: (state, action: PayloadAction<Profile>) => {
      state.person = _.cloneDeep(action.payload.person);
      state.club = _.cloneDeep(action.payload.club);
      state.tanggal_gabung = action.payload.tanggal_gabung;
      state.role = _.cloneDeep(action.payload.role);
      state.status = _.cloneDeep(action.payload.status);
    },
    resetProfile: (state, action: PayloadAction<null>) => {
      state.person = null;
      state.club = null;
      state.tanggal_gabung = null;
      state.role = null;
      state.status = null;
    },
  }
});