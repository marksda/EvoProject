import { ICredential } from "@/features/entities/fitness/credential";
import { IToken } from "@/features/entities/fitness/token";
import { RootState } from "@/features/ssot/fitness-redux-store";
import { BaseQueryFn, FetchArgs, FetchBaseQueryError, createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Mutex } from "async-mutex";
import { resetToken, setToken } from "./fitness-redux-token-slice.service";
import { IItem } from "@/features/entities/fitness/item";
import { IQueryParamFilters } from "@/features/entities/query-param-filters";
import { IPropinsi } from "@/features/entities/propinsi";
// import { ICredential } from "../features/entities/inventaris-asset/credential";
// import { Mutex } from "async-mutex";
// import { RootState } from "../features/ssot/inventaris-asset-redux-store";
// import { IToken } from "../features/entities/inventaris-asset/token";
// import { resetToken, setToken } from "./inventaris-asset-redux-token-slice.service";
// import { IItem } from "../features/entities/inventaris-asset/item";
// import { IQueryParamFilters } from "../features/entities/query-param-filters";
// import { resetToken, setToken } from "./redux-token-slice.service";
// import { IBarang } from "../features/entities/barang";
// import { IQueryParamFilters } from "../features/entities/query-param-filters";
// import { ITransaksi } from "../features/entities/transaksi";
// import { IKelompokAkun } from "../features/entities/akutansi-app/kelompok-akun";
// import { IAkun } from "../features/entities/akutansi-app/akun";

const urlApi: string = 'http://192.168.1.12:8000/api';

export class TokenAPI {
    static getToken = async (credential: ICredential) => {
        // let data = null;
        return fetch(
            `${urlApi}/token`, 
            {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(credential)
            }
        )
        // .then((response) => {
        //     response.json()
        //             .then((dataJson) => {
        //                 return dataJson;
        //             })
        //             .catch((error) => {
        //                 console.log(error);
        //             });
        // })
        // .catch((error) => {
        //     console.log(error);
        // })
        ;        
    }
}

const mutex = new Mutex();

const baseQuery = fetchBaseQuery({ 
  baseUrl: urlApi,
  prepareHeaders: (headers, { getState }) => {
    const accessToken = (getState() as RootState).persisted.token;
    if(accessToken != null){
      headers.set("XDEBUG_SESSION_START", 'PHPSTORM');
      headers.set("authorization", `Bearer ${accessToken}`);
    }        
    else{
      headers.set("XDEBUG_SESSION_START", 'PHPSTORM');
    }    
    
    return headers;
  },
});

export const baseQueryWithReauth: BaseQueryFn<string|FetchArgs, unknown, FetchBaseQueryError> = async (args, api, extraOptions) => {
    await mutex.waitForUnlock();

    let result = await baseQuery(args, api, extraOptions);
    if (result.error && result.error.status === 401) {
        if (!mutex.isLocked()) {
            const release = await mutex.acquire();
            try {
                const refreshToken = (api.getState() as RootState).persisted.token.refresh_token;
                const userId = (api.getState() as RootState).persisted.token.id;
                const refreshResult = await baseQuery(
                    {
                        url: `/token/${userId}`,
                        method: 'PUT',
                        body: refreshToken
                    },
                    api,
                    extraOptions,
                );

                if(refreshResult.data) {
                    api.dispatch(setToken(refreshResult.data as IToken));
                    result = await baseQuery(args, api, extraOptions);
                } 
                else {                    
                    api.dispatch(resetToken(null));
                }

            } catch (error) {
                release();
            } finally {
                release();
            }
        }
        else {
            await mutex.waitForUnlock()
            result = await baseQuery(args, api, extraOptions);
        }
    }

    return result;
};

export const fitnessApi = createApi({
    reducerPath: 'aerithApi',
    baseQuery: baseQueryWithReauth,
    tagTypes: ['Item', 'Propinsi', 'Kosong'],
    endpoints: builder => {
        return {
          getDaftarPropinsi: builder.query<IPropinsi[], IQueryParamFilters>({
            query: (queryParams) => `/propinsis?filters=${JSON.stringify(queryParams)}`,
            providesTags: ['Propinsi']
          }),
          saveItem: builder.mutation<IItem, Partial<IItem>>({
              query: (body) => ({
                  url: '/item',
                  method: 'POST',
                  body,
              }),
              invalidatesTags: (result) => result ? ['Item']:['Kosong']
          }),
          getDaftarItem: builder.query<IItem[], IQueryParamFilters>({
              query: (queryParams) => ({
                  url: `/item?filter=${JSON.stringify(queryParams)}`,
                  method: 'GET',
              }),
              transformResponse: (response: { data: IItem[] }, meta, arg) => {
                  return response.data;
              },
              providesTags: ['Item']
          }),
          updateItem: builder.mutation<IItem, {idLama: string; itemBaru: Partial<IItem>;}>({
              query: ({idLama, itemBaru}) => ({
                  url: `/item/${idLama}`,
                  method: 'PUT',
                  body: itemBaru,
              }),
              invalidatesTags: (result) => result? ['Item']:['Kosong']
          }),
          deleteItem: builder.mutation<Partial<IItem>, {idItem: string}>({
              query: ({idItem}) => ({                  
                  url: `/item/${idItem}`,
                  method: 'DELETE',            
              }),
              invalidatesTags: (result) => result? ['Item']:['Kosong']
          }),
        }
    }
});

export const {
  useGetDaftarPropinsiQuery,
  useSaveItemMutation, useGetDaftarItemQuery, useUpdateItemMutation, useDeleteItemMutation
} = fitnessApi;