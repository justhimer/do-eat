// Gooogle Map API
import { GoogleMap } from '@capacitor/google-maps';
import { Marker } from '@capacitor/google-maps';

// State Management
import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { SelectedGymInterface, toggleGymSelection } from '../../redux/userGymSlice';

// Custom Components
import { GymChip } from './GymChip';

// Ionic Components
import { IonButton, IonCard, IonContent, IonPopover, IonRefresher, IonRefresherContent, RefresherEventDetail, useIonToast, useIonViewWillEnter } from '@ionic/react';

// API Data
import { useQuery } from '@tanstack/react-query';
import { gymAll, gymSome } from '../../api/gymAPIs';


// Interfaces
import { SelectedGymDisplayInterface } from '../../pages/Do';

// CSS
import NotificationStyle from "../../scss/Notification.module.scss"
import GymCourseStyle from "../../scss/GymCourses.module.scss"

export function GoogleMapComp(props: SelectedGymDisplayInterface) {

  const [present] = useIonToast();
  const dispatch = useDispatch()
  const selectedGyms = useSelector((state: RootState) => state.userGym);

  const [popoverOpen, setPopoverOpen] = useState(false);
  const [gymPopup, setGymPopup] = useState<any>(null)
  const [availableGyms, setAvailableGyms] = useState([]);
  const [gymMarkers, SetGymMarkers] = useState<Marker[]>([])

  const onPopover = () => {
    setPopoverOpen(!popoverOpen)
  }

  const presentToast = (position: 'top' | 'middle' | 'bottom') => {
    present({
      message: "Error: You may only choose up to 3 gyms at a time",
      duration: 1500,
      position: position,
      cssClass: NotificationStyle.ionicToast,
    });
  };



  const gyms = useQuery({
    queryKey: ["gymLocations", props.selectedDistricts],
    queryFn: async () => {
      if (props.selectedDistricts.length > 0) {
        return await gymSome(props.selectedDistricts);
      } else {
        return await gymAll();
      }
    },
  });


  const clickGym = () => {
    if (!selectedGyms.some(e => e.name === gymPopup.name) && selectedGyms.length >= 3) {
      presentToast("top")
    } else {
      dispatch((toggleGymSelection({ id: gymPopup.id, name: gymPopup.name })))
    }
  }



  const apiKey = String(process.env.REACT_APP_GOOGLE_MAP_API_KEY)
  let newMap: GoogleMap;
  const mapRef = useRef<HTMLElement>();

  useEffect(() => {
    if (gyms.data) {
      let markerData: Marker[] = [];
      for (let i = 0; i < gyms.data.length; i++) {
        markerData.push({
          coordinate: gyms.data[i].google_position,
          title: gyms.data[i].name,
        })
      }
      SetGymMarkers(markerData)
      setAvailableGyms(gyms.data);
    }

  }, [gyms.data]);


  useEffect(() => {
    createMap()
  }, [gymMarkers])

  async function createMap() {
    if (!mapRef.current) return;

    newMap = await GoogleMap.create({
      id: 'gym-location-map',
      element: mapRef.current,
      apiKey: apiKey,
      forceCreate: true,
      config: {
        center: {
          lat: 22.29023223431154,
          lng: 114.17045008119564
        },
        zoom: 12
      }
    })
    if (gymMarkers.length > 0) {
      const markers = await newMap.addMarkers(gymMarkers)

      await newMap.setOnMarkerClickListener(async (marker) => {
        const index = markers.indexOf(marker.markerId)
        setGymPopup(availableGyms[index])
        onPopover()
      })
    }


  }

  // useIonViewWillEnter(async () => {
  //   await gyms.refetch();
  //   await createMap()
  // })

  function handleRefresh(event: CustomEvent<RefresherEventDetail>) {
    gyms.refetch().then(() => {
      createMap().then(() => {
            event.detail.complete();
        })
    })
}


  return (
    <>
      <IonRefresher slot="fixed" onIonRefresh={handleRefresh}>
        <IonRefresherContent></IonRefresherContent>
      </IonRefresher>

      {selectedGyms.length > 0 &&
        selectedGyms.map((i: SelectedGymInterface, index) => (
          <GymChip key={index} id={i.id} name={i.name} />
        ))}
      <div className={GymCourseStyle.googleMapBoundingClient + " component-wrapper"}>

        <capacitor-google-map ref={mapRef} ></capacitor-google-map>

      </div>
      {gymPopup && <IonPopover isOpen={popoverOpen} onDidDismiss={onPopover} dismissOnSelect={true} className={GymCourseStyle.googleMapPopup}>
        <IonContent class="ion-padding">
          <h5>{gymPopup.name}</h5>
          <IonButton onClick={clickGym} >Toggle</IonButton>

        </IonContent>

      </IonPopover>}
    </>
  )
}