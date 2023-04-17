import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { gymCourseData } from "../api/coursesApi";

const initialState: gymCourseData = {
    calories: NaN,
    course_id: NaN,
    course_type_id: NaN,
    course_type_name: "string",
    credits: NaN,
    default_quota: NaN,
    default_trainer_id: NaN,
    duration: NaN,
    gym_id: NaN,
    intensity_id: NaN,
    intensity_level: "",
    name: "",
    trainer_icon: "",
    trainer_name: ""
}

const gymCourseSlice = createSlice({
    name: "gymCourse",
    initialState,
    reducers: {
        sendGymCourse: (state, action: PayloadAction<gymCourseData>) => {
            console.log('send gym course at gymcourseslice')
            console.log("action.payload: ",action.payload)
            return Object.assign(state, {
                calories: action.payload.calories,
                course_id: action.payload.course_id,
                course_type_id: action.payload.course_type_id,
                course_type_name: action.payload.course_type_name,
                credits: action.payload.credits,
                default_quota: action.payload.default_quota,
                default_trainer_id: action.payload.default_trainer_id,
                duration: action.payload.duration,
                gym_id: action.payload.gym_id,
                intensity_id: action.payload.intensity_id,
                intensity_level: action.payload.intensity_level,
                name: action.payload.name,
                trainer_icon: action.payload.trainer_icon,
                trainer_name: action.payload.trainer_name 
            })
        },
        resetGymCourse: (state) => {
            return Object.assign(state, {
                calories: NaN,
                course_id: NaN,
                course_type_id: NaN,
                course_type_name: "string",
                credits: NaN,
                default_quota: NaN,
                default_trainer_id: NaN,
                duration: NaN,
                gym_id: NaN,
                intensity_id: NaN,
                intensity_level: "",
                name: "",
                trainer_icon: "",
                trainer_name: ""
            })
        }

    }
})

export const {sendGymCourse, resetGymCourse} = gymCourseSlice.actions

export default gymCourseSlice.reducer;