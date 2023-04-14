import { id } from "date-fns/locale";

export async function fetchAddItem(item: {
    id: number
    calories: number,
}) {
    console.log(item);

    const res = await fetch(`${process.env.REACT_APP_API_SERVER}/cart/addItem`, {
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

export async function fetchGetCart() {
    const res = await fetch(`${process.env.REACT_APP_API_SERVER}/cart/id`, {
        method: "GET",
        headers: {
            "Content-Type": 'application/json',
        }
    })
    const data = await res.json();


    return data;
}