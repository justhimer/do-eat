const controllerName = "courses"

export interface gymCourseData {
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

export interface gymCourseUpload {
    id: number;
    intensity_id: number;
    course_type_id: number;
    gym_id: number;
    name: string;
    credits: number;
    calories: number;
    duration: number;
    default_quota: number;
    default_trainer_id: number;
}

export async function getCoursesforGym(): Promise<gymCourseData[]> {
    const res = await fetch(`${process.env.REACT_APP_API_SERVER}/${controllerName}/gyms/all`, {
        method: 'GET',
        headers: {
            "Content-Type": "application/json; charset=utf-8",
            "Authorization": `Bearer ${localStorage.getItem('gym_token')}`
        }
    })
    const result = await res.json()
    if (res.ok) {
        return result
    } else {
        throw new Error(result)
    }
}

export async function updateCourseDetail(uploadData:gymCourseUpload) {
        const res = await fetch(`${process.env.REACT_APP_API_SERVER}/${controllerName}/gyms/course`, {
            method: 'PUT',
            headers: {
                "Content-Type": "application/json; charset=utf-8",
                "Authorization": `Bearer ${localStorage.getItem('gym_token')}`
            },
            body: JSON.stringify(uploadData)
        })
        if (res.ok){
            const result = await res.json()
            return result
        }else{
            throw new Error()
        }
}

export async function createCourseDetail(uploadData:gymCourseUpload){
    const res = await fetch(`${process.env.REACT_APP_API_SERVER}/${controllerName}/gyms/course`, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json; charset=utf-8",
            "Authorization": `Bearer ${localStorage.getItem('gym_token')}`
        },
        body: JSON.stringify(uploadData)
    })
    if (res.ok){
        const result = await res.json()
        return result
    }else{
        throw new Error()
    }
}