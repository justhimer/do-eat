import { IonButton, IonContent, IonHeader, IonIcon, IonImg, IonPage, IonTitle, IonToolbar, useIonViewDidEnter } from '@ionic/react';
import { Logo } from '../components/Logo';
// import { homeApp } from '../homePageDetails';
import AppStyle from '../scss/App.module.scss';
import { InfiniteLooper } from '../components/InfiniteLooper';
import { useSpring, animated } from '@react-spring/web'
import '../scss/Swiper.scss'
import "swiper/swiper-bundle.min.css";
import "swiper/swiper.min.css";

import SwiperCore, { Autoplay, EffectCoverflow, Pagination } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import { useHistory } from 'react-router';
import { barbell, batteryCharging, bicycle, fastFood, logoIonic } from 'ionicons/icons';
import { useState } from 'react';
SwiperCore.use([EffectCoverflow,Autoplay]);

const slide_img = [
  {img:"https://img.freepik.com/premium-photo/happy-woman-eat-healthy-trains-gym_207634-7200.jpg", text:"Nutritious", color:"#e74c3c"},
  {img:"https://img.freepik.com/free-photo/full-shot-man-sitting-yoga-mat_23-2149249473.jpg", text:"Consult", color:"#e74c3c"},
  {img:"https://img.freepik.com/free-photo/healthy-raw-food-dumbbell-wooden-surface_23-2147882036.jpg", text:"Plan",color:"#e74c3c"},
  {img:"https://img.freepik.com/free-photo/young-asian-woman-with-water-bottle-listening-music-podcast-headphones-during-fitness-home_1258-83729.jpg", text:"Convenient", color:"#e74c3c"},
  {img:"https://img.freepik.com/free-photo/top-view-showing-hands-eating-healthy-lunch-with-bulgur-meat-fresh-vegetables-fruit-wooden-table-fitness-healthy-lifestyle-concept-lunchbox-top-view_2829-6077.jpg", text:"Anywhere",color:"#e74c3c"},
  {img:"https://img.freepik.com/free-photo/full-shot-woman-with-laptop-home_23-2149249504.jpg", text:"Do Eat",color:"#e74c3c"},

];


const HomeTab: React.FC = () => {

 
  const [halfWindow, setHalfWindow] = useState(window.innerWidth)

  const history = useHistory()
  const [springs, api] = useSpring(() => ({
    from: { y: 1000 },
  }))

  const handleClick = () => {
    api.start({
      from: {
        y: 1000,
      },
      to: {
        y: 0,
      },
    })
  }

  useIonViewDidEnter(() => {
    setHalfWindow(window.innerWidth)
    handleClick()
  })

  const handleResize = ()=>{
    console.log('resizing...');
    
    setHalfWindow(window.innerWidth)
  }


  window.addEventListener('resize',handleResize)

  console.log("host: ", process.env.REACT_APP_API_SERVER)
  return (
    <IonPage >
      <IonHeader >
        <IonToolbar>
          <IonTitle>Home</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen className={" ion-padding"}>
        <Logo />
        <InfiniteLooper direction="left" speed={10}>
          <div className="contentBlock contentBlock-one">
            <IonIcon icon={barbell}></IonIcon>
          </div>
          <div className="contentBlock contentBlock-two">
            <IonIcon icon={batteryCharging}></IonIcon>
          </div>
          <div className="contentBlock contentBlock-one">
            <IonIcon icon={bicycle}></IonIcon>
          </div>
          <div className="contentBlock contentBlock-two special">
            <IonIcon icon={fastFood}></IonIcon>
            </div>
          </InfiniteLooper>
        <Swiper
          effect={"coverflow"}
          autoplay={{delay:5000,
          disableOnInteraction:false}}
          grabCursor={true}
          centeredSlides={true}
          slidesPerView={"auto"}
          coverflowEffect={{
            rotate: 50,
            stretch: 0,
            depth: 100,
            modifier: 1,
            slideShadows: false,
          }}
          className={AppStyle.swiper + " swiper-button-hidden"}
        >
          {slide_img.map((img, i) => {
            return (
              <SwiperSlide key={i} >
                <img src={img.img} alt="" />
                <p 
                className={halfWindow>808? AppStyle.imgTextWide : AppStyle.imgText} 
                style={halfWindow>808? {color:img.color, left:halfWindow/4} : {color:img.color}}>{img.text}</p>
              </SwiperSlide>
            );
          })}
        </Swiper>

        
          
          <animated.div
            style={{
              ...springs,
            }}
          >
            <IonButton onClick={()=>{history.push('/user-tab')}}>Start Your Journey Now!</IonButton>
          </animated.div>

          <InfiniteLooper direction="right" speed={10}>
          <div className="contentBlock contentBlock-two">
            <IonIcon icon={barbell}></IonIcon>
          </div>
          <div className="contentBlock contentBlock-one">
            <IonIcon icon={batteryCharging}></IonIcon>
          </div>
          <div className="contentBlock contentBlock-two">
            <IonIcon icon={bicycle}></IonIcon>
          </div>
          <div className="contentBlock contentBlock-one special">
            <IonIcon icon={fastFood}></IonIcon>
            </div>
          </InfiniteLooper>

      </IonContent >
    </IonPage >
  );
};

export default HomeTab;

