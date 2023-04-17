import { IonButton, IonContent, IonHeader, IonIcon, IonPage, IonTitle, IonToolbar, useIonViewDidEnter } from '@ionic/react';
import { Logo } from '../components/Logo';
import AppStyle from '../scss/App.module.scss';
import { InfiniteLooper } from '../components/InfiniteLooper';
import { useSpring, animated } from '@react-spring/web'
import '../scss/Swiper.scss'
import "swiper/swiper-bundle.min.css";
import "swiper/swiper.min.css";

import SwiperCore, { Autoplay, EffectCoverflow, Navigation, Pagination } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import { useHistory } from 'react-router';
import { barbell, batteryCharging, bicycle, fastFood, logoIonic } from 'ionicons/icons';
SwiperCore.use([EffectCoverflow, Pagination]);

const slide_img = [
  "https://swiperjs.com/demos/images/nature-1.jpg",
  "https://swiperjs.com/demos/images/nature-2.jpg",
  "https://swiperjs.com/demos/images/nature-3.jpg",
  "https://swiperjs.com/demos/images/nature-4.jpg",
  "https://swiperjs.com/demos/images/nature-5.jpg",
  "https://swiperjs.com/demos/images/nature-6.jpg",
  "https://swiperjs.com/demos/images/nature-7.jpg",
  "https://swiperjs.com/demos/images/nature-8.jpg",
  "https://swiperjs.com/demos/images/nature-9.jpg",
];


const HomeTab: React.FC = () => {

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

  useIonViewDidEnter(()=>{
    handleClick()
  })

  return (
    <IonPage >
      <IonHeader >
        <IonToolbar>
          <IonTitle>Home</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen className={AppStyle.hero}>
        <Logo />
        <Swiper
        effect={"coverflow"}
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
        pagination={true}
        className="mySwiper"
      >
        {slide_img.map((img, i) => {
          return (
            <SwiperSlide key={i}>
              <img src={img} alt="" />
            </SwiperSlide>
          );
        })}
      </Swiper>

          <InfiniteLooper direction="left" speed={10}>
            <div className="contentBlock contentBlock--two">
            <IonIcon icon={barbell}></IonIcon>
            </div>
            <div className="contentBlock contentBlock--two">
            <IonIcon icon={batteryCharging}></IonIcon>
            </div>
            <div className="contentBlock contentBlock--two">
            <IonIcon icon={bicycle}></IonIcon>
            </div>
            <div className="contentBlock contentBlock--two">
            <IonIcon icon={fastFood}></IonIcon>
            </div>
          </InfiniteLooper>
          
          <animated.div
            
            style={{
              ...springs,
            }}
          >
            <IonButton onClick={()=>{history.push('/user-tab')}}>Start Your Journey Now!</IonButton>
          </animated.div>

      </IonContent>
    </IonPage >
  );
};

export default HomeTab;

