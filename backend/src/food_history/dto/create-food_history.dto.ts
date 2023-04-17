export class CreateFoodHistoryDto {
    gym_id: number;
    user_id: number;
    collection_status: boolean;
    foodOrders: {
        cart_id: number;
        food_id: number;
        quantity: number;
    }[];
}

