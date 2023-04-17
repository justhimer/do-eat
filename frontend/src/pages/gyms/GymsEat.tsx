import { IonCardContent, IonContent, IonHeader, IonItem, IonLabel, IonList, IonPage, IonSegment, IonSegmentButton, IonThumbnail, IonTitle, IonToolbar } from "@ionic/react"
import { useQuery } from "@tanstack/react-query"
import { getFoodStock } from "../../api/gymFoodStockAPI"


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
                    <IonTitle>Gyms' "Eat"</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent fullscreen>
                <IonCardContent>
                    <IonList>
                        {
                            foodStock.data ? foodStock.data.map((elem:any,index:any)=><IonItem key={index}>
                                <IonThumbnail slot="start">
                                    <img src={`./assets/foodimage/${elem.food_image}`} />
                                </IonThumbnail>
                                <div>
                                <IonLabel>{elem.food_name}</IonLabel>
                                <IonLabel>{elem.quantity} remaining</IonLabel>
                                </div>
                                
                            </IonItem>)
                                
                                : <></>
                        }


                    </IonList>
                </IonCardContent>
            </IonContent>
        </IonPage >
    )
}