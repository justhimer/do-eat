// Fooddetails.tsx
import { IonGrid, IonRow, IonCol, IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonBackButton, IonIcon, IonToast, IonModal, IonList, IonItem, IonLabel, IonAvatar, IonImg, IonBadge, IonCard, IonCardContent, IonCardHeader, IonCardTitle, IonChip, useIonToast } from '@ionic/react';
import React, { useEffect, useRef, useState } from 'react';
import { FoodItemProps } from './FoodItem';
import { IonButton } from '@ionic/react';
import Fooddetailsstyle from '../../scss/Fooddetails.module.scss'
import NotificationStyle from "../../scss/Notification.module.scss";
import { useHistory, useParams } from 'react-router-dom';
import { useMutation, useQuery } from '@tanstack/react-query';
import { fetchOneFoods } from '../../api/foodAPIs';
import { cartOutline } from 'ionicons/icons';
import { fetchAddItem, fetchAllCartItems } from '../../api/cartAPI';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';



export const Fooddetails = ({ match }: { match: any }) => {

    const history = useHistory();
    const param = useParams<{ id: string }>()
    const id = parseInt(param.id)
    const [image, setImage] = useState('');
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [calories, setCalories] = useState(0);
    const [allergens, setAllergens] = useState('');

    const [present] = useIonToast();

    const isUserLoggedIn = useSelector((state: RootState) => state.user.isAuthenticated);

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

    function onAddtoCart() {
        if (!isUserLoggedIn) {
            present({
                message: "Please Login",
                duration: 1000,
                position: "top",
                cssClass: NotificationStyle.ionicToast,
            });
            return;
        }
        addToCart.mutate();
    }

    const addToCart = useMutation({
        mutationFn: () => fetchAddItem({
            food_id: id,
            quantity: 1
        }),
        onSuccess: () => {
            present({
                message: "Added to Cart",
                duration: 1000,
                position: "top",
                cssClass: NotificationStyle.ionicToast,
            });
        },
        onError: () => {
            present({
                message: "Already Added to Cart",
                duration: 1000,
                position: "top",
                cssClass: NotificationStyle.ionicToast,
            });
        },
    })

    const onCartIcon = () => {
        if (!isUserLoggedIn) {
            present({
                message: "Please Login",
                duration: 1000,
                position: "top",
                cssClass: NotificationStyle.ionicToast,
            });
            return;
        }
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
                    <IonIcon className={Fooddetailsstyle.icon} icon={cartOutline} slot="end" onClick={onCartIcon}></IonIcon>
 
                </IonToolbar>
            </IonHeader>
            <IonContent fullscreen>

                <div className={Fooddetailsstyle.details_container}>
                    <div>
                        <img src={`./assets/foodimage/${food?.image}`} alt='food image' className={Fooddetailsstyle.image}/>
                    </div>
                    <div>
                        <h2 className={Fooddetailsstyle.center}>{name}</h2>
                        <p className={Fooddetailsstyle.padding}>{description}</p>
                        <IonChip outline={true} color="danger"><IonLabel>Calories: {calories}</IonLabel></IonChip>
                        {allergens && allergens.length > 0 && <IonChip outline={true} color="danger"><IonLabel>Allergens: {allergens}</IonLabel></IonChip>}
                    </div>
                    <IonGrid>
                        <IonRow>
                            {/* <IonCol><IonButton id="Favourite-toast" fill="solid" expand='block'>♡</IonButton></IonCol> */}
                            {/* <IonToast trigger="Favourite-toast" message="Added to Favourite" duration={1000}></IonToast> */}
                            <IonCol><IonButton id="Cart-toast" fill="solid" expand='block' onClick={onAddtoCart}>Add to Cart</IonButton></IonCol>
                            {/* <IonToast trigger="Cart-toast" message="Added to Cart" duration={1000}></IonToast> */}
                        </IonRow>
                    </IonGrid>
                </div>


            </IonContent>
        </IonPage>

    )
};

export default Fooddetails;
