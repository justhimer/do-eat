import { useSelector } from "react-redux"
import { FoodSliceState } from "../redux/foodSlice";
import { RootState } from "../redux/store";
import { FoodItem } from "./FoodItem";
import AppStyle from '../scss/App.module.scss';
import { useQuery } from "@tanstack/react-query";
import { fetchFoods } from "../api/foodAPIs";
import React, { useState } from 'react';


export function FoodList() {

    // get foods from backend
    const { data: foods, isLoading, refetch } = useQuery({
        queryKey: ["foods"],
        queryFn: fetchFoods,
    });  // rename data to foods


    return (
        <div>
            <div className={AppStyle.title}>Food List</div>
            {
                foods && foods.length > 0 && foods.map((food: any, index: number) => (
                    <FoodItem
                        key={index}
                        id={food.id}
                        name={food.name}
                        description={food.description}
                        image={food.image}
                        calories={food.calories}
                        allergens={food.calories} />
                ))
            }
        </div>

    );
}