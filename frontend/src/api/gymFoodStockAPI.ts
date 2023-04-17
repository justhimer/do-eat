const controllerName = "gymFoodStock"

export async function getFoodStock(){
    const res = await fetch(`${process.env.REACT_APP_API_SERVER}/${controllerName}/gym/all`, {
        method: 'Get',
        headers: {
            "Content-Type": "application/json; charset=utf-8",
            "Authorization": `Bearer ${localStorage.getItem('gym_token')}`
        },
    })
    if (res.ok){
        const result = await res.json()
        return result
    }else{
        throw new Error()
    }
}