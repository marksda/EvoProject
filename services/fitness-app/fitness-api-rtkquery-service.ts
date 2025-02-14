import { RootState } from "@/features/ssot/fitness-redux-store";
import { BaseQueryFn, FetchArgs, FetchBaseQueryError, createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Mutex } from "async-mutex";
import { resetToken, setToken } from "./token-slice";
import { IItem } from "@/features/entities/fitness/item";
import { IQueryParamFilters } from "@/features/entities/query-param-filters";
import { Agama } from "@/features/schema-resolver/Agama";
import { Gender } from "@/features/schema-resolver/Gender";
import { Provinsi } from "@/features/schema-resolver/Provinsi";
import { Club } from "@/features/schema-resolver/Club";
import { Kabupaten } from "@/features/schema-resolver/Kabupaten";
import { Kecamatan } from "@/features/schema-resolver/Kecamatan";
import { Desa } from "@/features/schema-resolver/Desa";
import { RegistrasiMember } from "@/features/schema-resolver/Member";
import { Credential } from "@/features/schema-resolver/Credential";
import { Token } from "@/features/entities/fitness/token";
import { LoginResponse } from "@/features/entities/login-response";
import { Kelas } from "@/features/schema-resolver/Kelas";

const urlApi: string = 'http://192.168.1.9/api';

export class TokenAPI {
  static getToken = async (credential: Credential) => {
    // let data = null;
    return fetch(
      `${urlApi}/token`, 
      {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          ["Cache-Control"]: 'no-cache, private'
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
    const accessToken = (getState() as RootState).persisted.token.token;
    if(accessToken != null) {
      // headers.set("Cache-Control", 'no-cache, private');
      headers.set("Content-Type", 'application/json');
      headers.set("Accept", 'application/json');
      headers.set("authorization", `Bearer ${accessToken}`);
    }        
    else{
      // headers.set("Cache-Control", 'no-cache, private');
      headers.set("Content-Type", 'application/json');
      headers.set("Accept", 'application/json');
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
        // const id = (api.getState() as RootState).persisted.token.id;
        const refreshResult = await baseQuery(
          {
            // url: `/token/${id}`,
            url: '/token',
            method: 'PUT',
            body: refreshToken
          },
          api,
          extraOptions,
        );

        if(refreshResult.data) {
          api.dispatch(setToken(refreshResult.data as Token));
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
  tagTypes: ['Agama', 'Club', 'ClubKabupaten', 'Desa', 'Gender', 'Item', 'Kabupaten', 'Kecamatan', 'Kelas', 'Member', 'Propinsi', 'Kosong'],
  endpoints: builder => {
    return {
      getDaftarAgama: builder.query<Agama[], IQueryParamFilters>({
        query: (queryParams) => `/agamas?filters=${JSON.stringify(queryParams)}`,
        providesTags: ['Agama']
      }),
      getDaftarClub: builder.query<Club[], IQueryParamFilters>({
        query: (queryParams) => `/clubs?filters=${JSON.stringify(queryParams)}`,
        providesTags: ['Club']
      }),
      getDaftarDesa: builder.query<Desa[], IQueryParamFilters>({
        query: (queryParams) => `/desas?filters=${JSON.stringify(queryParams)}`,
        providesTags: ['Desa']
      }),
      getDaftarGender: builder.query<Gender[], IQueryParamFilters>({
        query: (queryParams) => `/genders?filters=${JSON.stringify(queryParams)}`,
        providesTags: ['Gender']
      }),
      getDaftarKabupaten: builder.query<Kabupaten[], IQueryParamFilters>({
        query: (queryParams) => `/kabupatens?filters=${JSON.stringify(queryParams)}`,
        providesTags: ['Kabupaten']
      }),
      getDaftarKecamatan: builder.query<Kecamatan[], IQueryParamFilters>({
        query: (queryParams) => `/kecamatans?filters=${JSON.stringify(queryParams)}`,
        providesTags: ['Kecamatan']
      }),
      getDaftarKelas: builder.query<Kelas[], IQueryParamFilters>({
        query: (queryParams) => `/kelas?filters=${JSON.stringify(queryParams)}`,
        providesTags: ['Kelas']
      }),
      getDaftarPropinsi: builder.query<Provinsi[], IQueryParamFilters>({
        query: (queryParams) => `/propinsis?filters=${JSON.stringify(queryParams)}`,
        providesTags: ['Propinsi']
      }),
      getDaftarClubKabupaten: builder.query<Kabupaten[], IQueryParamFilters>({
        query: (queryParams) => `/hook/club_kabupaten?filters=${JSON.stringify(queryParams)}`,
        providesTags: ['ClubKabupaten']
      }),
      login: builder.mutation<LoginResponse, Credential>({
        query: (body) => ({
          url: '/login',
          method: 'POST',
          body,
        }),
      }),
      logout: builder.mutation({
        query: () => ({
          url: '/logout',
          method: 'POST',
        }),
      }),
      registerMember: builder.mutation<LoginResponse, RegistrasiMember>({
        query: (body) => ({
            url: '/register/member?XDEBUG_SESSION_START=PHPSTORM',
            method: 'POST',
            body,
        })
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
  useGetDaftarAgamaQuery,
  useGetDaftarClubQuery,
  useGetDaftarDesaQuery,
  useGetDaftarGenderQuery,
  useGetDaftarKabupatenQuery,
  useGetDaftarKecamatanQuery,
  useGetDaftarKelasQuery,
  useGetDaftarPropinsiQuery,
  useGetDaftarClubKabupatenQuery,
  useRegisterMemberMutation,
  useLoginMutation, useLogoutMutation,
  useSaveItemMutation, useGetDaftarItemQuery, useUpdateItemMutation, useDeleteItemMutation
} = fitnessApi;