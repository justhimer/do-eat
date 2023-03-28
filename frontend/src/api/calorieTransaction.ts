export async function fetchCalories(id: number) {
    const res = await fetch(`${process.env.REACT_APP_API_SERVER}/calorie/${id}`, {
        method: "GET",
        headers: {
            "Content-Type": 'application/json',
            "Authorization": `Bearer ${localStorage.getItem('token')}`
        },
    });
    const result = await res.json();
    return result;
}