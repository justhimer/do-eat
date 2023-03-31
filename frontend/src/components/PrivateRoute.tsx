import { useSelector } from "react-redux";
import { Redirect, Route } from "react-router-dom";
import { RootState } from "../redux/store";

export default function PrivateRouter({ component: Component }: any) {
    const isUserLoggedIn = useSelector(((state: RootState) => state.user.isAuthenticated));
    const isGymLoggedIn = useSelector(((state: RootState) => state.gym.isAuthenticated));

    const render = () => {
        if (isUserLoggedIn || isGymLoggedIn) {
            return <Route render={() => Component}></Route>
        } else {
            return <Redirect to={"/login"} />
        }
    }
    return render()
}