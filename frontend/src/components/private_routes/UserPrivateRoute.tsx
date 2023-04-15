import { useSelector } from "react-redux";
import { Redirect, Route } from "react-router-dom";
import { RootState } from "../../redux/store";

export function UserPrivateRouter({ component: Component }: any) {
    const isUserLoggedIn = useSelector(((state: RootState) => state.user.isAuthenticated));

    const render = () => {
        if (isUserLoggedIn) {
            return <Route render={() => Component}></Route>
        } else {
            return <Redirect to={"/user-tab"} />
        }
    }
    return render()
}