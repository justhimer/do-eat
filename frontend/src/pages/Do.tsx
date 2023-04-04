import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import { DistrictList } from '../components/districts/DistrictList';
import { SelectedGymsDisplay } from '../components/gyms/SelectedGymsDisplay';
import { DoButton } from '../components/gyms/DoButton';
import { useEffect, useState } from 'react';
import { CoursesPick } from '../components/gyms/CoursesPick';

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

export interface CoursesGetInterface{
  gyms: number[];
  time: string
}
export interface MarkedDatesInterface{
  date: Date;
  marked: boolean;
}

const DoTab: React.FC = () => {

  const [selectedDistrict, setSelectedDistrict] = useState([])
  const [mapView, setMapView] = useState(false)
  const [displayPage, setDisplayPage] = useState(<IonContent ><div>Rendering...</div></IonContent>)
  const [pageNumber, setPageNumber] = useState(1)

  const selectingDistrict = (e: any) => {
    if (JSON.stringify(selectedDistrict) !== JSON.stringify(e)) {
      setSelectedDistrict(e)
      return
    }
  }

  const upPage = () => {
    console.log("upPage")
    setPageNumber(pageNumber + 1)
  }

  const downPage = () => {
    console.log("downPage")
    setPageNumber(pageNumber - 1)
  }

  useEffect(() => {
    if (pageNumber == 1) {
      if (mapView) {

      } else {
        setDisplayPage(
          <>
              <DistrictList replaceDistrict={selectingDistrict} />
              <SelectedGymsDisplay selectedDistricts={selectedDistrict} />
          </>
        )
      }
    } else if (pageNumber == 2) {
      setDisplayPage(
        <>
        <CoursesPick/>
        </>
      )
    } else if (pageNumber == 3) {
      setDisplayPage(
        <IonContent>
          <div>Page 3</div>
        </IonContent>
      )
    }
  }, [pageNumber, selectedDistrict])

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Do</IonTitle>
        </IonToolbar>
      </IonHeader>
      {displayPage}
      <DoButton page={pageNumber} upPage={() => upPage()} downPage={() => downPage()} />
    </IonPage>
  );
};

export default DoTab;
