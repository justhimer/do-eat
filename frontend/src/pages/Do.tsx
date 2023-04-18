// Custom Component
import { DistrictList } from '../components/districts/DistrictList';
import { SelectedGymsDisplay } from '../components/do/SelectedGymsDisplay';
import { GoogleMapComp } from '../components/do/GoogleMapComp';
import GymCourseStyle from '../scss/GymCourses.module.scss'

// Ionic Component
import { IonButton, IonCol, IonContent, IonHeader, IonIcon, IonLabel, IonPage, IonRow, IonSegment, IonSegmentButton, IonTitle, IonToolbar, useIonViewWillLeave } from '@ionic/react';

// State Management
import { useState } from 'react';

// Routing
import { useHistory } from 'react-router';
import { listOutline, mapOutline } from 'ionicons/icons';

// Interfaces
export interface DistrictListInterface {
  replaceDistrict: (districts: number[]) => void;
}
export interface SelectedGymDisplayInterface {
  selectedDistricts: number[];
}
export interface DoButtonInterface {
  page: number;
  upPage: () => void;
  downPage: () => void
}
export interface CoursesGetInterface {
  gyms: number[];
  time: string
}
export interface MarkedDatesInterface {
  date: Date;
  marked: boolean;
}


export function DoTab() {

  const history = useHistory()
  
  const [selectedDistrict, setSelectedDistrict] = useState([])
  const [mapView, setMapView] = useState(false)

  const selectingDistrict = (e: any) => {
    if (JSON.stringify(selectedDistrict) !== JSON.stringify(e)) {
      setSelectedDistrict(e)
      return
    }
  }

  useIonViewWillLeave(() => {
    setMapView(false)
  })


  return (
    <IonPage >
      <IonHeader >
        <IonToolbar >
          <IonTitle>Do Where</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen className={GymCourseStyle.doWhere_segment + ' ion-padding'}>
        <IonSegment value={mapView?"true":""} onIonChange={(e)=>{setMapView(Boolean(e.detail.value))}}>
          <IonSegmentButton value="">
            <IonLabel>List View</IonLabel>
            <IonIcon icon={listOutline}></IonIcon>
          </IonSegmentButton>
          <IonSegmentButton value="true">
            <IonLabel>Map View</IonLabel>
            <IonIcon icon={mapOutline}></IonIcon>
          </IonSegmentButton>
        </IonSegment>
        <DistrictList replaceDistrict={selectingDistrict} />
        {mapView? <GoogleMapComp selectedDistricts={selectedDistrict}/> : <SelectedGymsDisplay selectedDistricts={selectedDistrict}/>}
        <IonRow>
          <IonCol>
            <IonButton expand='block' onClick={(e) => {
              e.preventDefault()
              history.push('/do-what')
            }}>Next</IonButton>
          </IonCol>
        </IonRow>
      </IonContent>
    </IonPage >

  );
};

export default DoTab;

