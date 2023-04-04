import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import { DistrictList } from '../components/districts/DistrictList';
import { SelectedGymsDisplay } from '../components/gyms/SelectedGymsDisplay';
import { DoButton } from '../components/gyms/DoButton';
import { useEffect, useState } from 'react';
import { CoursesDatePick } from '../components/gyms/CoursesDatePick';
import { CoursesPick } from '../components/gyms/CoursesPick';
import format from "date-fns/format";

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

export interface CoursesDatePickInterface{
  selectedDay:string;
  changeDay: (date:string)=>void
}

export interface CoursesPickInterface{
  selectedDay:string;
}

export interface CoursesItemInterface{
  calorise: number;
course_id: number;
course_type_id:number;
course_type_name:string;
credits:number;
duration:number;
franchise:string;
gym:string;
level:string;
name:string;
quota:number;
time:string;
trainer_icon:string;
trainer_name:string;
}

const DoTab: React.FC = () => {

  const [selectedDistrict, setSelectedDistrict] = useState([])
  const [mapView, setMapView] = useState(false)
  const [displayPage, setDisplayPage] = useState(<IonContent ><div>Rendering...</div></IonContent>)
  const [pageNumber, setPageNumber] = useState(1)
  const [singleDate, setSingleDate] = useState(format(new Date, "yyyy-MM-dd"))
  
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
        <CoursesDatePick selectedDay={singleDate} changeDay={setSingleDate}/>
        <CoursesPick selectedDay={singleDate}/>
        </>
      )
    } else if (pageNumber == 3) {
      setDisplayPage(
        <IonContent>
          <div>Page 3</div>
        </IonContent>
      )
    }
  }, [pageNumber, selectedDistrict, singleDate])

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
