const controllerName = "coursesSchedules"

export interface ScheduleInterface {
    course_id: number,
    quota: number,
    schedule_id: number,
    time: string,
    trainer_id: number,
    trainer_name: string;
}

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


    const res = await fetch(`${process.env.REACT_APP_API_SERVER}/${controllerName}/users/onDay`, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json; charset=utf-8"
        },
        body: JSON.stringify({time:time,gyms:gyms})
    })
    const result = await res.json();

    return result
}


export async function fetchGymSoloCourseSchedule(course_id:number) :Promise<ScheduleInterface[]>{
    const res = await fetch(`${process.env.REACT_APP_API_SERVER}/${controllerName}/gym/course/schedule/${course_id}`, {
        method: "GET",
        headers: {
            "Content-Type": 'application/json',
            "Authorization": `Bearer ${localStorage.getItem('token')}`
        },
    });
    const result = await res.json()
    if (res.ok){
        return result
    }else{
        throw new Error(result)
    }

}