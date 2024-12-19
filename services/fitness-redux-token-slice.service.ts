import { ICredential } from "@/features/entities/fitness/credential";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit/react";
import { TokenAPI } from "./fitness-api-rtkquery-service";
import { IToken } from "@/features/entities/fitness/token";


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

const initialState: IToken =  {
    id: null,
    nama: null,
    office: null,
    token: null,
    refresh_token: null
};

export const tokenSlice = createSlice({
    name: 'token',
    initialState,
    reducers: {
        setToken: (state, action: PayloadAction<IToken>) => {
            state.id = action.payload.id;
            state.nama = action.payload.nama;
            state.office = action.payload.office;
            state.token = action.payload.token;
            state.refresh_token = action.payload.refresh_token;
        },
        resetToken: (state, action: PayloadAction<null>) => {
            state.id = null;
            state.nama = null;
            state.office = null;
            state.token = null;
            state.refresh_token = null;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(fetchToken.fulfilled, (state, action) => {
            state.id = action.payload.id;
            state.nama = action.payload.nama;
            state.office = action.payload.office;
            state.token = action.payload.token;
            state.refresh_token = action.payload.refreshToken;
        });
    }
});

export const { setToken, resetToken } = tokenSlice.actions;

export default tokenSlice.reducer;