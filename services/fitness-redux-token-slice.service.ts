import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { TokenAPI } from "./fitness-api-rtkquery-service";
import { IToken } from "@/features/entities/fitness/token";
import { storage } from "@/features/ssot/storageMMKV";
import { Credential } from "@/features/schema-resolver/Credential";


export const fetchToken = createAsyncThunk(
  'token/fetchToken',
  async (credential: Credential, thunkApi: any) => {    
    const response = await TokenAPI.getToken(credential); 
    let data = null;

    if(response.status == 200) {
      data = await response.json().then((dataJson) => {    
        return dataJson;
      });
    }
    else {
      console.log(response);
    }

    return data;
  }
);

const initialState: IToken = storage.getString('token') != undefined ? 
      JSON.parse(storage.getString('token')!) 
      : 
      {token: null, refresh_token: null};

export const tokenSlice = createSlice({
  name: 'token',
  initialState,
  reducers: {
    setToken: (state, action: PayloadAction<IToken>) => {
      state.token = action.payload.token;
      state.refresh_token = action.payload.refresh_token;
    },
    resetToken: (state, action: PayloadAction<null>) => {
      state.token = null;
      state.refresh_token = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchToken.fulfilled, (state, action) => {
      state.token = action.payload.token;
      state.refresh_token = action.payload.refresh_token;
    });
  }
});

export const { setToken, resetToken } = tokenSlice.actions;

export default tokenSlice.reducer;