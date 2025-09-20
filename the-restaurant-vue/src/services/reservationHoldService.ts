import api from "@/services/api.ts";
import type {ApiResponse, AvailabilityResponse} from "@/types/types";

export const createReservationHold = async (rh: AvailabilityResponse): Promise<ApiResponse<number>> => {
    const response = await api.post("reservation-holds", {
        date: rh.date,
        timeSlot: rh.timeSlot,
        tableNumber: rh.tableNumber,
        tableCapacity: rh.tableCapacity
    })

    return response.data
}