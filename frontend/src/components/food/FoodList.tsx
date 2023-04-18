
import { FoodItem } from "./FoodItem";
import AppStyle from '../../scss/App.module.scss';
import { useQuery } from "@tanstack/react-query";
import { fetchFoods } from "../../api/foodAPIs";
import { NoResult } from "./../NoResult";
import { fetchFoodTypes } from "../../api/foodTypeAPIs";
import { FoodTypes } from "./FoodTypes";
import { IonList, IonItem, IonSelect, IonSelectOption } from "@ionic/react";
import { useState } from "react";


export function FoodList() {

    const { data: foodTypes, isLoading: isLoadingFoodTypes, refetch: refetchFoodTypes } = useQuery({
        queryKey: ["food_types"],
        queryFn: fetchFoodTypes,
    });

    const { data: foods, isLoading: isLoadingFoods, refetch: refetchFoods } = useQuery({
        queryKey: ["foods"],
        queryFn: async () => {
            const foods = await fetchFoods();
            // console.log('foods: ', foods);
            return foods;
        },
    });

    const [selectedFoodTypes, setSelectedFoodTypes] = useState<number>(0);

    function selectFoodType(typeID: number) {
        setSelectedFoodTypes(typeID);
        return;
    }

    return (
        <div>
            <div className={AppStyle.title} >Food List  </div>

            <IonList>
                <IonItem>
                    <IonSelect aria-label="Food Types" label="Food Types" placeholder="Select Food Types" justify="space-between"
                        onIonChange={(e) => selectFoodType(e.detail.value)}>
                        <IonSelectOption value={0}>All</IonSelectOption>
                        {
                            foodTypes && foodTypes.length > 0 && foodTypes.map((foodType: any, index: number) => (
                                <FoodTypes
                                    key={index}
                                    id={foodType.id}
                                    name={foodType.name}
                                />
                            ))
                        }
                    </IonSelect>
                </IonItem>
            </IonList>

            {
                foods && foods.length > 0 && foods.map((food: any, index: number) => {

                    if (selectedFoodTypes === 0) {
                        return <FoodItem
                            key={index}
                            id={food.id}
                            name={food.name}
                            description={food.description}
                            image={food.image}
                            calories={food.calories}
                            allergens={food.calories} />
                    } else if (food.food_types.id === selectedFoodTypes) {
                        return <FoodItem
                            key={index}
                            id={food.id}
                            name={food.name}
                            description={food.description}
                            image={food.image}
                            calories={food.calories}
                            allergens={food.calories} />
                    }
                })
            }
            {(foods && foods.length === 0) && <NoResult />}
            <br />
            <br />
            <br />
        </div>

    );
}
