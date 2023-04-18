import { IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle, IonChip, IonContent, IonHeader, IonIcon, IonItem, IonLabel, IonList, IonPage, IonSegment, IonSegmentButton, IonThumbnail, IonTitle, IonToolbar } from "@ionic/react"
import { useQuery } from "@tanstack/react-query"
import { getFoodStock } from "../../api/gymFoodStockAPI"
import { cardOutline, flameOutline } from "ionicons/icons"

// CSS Style
import courseStyle from '../../scss/GymCourses.module.scss'
import NotificationStyle from "../../scss/Notification.module.scss";
import confirmationStyle from '../../scss/GymConfirm.module.scss'


export function GymsEat() {

    const foodStock = useQuery({
        queryKey: ['foodStock'],
        queryFn: () => getFoodStock()
    })

    if (foodStock.data) {
        console.log(foodStock.data)
    }

    return (
        <IonPage >
            <IonHeader >
                <IonToolbar >
                    <IonTitle>Gyms' Eat</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent fullscreen>
                         {
                            foodStock.data ? foodStock.data.map((elem: any, index: any) => <IonCard id={`food_${'test'}`} key={index} onClick={()=>{}} className={'test'}>
                                <div className={courseStyle.cardSplitter}>
                                    <div className={courseStyle.cardLeftComponent}>
                                        <img src={`./assets/foodimage/${elem.food_image}`} className={courseStyle.cardThumbnail}></img>
                                    </div>
                                    <div className={courseStyle.cardContent}>
                                        <IonCardHeader style={{"margin-top":"15px"}}>
                                            <IonCardTitle>{elem.food_name}</IonCardTitle>
                                            <IonCardSubtitle></IonCardSubtitle>
                                            <IonCardSubtitle>Remaining | {elem.quantity}</IonCardSubtitle>
                                        </IonCardHeader>
                                    </div>
                                    <div className={courseStyle.cardTopRightChips}>
                                        <IonChip >
                                            <IonIcon icon={flameOutline} />
                                            <IonLabel>{elem.calories}</IonLabel>
                                        </IonChip>
                                    </div>
                                </div>

                            </IonCard>)

                                : <></>
                        }

            </IonContent>
        </IonPage >
    )
}