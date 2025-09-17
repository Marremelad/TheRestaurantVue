import api from "@/services/api.ts";
import type { ApiResponse, AvailabilityRequest, AvailabilityResponse } from '@/types/types'

export const getAvailableTimeSlots = async (ar: AvailabilityRequest): Promise<ApiResponse<AvailabilityResponse[]>> => {
    const response = await api.post("availability", {
        partySize: ar.partySize,
        date: ar.date
    })

    return response.data
}