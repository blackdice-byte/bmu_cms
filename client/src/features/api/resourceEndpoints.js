// Builds the standard list/detail/create/update/delete RTK Query endpoints
// for a REST resource, with cache tags wired up so mutations invalidate the
// right list/detail entries. Mirrors the server's shared CRUD pattern.
export const buildResourceEndpoints = (builder, { path, tag }) => ({
  [`list${tag}`]: builder.query({
    query: (params) => ({ url: `/${path}`, params }),
    providesTags: (result) =>
      result?.data
        ? [...result.data.map((item) => ({ type: tag, id: item._id })), { type: tag, id: 'LIST' }]
        : [{ type: tag, id: 'LIST' }],
  }),
  [`get${tag}`]: builder.query({
    query: (id) => ({ url: `/${path}/${id}` }),
    providesTags: (result, error, id) => [{ type: tag, id }],
  }),
  [`create${tag}`]: builder.mutation({
    query: (body) => ({ url: `/${path}`, method: 'post', data: body }),
    invalidatesTags: [{ type: tag, id: 'LIST' }],
  }),
  [`update${tag}`]: builder.mutation({
    query: ({ id, ...body }) => ({ url: `/${path}/${id}`, method: 'put', data: body }),
    invalidatesTags: (result, error, { id }) => [
      { type: tag, id },
      { type: tag, id: 'LIST' },
    ],
  }),
  [`delete${tag}`]: builder.mutation({
    query: (id) => ({ url: `/${path}/${id}`, method: 'delete' }),
    invalidatesTags: [{ type: tag, id: 'LIST' }],
  }),
})
