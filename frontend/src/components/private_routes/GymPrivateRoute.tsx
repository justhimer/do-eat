import { useSelector } from "react-redux";
import { Redirect, Route } from "react-router-dom";
import { RootState } from "../../redux/store";

export function GymPrivateRouter({ component: Component }: any) {
    const isGymLoggedIn = useSelector(((state: RootState) => state.gym.isAuthenticated));

    const render = () => {
        if (isGymLoggedIn) {
            return <Route render={() => Component}></Route>
        } else {
            return <Redirect to={"/user-tab"} />
        }
    }
    return render()
}