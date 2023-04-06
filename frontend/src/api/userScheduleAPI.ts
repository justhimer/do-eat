const controllerName = "userSchedules";

export async function courseJoin(course:number) {
    console.log('courseJoining')
    console.log(process.env.REACT_APP_API_SERVER)
    const res = await fetch(`${process.env.REACT_APP_API_SERVER}/${controllerName}/join/${course}`, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json; charset=utf-8",
            "Authorization": `Bearer ${localStorage.getItem('token')}`
        },body:JSON.stringify({})
        })
        // console.log("courseJoin",res)
        // if (res.ok){
        //     const result = await res.json();
        //     return result
        // }else{
        //     return res
        // }
        const result = await res.json()
        console.log(result)
        return result
    
}