import { useSelector } from "react-redux"
import { FoodSliceState } from "../redux/foodSlice";
import { RootState } from "../redux/store";
import { FoodItem } from "./FoodItem";
import AppStyle from '../scss/App.module.scss';

export function FoodList() {

    const foods: FoodSliceState[] = useSelector((state: RootState) => state.foods);

    return (
        <div>
            <div className={AppStyle.title}>Food List</div>
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