import { ICredential } from "@/features/entities/fitness/credential";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { TokenAPI } from "./fitness-api-rtkquery-service";
import { IToken } from "@/features/entities/fitness/token";
import { storage } from "@/features/ssot/storageMMKV";


export const fetchToken = createAsyncThunk(
  'token/fetchToken',
  async (credential: ICredential, thunkApi: any) => {    
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
      {id: null, token: null, refresh_token: null};

export const tokenSlice = createSlice({
  name: 'token',
  initialState,
  reducers: {
    setToken: (state, action: PayloadAction<IToken>) => {
      state.id = action.payload.id;
      state.token = action.payload.token;
      state.refresh_token = action.payload.refresh_token;
    },
    resetToken: (state, action: PayloadAction<null>) => {
      state.id =null;
      state.token = "";
      state.refresh_token = "";
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchToken.fulfilled, (state, action) => {
      state.id = action.payload.id;
      state.token = action.payload.token;
      state.refresh_token = action.payload.refresh_token;
    });
  }
});

export const { setToken, resetToken } = tokenSlice.actions;

export default tokenSlice.reducer;