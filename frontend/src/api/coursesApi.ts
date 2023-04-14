const controllerName = "courses"

export async function getCoursesforGym(){
    const res = await fetch(`${process.env.REACT_APP_API_SERVER}/${controllerName}/gyms/all`, {
        method: 'GET',
        headers:{
            "Content-Type": "application/json; charset=utf-8",
            "Authorization": `Bearer ${localStorage.getItem('gym_token')}`
        }
    })
    const result = await res.json()
    if (res.ok){
        return result
    }else{
        throw new Error(result)
    }
}