import { createApi } from '@reduxjs/toolkit/query/react'
import { axiosBaseQuery } from './axiosBaseQuery'
import { buildResourceEndpoints } from './resourceEndpoints'

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: axiosBaseQuery(),
  tagTypes: [
    'Department',
    'Staff',
    'Program',
    'Service',
    'Gallery',
    'Event',
    'Page',
    'News',
    'Inquiry',
    'User',
    'Stats',
  ],
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (credentials) => ({ url: '/auth/login', method: 'post', data: credentials }),
    }),
    me: builder.query({
      query: () => ({ url: '/auth/me' }),
    }),
    getOverview: builder.query({
      query: () => ({ url: '/stats/overview' }),
      providesTags: ['Stats'],
    }),

    ...buildResourceEndpoints(builder, { path: 'departments', tag: 'Department' }),
    ...buildResourceEndpoints(builder, { path: 'staff', tag: 'Staff' }),
    ...buildResourceEndpoints(builder, { path: 'programs', tag: 'Program' }),
    ...buildResourceEndpoints(builder, { path: 'services', tag: 'Service' }),
    ...buildResourceEndpoints(builder, { path: 'gallery', tag: 'Gallery' }),
    ...buildResourceEndpoints(builder, { path: 'events', tag: 'Event' }),
    ...buildResourceEndpoints(builder, { path: 'pages', tag: 'Page' }),
    ...buildResourceEndpoints(builder, { path: 'news', tag: 'News' }),
    ...buildResourceEndpoints(builder, { path: 'inquiries', tag: 'Inquiry' }),
    ...buildResourceEndpoints(builder, { path: 'users', tag: 'User' }),

    submitInquiry: builder.mutation({
      query: (body) => ({ url: '/inquiries', method: 'post', data: body }),
    }),
  }),
})

export const {
  useLoginMutation,
  useMeQuery,
  useGetOverviewQuery,

  useListDepartmentQuery,
  useGetDepartmentQuery,
  useCreateDepartmentMutation,
  useUpdateDepartmentMutation,
  useDeleteDepartmentMutation,

  useListStaffQuery,
  useGetStaffQuery,
  useCreateStaffMutation,
  useUpdateStaffMutation,
  useDeleteStaffMutation,

  useListProgramQuery,
  useGetProgramQuery,
  useCreateProgramMutation,
  useUpdateProgramMutation,
  useDeleteProgramMutation,

  useListServiceQuery,
  useGetServiceQuery,
  useCreateServiceMutation,
  useUpdateServiceMutation,
  useDeleteServiceMutation,

  useListGalleryQuery,
  useGetGalleryQuery,
  useCreateGalleryMutation,
  useUpdateGalleryMutation,
  useDeleteGalleryMutation,

  useListEventQuery,
  useGetEventQuery,
  useCreateEventMutation,
  useUpdateEventMutation,
  useDeleteEventMutation,

  useListPageQuery,
  useGetPageQuery,
  useCreatePageMutation,
  useUpdatePageMutation,
  useDeletePageMutation,

  useListNewsQuery,
  useGetNewsQuery,
  useCreateNewsMutation,
  useUpdateNewsMutation,
  useDeleteNewsMutation,

  useListInquiryQuery,
  useGetInquiryQuery,
  useCreateInquiryMutation,
  useUpdateInquiryMutation,
  useDeleteInquiryMutation,

  useListUserQuery,
  useGetUserQuery,
  useCreateUserMutation,
  useUpdateUserMutation,
  useDeleteUserMutation,

  useSubmitInquiryMutation,
} = apiSlice
