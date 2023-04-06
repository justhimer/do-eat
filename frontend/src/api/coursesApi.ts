const controllerName = "coursesSchedules"


export async function getDatesWithCourses(gyms:number[]) {
    const res = await fetch(`${process.env.REACT_APP_API_SERVER}/${controllerName}/users/dates`, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json; charset=utf-8"
        },
        body:JSON.stringify({gyms:gyms})
    })
    const result = await res.json();
    return result
}

export async function getCoursesOnDate(time:string,gyms:number[]) {
    console.log('getting courses on date')

    const res = await fetch(`${process.env.REACT_APP_API_SERVER}/${controllerName}/users/onDay`, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json; charset=utf-8"
        },
        body: JSON.stringify({time:time,gyms:gyms})
    })
    const result = await res.json();
    console.log("result at courses on date: ", result)
    return result
}