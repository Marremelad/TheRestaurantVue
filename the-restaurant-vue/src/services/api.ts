import axios from 'axios'
import type { ApiResponse } from '@/types/types'

const api = axios.create({
    baseURL: "https://localhost:44304/api/"
})

api.interceptors.response.use(
    (response) => {
        return response
    },
    (error) => {
        console.error('API Error:', error)

        if (error.response) {
            return Promise.resolve({
                data: {
                    isSuccess: false,
                    statusCode: error.response.status,
                    value: null,
                    message: error.response.data?.message || `Request failed with status code ${error.response.status}`
                }
            })
        }

        const networkErrorResponse: ApiResponse<null> = {
            isSuccess: false,
            statusCode: 500,
            value: null,
            message: 'Network error. Please check your connection.'
        }

        return Promise.resolve({
            data: networkErrorResponse
        })
    }
)

export default api