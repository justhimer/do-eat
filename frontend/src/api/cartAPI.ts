import { id } from "date-fns/locale";

export async function fetchAddItem(item: {
    food_id: number
    quantity: number,
}) {
    console.log(item);

    const res = await fetch(`${process.env.REACT_APP_API_SERVER}/cart`, {
        method: "POST",
        body: JSON.stringify(item),
        headers: {
            "Authorization": `Bearer ${localStorage.getItem('token')}`,
            "Content-Type": 'application/json',
        }
    })
    // console.log(res)
    const data = await res.json();
    console.log(data);

    return data;
}

export async function fetchAllCartItems() {
    const res = await fetch(`${process.env.REACT_APP_API_SERVER}/cart`, {
        method: "GET",
        headers: {
            "Content-Type": 'application/json',
            "Authorization": `Bearer ${localStorage.getItem('token')}`,
        }
    })
    const data = await res.json();
    console.log(data);

    return data;
}







export async function updateCart() {
    const res = await fetch(`${process.env.REACT_APP_API_SERVER}/cart/update`, {
        method: "GET",
        headers: {
            "Content-Type": 'application/json',
        }
    })
    const data = await res.json();


    return data;
}