import { GoogleMap } from '@capacitor/google-maps';
import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { SelectedGymInterface, toggleGymSelection } from '../../redux/userGymSlice';
import { GymChip } from './GymChip';
import { useQuery } from '@tanstack/react-query';
import { Marker } from '@capacitor/google-maps';
import { SelectedGymDisplayInterface } from '../../pages/Do';
import { gymAll, gymSome } from '../../api/gymAPIs';
import { title } from 'process';
import { IonButton, IonContent, IonPopover, useIonToast } from '@ionic/react';
import NotificationStyle from "../../scss/Notification.module.scss"


export function GoogleMapComp(props: SelectedGymDisplayInterface) {

  const dispatch = useDispatch()
  const selectedGyms = useSelector((state: RootState) => state.userGym);
  const mapRef = useRef<HTMLElement>();
  let newMap: GoogleMap;
  const apiKey = "AIzaSyAy_SQpiVPr38hMLZLWRqS6GHTaWtrdbm0"

  const [gymPopup,setGymPopup] = useState<any>(null)
  const [availableGyms, setAvailableGyms] = useState([]);
  const [gymMarkers, SetGymMarkers] = useState<Marker[]>([])
  const gyms = useQuery({
      queryKey: ["gymLocations",props.selectedDistricts],
      queryFn: () => {
          if (props.selectedDistricts.length > 0) {
              return gymSome(props.selectedDistricts);
          } else {
              return gymAll();
          }
      },
  });
  const [present] = useIonToast();
    const presentToast = (position: 'top' | 'middle' | 'bottom') => {
        present({
            message: "Error: You may only choose up to 3 gyms at a time",
            duration: 1500,
            position: position,
            cssClass: NotificationStyle.ionicToast,
        });
    };
    const clickGym = ()=>{
      if (!selectedGyms.some(e=>e.name === gymPopup.name) && selectedGyms.length >= 3){
        presentToast("top")
      }else{
        dispatch((toggleGymSelection({id:gymPopup.id, name:gymPopup.name})))
      }
    }

  useEffect(() => {
    if(gyms.data){
      let markerData: Marker[] = [];
      for (let i =0 ; i<gyms.data.length ; i++ ){
        markerData.push({
          coordinate: gyms.data[i].google_position,
          title:gyms.data[i].name,
        })
      }
        SetGymMarkers(markerData)
        setAvailableGyms(gyms.data);
    }

  }, [gyms.data]);

  useEffect(()=>{
    createMap()
  },[gymMarkers])

 
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
    const markers = await newMap.addMarkers(gymMarkers)

    await newMap.setOnMarkerClickListener(async (marker)=>{
    const index = markers.indexOf(marker.markerId)
    setGymPopup(availableGyms[index])
    onPopover()
    })
   
  }
  const onPopover = ()=>{
    setPopoverOpen(!popoverOpen)
  }
  const [popoverOpen, setPopoverOpen] = useState(false);

  return (
    <>
    {selectedGyms.length > 0 &&
      selectedGyms.map((i: SelectedGymInterface, index) => (
          <GymChip key={index} id={i.id} name={i.name} />
      ))}
    <div className="component-wrapper">
      
      <capacitor-google-map ref={mapRef} style={{
        display: 'inline-block',
        width: 275,
        height: 400
      }}></capacitor-google-map>

    </div>
    {gymPopup && <IonPopover isOpen={popoverOpen} onDidDismiss={onPopover} dismissOnSelect={true}>
        <IonContent class="ion-padding">
        <h1>{gymPopup.name}</h1>
        <IonButton onClick={clickGym}>Toggle</IonButton>        
        </IonContent>
      </IonPopover>}
    </>
  )
}