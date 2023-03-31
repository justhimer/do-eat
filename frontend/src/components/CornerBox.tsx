import { useIonToast } from "@ionic/react";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { fetchCalories } from "../api/calorieTransactionAPIs";
import { RootState } from "../redux/store";
import CornerStyle from "../scss/CornerBox.module.scss";
import NotificationStyle from "../scss/Notification.module.scss";

export function CornerBox() {

    // toast
    const [present] = useIonToast();
    const presentToast = (position: 'top' | 'middle' | 'bottom') => {
        present({
            message: 'Please Login',
            duration: 1500,
            position: position,
            cssClass: NotificationStyle.ionicToast,
        });
    };

    const [boxText, setBoxText] = useState("My Calories");
    const [isClicked, setIsClicked] = useState(false);

    const isLoggedIn = useSelector((state: RootState) => state.user.isAuthenticated);

    async function showCalories() {
        if (isLoggedIn) {
            const calories = await fetchCalories();
            setBoxText(`Remaining ${calories} Calories.`);
        }
    }

    useEffect(() => {
        if (isClicked) {
            showCalories();
        } else {
            setBoxText("My Calories");
        }
    }, [isClicked]);

    function clickCornerBox() {
        if (isLoggedIn) {
            setIsClicked(!isClicked);
        } else {
            presentToast('top');
        }
    }

    return (
        <div>
            <div className={CornerStyle.corner_box} onClick={clickCornerBox}>
                {boxText}
            </div>
        </div>
    )
}