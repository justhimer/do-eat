import { useSelector } from "react-redux";
import { Redirect, Route } from "react-router-dom";
import { RootState } from "../redux/store";

export default function PrivateRouter({ component: Component }: any) {
    const isAuthenticated = useSelector(((state: RootState) => state.user.isAuthenticated))

    const render = () => {
        if (isAuthenticated) {
            return <Route render={() => Component}></Route>
        } else {
            return <Redirect to={"/login"} />
        }
    }
    return render()
}