// Fooddetails.tsx
import { IonGrid, IonRow, IonCol, IonPage, IonHeader, IonToolbar, IonTitle, IonContent, useIonLoading, IonBackButton } from '@ionic/react';
import React, { useEffect, useState } from 'react';
import { FoodItemProps } from './FoodItem';
import { IonButton } from '@ionic/react';
import Fooddetailsstyle from '../scss/Fooddetails.module.scss'
import { useHistory } from 'react-router-dom';
import { useMutation, useQuery } from '@tanstack/react-query';
import { fetchOneFoods } from '../api/foodAPIs';



export const Fooddetails = ({ match }: { match: any }) => {

    const [image, setImage] = useState('');
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [calories, setCalories] = useState(0);
    const [allergens, setAllergens] = useState('');

    // const [present, dismiss] = useIonLoading();

    const { data: food, isLoading, refetch } = useQuery({
        queryKey: ["food"],
        queryFn: () => fetchOneFoods(match.params.id),
    });  // rename data to food

    // useEffect(() => {
    //     if (isLoading) {
    //         present({
    //             message: 'Loading...',
    //             duration: 1000
    //         });
    //     } else {
    //         dismiss();
    //     }
    // }, [isLoading]);

    useEffect(() => {
        if (food) {
            setImage(food.image);
            setName(food.name);
            setDescription(food.description);
            setCalories(food.calories);
            setAllergens(food.allergens);
        }
    }, [food]);

    return (

        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonButton slot="start">
                        <IonBackButton default-href="/"></IonBackButton>
                    </IonButton>
                    <IonTitle>Eat</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent fullscreen>

                <div>
                    <h1>Food Details</h1>
                    <div>
                        <img src={`./assets/foodimage/${image}`} alt='food image' />
                    </div>
                    <div>
                        <h2>{name}</h2>
                        <p>{description}</p>
                        <p> {allergens}</p>
                        <p>Calories: {calories}</p>
                        <IonGrid>
                            <IonRow>
                                <IonCol><IonButton fill="solid" expand='block'>♡</IonButton></IonCol>
                                <IonCol><IonButton fill="solid" expand='block'>Add to Cart</IonButton></IonCol>
                            </IonRow>
                        </IonGrid>
                    </div>
                </div>

            </IonContent>
        </IonPage>

        // <div>
        //     <h1>Food Details</h1>
        //     <div>
        //         <img src={`./assets/foodimage/${props.image}`} alt='food image' />
        //     </div>
        //     <div>
        //         <h2>{props.name}</h2>
        //         <p>{props.description}</p>
        //         <p> {props.allergens}</p>
        //         <p>Calories: {props.calories}</p>
        //         <IonGrid>
        //             <IonRow>
        //                 <IonCol><IonButton fill="solid" expand='block'>♡</IonButton></IonCol>
        //                 <IonCol><IonButton fill="solid" expand='block'>Details</IonButton></IonCol>
        //                 <IonCol><IonButton fill="solid" expand='block'>Add to Cart</IonButton></IonCol>
        //             </IonRow>
        //         </IonGrid>
        //     </div>
        // </div>

    )
};

export default Fooddetails;
