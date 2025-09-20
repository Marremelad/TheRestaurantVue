export interface ApiResponse<T = any> {
    isSuccess: boolean,
    statusCode: number,
    value: T | null,
    message: string
}

export type Unit = void

export interface MenuItem {
    id: number,
    name: string,
    price: number,
    description: string,
    image: string,
    isPopular: boolean
}

export interface AvailabilityRequest {
    partySize: number,
    date: string
}

export interface AvailabilityResponse {
    date: string,
    timeSlot: number,
    displayableTimeSlot: string,
    tableNumber: number,
    tableCapacity: number
}

export interface ReservationHold {
    date: string,
    timeSlot: number,
    tableNumber: number,
    tableCapacity: number
}

export interface PersonalInfo {
    firstName: string,
    lastName: string,
    email: string
}

export interface ReservationCreate {
    reservationHoldId: number,
    personalInfo: PersonalInfo
}