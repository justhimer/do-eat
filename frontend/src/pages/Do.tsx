import { IonButton, IonCol, IonContent, IonHeader, IonLabel, IonPage, IonRow, IonSegment, IonSegmentButton, IonTitle, IonToolbar, useIonViewWillLeave } from '@ionic/react';
import { DistrictList } from '../components/districts/DistrictList';
import { SelectedGymsDisplay } from '../components/do/SelectedGymsDisplay';
import { useHistory } from 'react-router';
import { useState } from 'react';
import { GoogleMapComp } from '../components/do/GoogleMapComp';


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

  const history = useHistory()


  return (
    <IonPage >
      <IonHeader >
        <IonToolbar >
          <IonTitle>Do "Where"</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonSegment value={mapView?"true":""} onIonChange={(e)=>{setMapView(Boolean(e.detail.value))}}>
          <IonSegmentButton value="">
            <IonLabel>List View</IonLabel>
          </IonSegmentButton>
          <IonSegmentButton value="true">
            <IonLabel>Map View</IonLabel>
          </IonSegmentButton>
        </IonSegment>
        <DistrictList replaceDistrict={selectingDistrict} />
        {mapView? <GoogleMapComp selectedDistricts={selectedDistrict}/> : <SelectedGymsDisplay selectedDistricts={selectedDistrict}/>}
        <IonRow>
          <IonCol>
            <IonButton onClick={(e) => {
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

