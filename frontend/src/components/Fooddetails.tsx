// Fooddetails.tsx
import { IonGrid, IonRow, IonCol, IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonBackButton, IonIcon, IonToast, IonModal, IonList, IonItem, IonLabel, IonAvatar, IonImg, IonBadge } from '@ionic/react';
import React, { useEffect, useRef, useState } from 'react';
import { FoodItemProps } from './FoodItem';
import { IonButton } from '@ionic/react';
import Fooddetailsstyle from '../scss/Fooddetails.module.scss'
import { useHistory, useParams } from 'react-router-dom';
import { useMutation, useQuery } from '@tanstack/react-query';
import { fetchOneFoods } from '../api/foodAPIs';
import { cartOutline } from 'ionicons/icons';
import { fetchAddItem, fetchAllCartItems } from '../api/cartAPI';


export const Fooddetails = ({ match }: { match: any }) => {

    const history = useHistory();
    const param = useParams<{ id: string }>()
    const id = parseInt(param.id)
    const [image, setImage] = useState('');
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [calories, setCalories] = useState(0);
    const [allergens, setAllergens] = useState('');

    // const [isOpenMoal, setisOpenMoal] = useState(false);
    // const [present, dismiss] = useIonLoading();
    // const modal = useRef<HTMLIonModalElement>(null);
    // const [count, setCount] = useState(0);
    // const [amount, setAmount] = useState(0);

    const { data: food } = useQuery({
        queryKey: ["food"],
        queryFn: () => fetchOneFoods(match.params.id),
    });


    // const { mutate: readCart } = useMutation({
    //     mutationFn: async () => {
    //         const cartItems = await fetchAllCartItems()
    //         console.log('cartItems: ', cartItems);
    //         return cartItems;
    //     },
    //     // onSuccess(cartItems) {
    //     //     setCount(cartItems.quantity);
    //     // },
    // })

    useEffect(() => {
        if (food) {
            setImage(food.image);
            setName(food.name);
            setDescription(food.description);
            setCalories(food.calories);
            setAllergens(food.allergens);
        }
    }, [food]);

    // function dismiss() {
    //     modal.current?.dismiss();
    // }

    const { mutate: addToCart } = useMutation({
        mutationFn: () => fetchAddItem({
            food_id: id,
            quantity: 1
        }),
    })

    const onCartIcon = () => {
        history.push('/food-cart');
    }

    return (

        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonButton slot="start">
                        <IonBackButton default-href="/"></IonBackButton>
                    </IonButton>
                    <IonTitle>Eat</IonTitle>
                    {/* <IonBadge className={Fooddetailsstyle.count}>1</IonBadge> */}
                    <IonIcon className={Fooddetailsstyle.icon} icon={cartOutline} slot="end" onClick={onCartIcon}></IonIcon>
                    {/* <IonContent class="ion-padding">
                        <IonModal onIonModalWillDismiss={() => { setisOpenMoal(false) }} isOpen={isOpenMoal} id="example-modal" ref={modal} >
                            <div className="wrapper">
                                <h1>Just Eat</h1>
                                <IonList lines="none">
                                    <IonItem button={true} detail={false}>
                                        <IonIcon icon={`./assets/foodimage/${image}`}></IonIcon>
                                        <IonLabel>calories:{calories}</IonLabel>
                                        <div
                                            style={{
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'space-between',
                                            }}
                                        >
                                            <IonButton onClick={() => setCount(count - 1)}>-</IonButton>
                                            <p>{count}</p>
                                            <IonButton onClick={() => setCount(count + 1)}>+</IonButton>
                                        </div>
                                    </IonItem>
                                    <IonButton onClick={dismiss}>Close</IonButton>
                                    <IonButton onClick={dismiss}>Checkout</IonButton>
                                </IonList>
                            </div>
                        </IonModal>
                    </IonContent> */}
                </IonToolbar>
            </IonHeader>
            <IonContent fullscreen>

                <div>
                    {/* <h1>Food Details:</h1> */}
                    <div>
                        <img src={image} alt='food image' />
                    </div>
                    <div>
                        <h2>{name}</h2>
                        <p>{description}</p>
                        <p>Allergens:{allergens}</p>
                        <p>Calories: {calories}</p>
                        <IonGrid>
                            <IonRow>
                                <IonCol><IonButton id="Favourite-toast" fill="solid" expand='block'>♡</IonButton></IonCol>
                                <IonToast trigger="Favourite-toast" message="Added to Favourite" duration={1000}></IonToast>
                                <IonCol><IonButton id="Cart-toast" fill="solid" expand='block' onClick={() => addToCart()}>Add to Cart</IonButton></IonCol>
                                <IonToast trigger="Cart-toast" message="Added to Cart" duration={1000}></IonToast>
                            </IonRow>
                        </IonGrid>
                    </div>
                </div>

            </IonContent>
        </IonPage>



    )
};

export default Fooddetails;
