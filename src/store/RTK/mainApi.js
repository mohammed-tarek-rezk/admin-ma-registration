import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { BACKEND_BASE_URL } from '../../constants'

let headers = {
    'Content-Type': 'application/json',
  }

let queryBuilder = (url , body)=>{
    return {url ,headers , body }
}

export const mainApi = createApi({
  reducerPath: 'mainApi',
  baseQuery: fetchBaseQuery({ baseUrl: BACKEND_BASE_URL }),
  endpoints: (builder) => ({
    loginModerator: builder.mutation({
      query: (body) => ({
        url: "/api/v1/moderators/login",
        method: 'POST',
        body: JSON.stringify(body),
        headers,
        credentials: "include"
      }),
    }),
    changeModeratorStatus: builder.mutation({
      query: (id) => ({
        url: `/api/v1/moderators/${id}`,
        method: 'PATCH',
        headers,
        credentials: "include"
      }),
    }),
    addModerator: builder.mutation({
      query: (body) => ({
        url: "/api/v1/moderators",
        method: 'POST',
        body: JSON.stringify(body),
        headers,
        credentials: "include"
      }),
    }),
    logoutModerator: builder.mutation({
      query: () => ({
        url: "/api/v1/moderators/logout",
        method: 'POST',
        headers,
        credentials: "include"
      }),
    }),
    getAllMembers: builder.query({
      query: () => ({
        url: `/api/v1/members`,
        credentials: "include"
      }),
    }),
    getSingleMember: builder.query({
      query: (id) => ({
        url: `/api/v1/members/${id}`,
        credentials: "include"
      }),
    }),
    getModerators: builder.query({
      query: () => ({
        url: `/api/v1/moderators`,
        credentials: "include"
      }),
    }),
    getSingleModertator: builder.query({
      query: (id) => ({
        url: `/api/v1/moderators/${id}`,
        credentials: "include"
      }),
    }),
    changeStatus: builder.mutation({
      query: (data) => ({
        url: `/api/v1/members/${data.memberId+"/"+data.id}`,
        method: 'PATCH',
        credentials: "include"
      }),
    }),
    changePassword: builder.mutation({
      query: (body) => ({
        url: `/api/v1/moderators`,
        method: 'PATCH',
        body: JSON.stringify(body),
        headers,
        credentials: "include"
      }),
    }),
    changeAcceptedIn: builder.mutation({
      query: (body) => ({
        url: `/api/v1/members/acceptIn/${body.id}`,
        method: 'PATCH',
        body: JSON.stringify({acceptedIn: body.data}),
        headers,
        credentials: "include"
      }),
    }),




  }),
})


export const { useLoginModeratorMutation,useChangeAcceptedInMutation, useChangeModeratorStatusMutation ,useChangePasswordMutation, useAddModeratorMutation , useGetSingleModertatorQuery ,useGetModeratorsQuery ,useGetSingleMemberQuery, useGetAllMembersQuery , useChangeStatusMutation ,useLogoutModeratorMutation} = mainApi