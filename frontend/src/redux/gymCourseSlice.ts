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
            state.course_id =action.payload.course_id
            state.calories = action.payload.calories
            state.course_id = action.payload.course_id
            state.course_type_id = action.payload.course_type_id
            state.course_type_name = action.payload.course_type_name
            state.credits = action.payload.credits
            state.duration = action.payload.duration
            state.gym_id = action.payload.gym_id
            state.intensity_level = action.payload.intensity_level
            state.name = action.payload.name
            state.default_quota = action.payload.default_quota
            state.duration = action.payload.duration
            state.trainer_icon = action.payload.trainer_icon
            state.trainer_name = action.payload.trainer_name   
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