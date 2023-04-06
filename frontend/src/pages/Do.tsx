import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, useIonViewWillLeave } from '@ionic/react';
import { DistrictList } from '../components/districts/DistrictList';
import { SelectedGymsDisplay } from '../components/gyms/SelectedGymsDisplay';
import { DoButton } from '../components/gyms/DoButton';
import { useEffect, useState } from 'react';
import { CoursesDatePick } from '../components/gyms/CoursesDatePick';
import { CoursesPick } from '../components/gyms/CoursesPick';
import format from "date-fns/format";
import { useDispatch } from 'react-redux';
import { refreshGymSelection } from '../redux/userGymSlice';
import { replaceDateSelection } from '../redux/userDateSlice';
import { CourseDetail } from '../components/gyms/CourseDetail';
import { ToastContainer } from 'react-toastify';

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

export interface CoursesInterface {
  this_id: number;
  filled: number;
  calorise: number;
  course_id: number;
  course_type_id: number;
  course_type_name: string;
  credits: number;
  duration: number;
  franchise: string;
  gym: string;
  level: string;
  name: string;
  quota: number;
  time: string;
  trainer_icon: string;
  trainer_name: string;
}

const DoTab: React.FC = () => {

  const [selectedDistrict, setSelectedDistrict] = useState([])
  const [mapView, setMapView] = useState(false)
  const [displayPage, setDisplayPage] = useState(<IonContent ><div>Rendering...</div></IonContent>)
  const [pageNumber, setPageNumber] = useState(1)
  const [coursePicked, setCoursePicked] = useState<CoursesInterface | null>(null)
  const dispatch = useDispatch()

  const getPickedCourse = (course: CoursesInterface) => {
    setCoursePicked(course)
    console.log(course)
    upPage()
  }

  const selectingDistrict = (e: any) => {
    if (JSON.stringify(selectedDistrict) !== JSON.stringify(e)) {
      setSelectedDistrict(e)
      return
    }
  }

  const upPage = () => {
    setSelectedDistrict([])
    setPageNumber(pageNumber + 1)
  }

  const downPage = () => {
    setPageNumber(pageNumber - 1)
  }

  useIonViewWillLeave(() => {
    setPageNumber(1)
    dispatch(refreshGymSelection())
    setSelectedDistrict([])
    dispatch(replaceDateSelection(format(new Date, "yyyy-MM-dd")))
  })

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
          <ToastContainer
            position="top-right"
            autoClose={2000}
            hideProgressBar
            newestOnTop
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="colored"
          />
          <CoursesDatePick />
          <CoursesPick function={getPickedCourse} />
        </>
      )
    } else if (pageNumber == 3) {
      if (coursePicked) {
        setDisplayPage(
          <>
            <CourseDetail  {...coursePicked} />
          </>
        )
      }

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
