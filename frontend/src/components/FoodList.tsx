import { useSelector } from "react-redux"
import { FoodSliceState } from "../redux/foodSlice";
import { IRootState } from "../redux/store";
import { FoodItem } from "./FoodItem";

export function FoodList() {

    const foods: FoodSliceState[] = useSelector((state: IRootState) => state.foods);

    return (
        <div>
            <div>Food List</div>
            {
                foods.map((food, index) => (
                    <FoodItem
                    key={index}
                    id={food.id}
                    name={food.name}
                    description={food.description}/>
                ))
            }
        </div>

    );
}