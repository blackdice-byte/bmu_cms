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
    'Patient',
    'MedicalRecord',
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
    ...buildResourceEndpoints(builder, { path: 'patients', tag: 'Patient' }),
    ...buildResourceEndpoints(builder, { path: 'medical-records', tag: 'MedicalRecord' }),

    submitInquiry: builder.mutation({
      query: (body) => ({ url: '/inquiries', method: 'post', data: body }),
    }),
    getAvailability: builder.query({
      query: ({ department, date }) => ({ url: '/inquiries/availability', params: { department, date } }),
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

  useListPatientQuery,
  useGetPatientQuery,
  useCreatePatientMutation,
  useUpdatePatientMutation,
  useDeletePatientMutation,

  useListMedicalRecordQuery,
  useGetMedicalRecordQuery,
  useCreateMedicalRecordMutation,
  useUpdateMedicalRecordMutation,
  useDeleteMedicalRecordMutation,

  useSubmitInquiryMutation,
  useGetAvailabilityQuery,
} = apiSlice
