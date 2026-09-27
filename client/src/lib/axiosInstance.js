import axios from 'axios'

export const AUTH_STORAGE_KEY = 'bmu_cms_auth'

export const readStoredAuth = () => {
  try {
    const raw = localStorage.getItem(AUTH_STORAGE_KEY)
    return raw ? JSON.parse(raw) : null
  } catch {
    return null
  }
}

export const writeStoredAuth = (auth) => {
  try {
    if (auth) localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(auth))
    else localStorage.removeItem(AUTH_STORAGE_KEY)
  } catch {
    // ignore storage failures (private browsing, etc.)
  }
}

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5001/api',
})

axiosInstance.interceptors.request.use((config) => {
  const stored = readStoredAuth()
  if (stored?.token) {
    config.headers.Authorization = `Bearer ${stored.token}`
  }
  return config
})

// On a 401 (expired/invalid token), clear stored auth and send the user back
// to login. A hard redirect keeps this decoupled from the router/store.
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401 && readStoredAuth()) {
      writeStoredAuth(null)
      if (!window.location.pathname.startsWith('/admin/login')) {
        window.location.href = '/admin/login'
      }
    }
    return Promise.reject(error)
  }
)

export default axiosInstance
