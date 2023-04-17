const controllerName = "trainers";

export async function fetchTrainers() {
    const res = await fetch(`${process.env.REACT_APP_API_SERVER}/${controllerName}/all`, {
        method: "GET",
        headers: {
            "Content-Type": 'application/json',
            "Authorization": `Bearer ${localStorage.getItem('gym_token')}`
        },
    });

    const result = await res.json();
    return result;
}