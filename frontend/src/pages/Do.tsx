import { IonButton, IonCol, IonContent, IonHeader,IonPage, IonRow, IonTitle, IonToolbar, useIonViewWillLeave } from '@ionic/react';
import { DistrictList } from '../components/districts/DistrictList';
import { SelectedGymsDisplay } from '../components/gyms/SelectedGymsDisplay';
import { useHistory } from 'react-router';
import { useState } from 'react';


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



const DoTab: React.FC = () => {

  const [selectedDistrict, setSelectedDistrict] = useState([])
  const [mapView, setMapView] = useState(false)



  const selectingDistrict = (e: any) => {
    if (JSON.stringify(selectedDistrict) !== JSON.stringify(e)) {
      setSelectedDistrict(e)
      return
    }
  }

  useIonViewWillLeave(() => {
    console.log("left")
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
        <DistrictList replaceDistrict={selectingDistrict} />
        <SelectedGymsDisplay selectedDistricts={selectedDistrict} />
        <IonRow>
          <IonCol>
            <IonButton onClick={(e) => {
              e.preventDefault()
              history.push('/do-tab/courses')
            }}>Next</IonButton>
          </IonCol>
        </IonRow>
      </IonContent>
    </IonPage >

  );
};

export default DoTab;

