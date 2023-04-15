const controllerName = "course-type"

export interface CourseTypeInterface{
    id: number,
    name: string,
    }

export async function getCourseType() :Promise<CourseTypeInterface[]>{
    const res = await fetch(`${process.env.REACT_APP_API_SERVER}/${controllerName}`, {
        method: 'GET',
        headers:{
            "Content-Type": "application/json; charset=utf-8",
        }
    })
    const result = await res.json()
    if (res.ok){
        return result
    }else{
        throw new Error(result)
    }
}