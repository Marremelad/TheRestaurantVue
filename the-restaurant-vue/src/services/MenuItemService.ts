import api from "@/services/api.ts";
import type { ApiResponse, MenuItem } from "@/types/types.ts";

export const GetMenuItems = async (mi: MenuItem): Promise<ApiResponse<MenuItem[]>> => {
    const response = await api.get("menu-items", {
        id: mi.id,
        name: mi.name,
        price: mi.price,
        description: mi.description,
        image: mi.image,
        isPopular: mi.isPopular
    })

    return response.data
}