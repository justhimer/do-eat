const controllerName = "userSchedules";

export async function courseJoin(course:number) {
    const res = await fetch(`${process.env.REACT_APP_API_SERVER}/${controllerName}/join/${course}`, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json; charset=utf-8",
            "Authorization": `Bearer ${localStorage.getItem('token')}`
        },body:JSON.stringify({})
        })

        const result = await res.json()

        return result
    
}