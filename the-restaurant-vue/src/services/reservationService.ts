import api from "@/services/api.ts";
import type { ApiResponse, ReservationCreate, Unit } from "@/types/types.ts";

export const createReservation = async (reservationData: ReservationCreate): Promise<ApiResponse<Unit>> => {
    const response = await api.post("reservations", reservationData)
    return response.data
}