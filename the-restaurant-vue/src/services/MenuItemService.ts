import api from "@/services/api.ts";
import type { ApiResponse, MenuItem } from "@/types/types.ts";

export const getMenuItems = async (): Promise<ApiResponse<MenuItem[]>> => {
    const response = await api.get("menu-items")

    return response.data
}