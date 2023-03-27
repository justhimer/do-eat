import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import Corner from "../scss/Corner.module.scss";

// import { Notify } from 'notiflix/build/notiflix-notify-aio';

// react-toastify
import { ToastContainer, toast } from 'react-toastify';
import { Slide } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export function CornerBox() {

    const isAuthenticated = useSelector((state: RootState) => state.users.isAuthenticated);

    async function showCalories() {
        const isLoggedIn = isAuthenticated;
        if (isLoggedIn) {
            //   const res = await fetch("/users/calories");
            //   const result = await res.json();
            //   const calories = result.calories;

            const calories = 100;
            toast(`Remaining ${calories} calories`);
            // Notify.info(`Remaining ${calories} calories`, {
            //     position: "right-top",
            //     distance: "20px",
            //     width: "18rem",
            //     fontSize: "1rem",
            //     clickToClose: true,
            //     info: {
            //         background: "#615c59",
            //         textColor: "#cfc1ac",
            //         notiflixIconColor: "#cfc1ac",
            //     },
            // });
        } else {
            toast.warn("Please Login");
            // Notify.warning("Please Login", {
            //     width: "15rem",
            //     fontSize: "1rem",
            //     clickToClose: true,
            //     warning: {
            //         background: "#615c59",
            //         textColor: "#cfc1ac",
            //         notiflixIconColor: "#cfc1ac",
            //     },
            // });
        }
    }

    return (
        <div>
            <div className={Corner.corner_box} onClick={showCalories}>My Calories</div>
            <ToastContainer
                toastClassName={Corner.toast}
                transition={Slide}
                position="top-right"
                autoClose={3000}
                hideProgressBar={true}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                toastStyle={{ 
                    backgroundColor: "#615c59",
                    color: "#cfc1ac",
                }}
            />
        </div>
    )
}