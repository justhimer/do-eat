const controllerName = "courses"

export interface gymCourseData{
    calories: number; 
    course_id: number;
    course_type_id: number;
    course_type_name: string; 
    credits: number; 
    default_quota: number; 
    default_trainer_id: number;
    duration: number; 
    gym_id: number;
    intensity_id: number;
    intensity_level: string;
    name: string; 
    trainer_icon: string;
    trainer_name: string; 
    }

export async function getCoursesforGym() :Promise<gymCourseData[]>{
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