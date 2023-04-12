const controllerName = "userSchedules";

export async function courseJoin(course: number) {
    const res = await fetch(`${process.env.REACT_APP_API_SERVER}/${controllerName}/join/${course}`, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json; charset=utf-8",
            "Authorization": `Bearer ${localStorage.getItem('token')}`
        }, body: JSON.stringify({})
    })

    if (res.ok) {
        const result = await res.json()
        if (result.status && result.status >= 300) {
            return false
        } else {
            return true
        }
    }

}

export async function fetchCourses() {

    const res = await fetch(`${process.env.REACT_APP_API_SERVER}/${controllerName}/`, {
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