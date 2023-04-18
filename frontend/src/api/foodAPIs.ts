export async function fetchFoods() {
    const res = await fetch(`${process.env.REACT_APP_API_SERVER}/foods`, {
        method: "GET",
        headers: {
            "Content-Type": 'application/json',
        }
    })
    // console.log(res)
    const data = await res.json();
    return data;
}

export async function fetchOneFoods(id: number) {
    const res = await fetch(`${process.env.REACT_APP_API_SERVER}/foods/${id}`, {
        method: "GET",
        headers: {
            "Content-Type": 'application/json',
        }
    })
    // console.log(res)
    const data = await res.json();
    // console.log(data);

    return data;
}