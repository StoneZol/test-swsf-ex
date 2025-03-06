import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { TaskProps } from './../../src/components/work-table/work-table-inreface';

const eID = 148547;

export interface ServerTaskResponse {
    current: TaskProps;
    changed?: TaskProps[];
  }
  

export const api = createApi({
  reducerPath: 'workTableApiSlice',
  baseQuery: fetchBaseQuery({ baseUrl: '/api' }),
  endpoints: (builder) => ({
    getDataTable: builder.query<TaskProps[], void>({
        query: () => `/outlay-rows/entity/${eID}/row/list`,
    }),
    createRowTable: builder.mutation<ServerTaskResponse, Partial<TaskProps>>({
        query: (body) => ({
            url: `/outlay-rows/entity/${eID}/row/create`,
            method: 'POST',
            body,
        }) 
    }),
    
    deleteRowTable: builder.mutation<void, number>({
        query: (rID) => ({
          url: `/outlay-rows/entity/${eID}/row/${rID}/delete`,
          method: 'DELETE',
        })
      }),
    updateRowTable: builder.mutation<ServerTaskResponse, { rID: number; body: Partial<TaskProps> }>({
        query: ({ rID, body }) => ({
          url: `/outlay-rows/entity/${eID}/row/${rID}/update`,
          method: 'POST',
          body,
        }),
      }),
  }),
});

export const { useGetDataTableQuery, 
    useCreateRowTableMutation, 
    useDeleteRowTableMutation,
    useUpdateRowTableMutation,
} = api;
