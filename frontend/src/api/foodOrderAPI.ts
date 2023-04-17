export interface SaveOrderDetails {
    foodId: number;
    quantity: number;
    foodHistoryId: number;
}

// export async function createOrder() {
//     const res = await fetch(`${process.env.REACT_APP_API_SERVER}/food-order`, {
//         method: 'POST',
//         headers: {
//             "Content-Type": "application/json; charset=utf-8",
//         }
//     })
//     const data = await res.json();
//     console.log(data);

//     return data;
// }

