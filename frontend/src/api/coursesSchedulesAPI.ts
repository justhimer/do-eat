const controllerName = "coursesSchedules"

export interface ScheduleCreate {
    course_id: number,
    quota: number,
    time: string,
    trainer_id: number,
}

export interface ScheduleInterface extends ScheduleCreate {
    schedule_id: number,
    trainer_name: string;
}

export async function fetchCourseName(course_schedule_id: number) {
    const res = await fetch(`${process.env.REACT_APP_API_SERVER}/${controllerName}/course-name/${course_schedule_id}`, {
        method: 'GET',
        headers: {
            "Content-Type": "application/json; charset=utf-8"
        },
    })
    const result = await res.json();
    return result
}

export async function getDatesWithCourses(gyms: number[]) {
    const res = await fetch(`${process.env.REACT_APP_API_SERVER}/${controllerName}/users/dates`, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json; charset=utf-8"
        },
        body: JSON.stringify({ gyms: gyms })
    })
    const result = await res.json();
    return result
}

export async function getCoursesOnDate(time: string, gyms: number[]) {

    const res = await fetch(`${process.env.REACT_APP_API_SERVER}/${controllerName}/users/onDay`, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json; charset=utf-8"
        },
        body: JSON.stringify({ time: time, gyms: gyms })
    })
    const result = await res.json();

    return result
}


export async function fetchGymSoloCourseSchedule(course_id: number): Promise<ScheduleInterface[]> {
    const res = await fetch(`${process.env.REACT_APP_API_SERVER}/${controllerName}/gym/course/schedule/${course_id}`, {
        method: "GET",
        headers: {
            "Content-Type": 'application/json',
            "Authorization": `Bearer ${localStorage.getItem('token')}`
        },
    });
    const result = await res.json()
    if (res.ok) {
        return result
    } else {
        throw new Error(result)
    }
}

export async function fetchCoursesInNext24Hours() {
    const res = await fetch(`${process.env.REACT_APP_API_SERVER}/${controllerName}/gym/24hrs`, {
        method: 'GET',
        headers: {
            "Content-Type": "application/json; charset=utf-8",
            "Authorization": `Bearer ${localStorage.getItem('gym_token')}`
        }
    })
    const result = await res.json();
    return result
}

export async function fetchComingCourse() {
    const res = await fetch(`${process.env.REACT_APP_API_SERVER}/${controllerName}/gym/coming`, {
        method: 'GET',
        headers: {
            "Content-Type": "application/json; charset=utf-8",
            "Authorization": `Bearer ${localStorage.getItem('gym_token')}`
        }
    })
    const result = await res.json();
    return result
}

export async function createCourseSchedule(reqData: ScheduleCreate) {
    console.log("reqData: ", JSON.stringify(reqData))
    const res = await fetch(`${process.env.REACT_APP_API_SERVER}/${controllerName}/gym/create/courseSchedule`, {
        method: "POST",
        headers: {
            "Content-Type": 'application/json',
            "Authorization": `Bearer ${localStorage.getItem('gym_token')}`
        }, body: JSON.stringify(reqData)
    });
    const result = await res.json()
    if (res.ok) {
        return result
    } else {
        throw new Error(result)
    }

}

export async function deleteCourseSchedule(schedule_id:number) {
    console.log('deleting')
    const res = await fetch(`${process.env.REACT_APP_API_SERVER}/${controllerName}/gym/delete/${schedule_id}`, {
        method: "DELETE",
        headers: {
            "Content-Type": 'application/json',
            "Authorization": `Bearer ${localStorage.getItem('gym_token')}`
        }
    });
    const result = await res.json()
    if (res.ok) {
        return result
    } else {
        throw new Error(result)
    }

}

