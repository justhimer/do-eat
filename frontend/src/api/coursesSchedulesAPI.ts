const controllerName = "coursesSchedules"


export async function getDatesWithCourses(gyms: number[]) {
    const res = await fetch(`${process.env.REACT_APP_API_SERVER}/${controllerName}/users/dates`, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json; charset=utf-8"
        },
        body: JSON.stringify({ gyms: gyms })
    })
    const result = await res.json();
    return result
}

export async function getCoursesOnDate(time: string, gyms: number[]) {

    const res = await fetch(`${process.env.REACT_APP_API_SERVER}/${controllerName}/users/onDay`, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json; charset=utf-8"
        },
        body: JSON.stringify({ time: time, gyms: gyms })
    })
    const result = await res.json();

    return result
}

export async function fetchCoursesInNext24Hours() {

    const res = await fetch(`${process.env.REACT_APP_API_SERVER}/${controllerName}/gym/24hrs`, {
        method: 'GET',
        headers: {
            "Content-Type": "application/json; charset=utf-8",
            "Authorization": `Bearer ${localStorage.getItem('gym_token')}`
        }
    })
    const result = await res.json();
    return result
}


