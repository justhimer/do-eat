import { useQuery } from '@tanstack/react-query';
import AppStyle from '../../scss/App.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { gymAll, gymSome } from '../../api/gymAPIs';
import { SoloGym } from './SoloGym';
import { IonCard,IonCardHeader,IonCardTitle,IonCardSubtitle,IonCardContent, IonChip } from '@ionic/react';
import { GymChip, GymChipInterface } from './GymChip';
import userGymSlice, { SelectedGymInterface} from '../../redux/userGymSlice';
import { useEffect, useState } from 'react';

export function Prototype(){

    const selectedGyms = useSelector((state: RootState) => state.userGym);
    const selectedDistricts = useSelector(
      (state: RootState) => state.userDistrict
    );
    const [availableGyms, setAvailableGyms] = useState([]);
    const gyms = useQuery({
      queryKey: ["gymLocations"],
      queryFn: () => {
        if (selectedDistricts.districts.length > 0) {
          return gymSome(selectedDistricts.districts);
        } else {
          return gymAll();
        }
      },
    });
    useEffect(() => {
      if (gyms.isLoading) {
      } else {
        setAvailableGyms(gyms.data);
        console.log("test ", gyms.data);
      }
    }, [gyms]);
  
    return (
      <IonCard>
        <IonCardHeader>
          <IonCardTitle>Card Title</IonCardTitle>
          {selectedGyms.length > 0 &&
            selectedGyms.map((i: SelectedGymInterface, index) => (
              <GymChip key={index} id={i.id} name={i.name} />
            ))}
        </IonCardHeader>
        <IonCardContent>
          {gyms.isLoading ? (
            <p>Loading...</p>
          ) : gyms.error ? (
            <p>Error:</p>
          ) : (
            availableGyms.map((gym: any, index: any) => (
              <SoloGym
                key={index}
                id={gym.id}
                name={gym.name}
                district={gym.district.name}
                icon={""}
                details={gym.address}
              />
            ))
          )}
        </IonCardContent>
      </IonCard>
    );
    
}