import axios from 'axios'
import type { ApiResponse } from '@/types/types'

const api = axios.create({
    baseURL: "https://localhost:44304/api/"
})

api.interceptors.response.use(
    (response) => {
        console.log("Success Success!")
        return response
    },
    (error) => {
        console.error('API Error:', error)

        if (error.response) {
            return Promise.resolve({
                ...error.response,
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