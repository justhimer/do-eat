const controllerName = "food-history";

export interface FoodTakenData {
    user_id: number
}

export interface CheckoutDeatils {
    gym_id: number;
    user_id: number;
    collection_status: boolean;
    foodOrders: {
        cart_id: number;
        food_id: number;
        quantity: number;
    }[];
}

export async function createFoodHistory(checkOutDetails: CheckoutDeatils) {
    const res = await fetch(`${process.env.REACT_APP_API_SERVER}/${controllerName}`, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json; charset=utf-8",
            "Authorization": `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify(checkOutDetails)
    })
    const data = await res.json();
    console.log('data', data);

    return data;
}

export async function fetchFoodsToBeCollectedForUser() {

    const res = await fetch(`${process.env.REACT_APP_API_SERVER}/${controllerName}/user/to_collect`, {
        method: 'GET',
        headers: {
            "Content-Type": "application/json; charset=utf-8",
            "Authorization": `Bearer ${localStorage.getItem('token')}`
        }
    })

    if (res.ok) {
        const result = await res.json()
        return result;
    } else {
        throw new Error('Server Error');
    }

}

export async function fetchFoodsCollectedByUser() {

    const res = await fetch(`${process.env.REACT_APP_API_SERVER}/${controllerName}/user/collected`, {
        method: 'GET',
        headers: {
            "Content-Type": "application/json; charset=utf-8",
            "Authorization": `Bearer ${localStorage.getItem('token')}`
        }
    })

    if (res.ok) {
        const result = await res.json()
        return result;
    } else {
        throw new Error('Server Error');
    }

}

export async function fetchFoodsOrdersForGym() {

    const res = await fetch(`${process.env.REACT_APP_API_SERVER}/${controllerName}/gym/orders`, {
        method: 'GET',
        headers: {
            "Content-Type": "application/json; charset=utf-8",
            "Authorization": `Bearer ${localStorage.getItem('gym_token')}`
        }
    })

    if (res.ok) {
        const result = await res.json()
        return result;
    } else {
        throw new Error('Server Error');
    }

}

export async function gymFoodTaken(foodTakenData: FoodTakenData) {
    const res = await fetch(`${process.env.REACT_APP_API_SERVER}/${controllerName}/gym/food_taken`, {
        method: 'PATCH',
        headers: {
            "Content-Type": "application/json; charset=utf-8",
            "Authorization": `Bearer ${localStorage.getItem('gym_token')}`
        },
        body: JSON.stringify(foodTakenData)
    })
    console.log('res.ok: ', res.ok);
    if (res.ok) {
        const result = await res.json();
        return result
    } else {
        throw new Error('cannot take food')
    }
}