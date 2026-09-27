import axiosInstance from '@/lib/axiosInstance'

// Lets RTK Query endpoints use our shared axios instance (interceptors for
// the JWT header and 401 handling) instead of the default fetch-based query.
export const axiosBaseQuery =
  () =>
  async ({ url, method = 'get', data, params }) => {
    try {
      const result = await axiosInstance({ url, method, data, params })
      return { data: result.data }
    } catch (axiosError) {
      const err = axiosError
      return {
        error: {
          status: err.response?.status,
          data: err.response?.data || { message: err.message },
        },
      }
    }
  }
