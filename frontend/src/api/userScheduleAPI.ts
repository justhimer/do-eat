const controllerName = "userSchedules";

export interface TakeAttendanceData {
    course_schedule_id: number,
    user_id: number
}

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

export async function fetchCoursesHistory() {

    const res = await fetch(`${process.env.REACT_APP_API_SERVER}/${controllerName}/history`, {
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

export async function fetchCoursesComing() {

    const res = await fetch(`${process.env.REACT_APP_API_SERVER}/${controllerName}/coming`, {
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


export async function fetchCourseRemainingSlots(courseID: number) {

    const res = await fetch(`${process.env.REACT_APP_API_SERVER}/${controllerName}/remaining/${courseID}`);

    if (res.ok) {
        const result = await res.json()
        return result;
    } else {
        throw new Error('Server Error');
    }

}

export async function gymTakeAttendance(takeAttendanceData: TakeAttendanceData) {
    const res = await fetch(`${process.env.REACT_APP_API_SERVER}/${controllerName}/gym/take_attendance`, {
        method: 'PATCH',
        headers: {
            "Content-Type": "application/json; charset=utf-8",
            "Authorization": `Bearer ${localStorage.getItem('gym_token')}`
        },
        body: JSON.stringify(takeAttendanceData)
    })
    if (res.ok) {
        const result = await res.json();
        return result
    } else {
        throw new Error('cannot take attendance')
    }
}

export async function gymFindAllAttendance(course_schedule_id: number) {
    const res = await fetch(`${process.env.REACT_APP_API_SERVER}/${controllerName}/gym/find_attendance/${course_schedule_id}`, {
        method: 'GET',
        headers: {
            "Content-Type": "application/json; charset=utf-8",
            "Authorization": `Bearer ${localStorage.getItem('gym_token')}`
        },
    })
    const result = await res.json();
    return result
}

export async function userCancelBookedCourse(user_schedule_id: number) {
    const res = await fetch(`${process.env.REACT_APP_API_SERVER}/${controllerName}/cancel/${user_schedule_id}`, {
        method: 'DELETE',
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