export interface ApiResponse<T = any> {
    isSuccess: boolean,
    statusCode: number,
    value: T | null,
    message: string
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

export interface MenuItem {
    id: number,
    name: string,
    price: number,
    description: string,
    image: string,
    isPopular: boolean
}