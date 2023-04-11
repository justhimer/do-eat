import { useQuery } from '@tanstack/react-query';
import AppStyle from '../../scss/App.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { gymAll, gymSome } from '../../api/gymAPIs';
import { SoloGym } from './SoloGym';
import { IonCard, IonCardHeader, IonCardTitle, IonCardSubtitle, IonCardContent, IonChip, useIonToast } from '@ionic/react';
import { GymChip, GymChipInterface } from './GymChip';
import { SelectedGymInterface } from '../../redux/userGymSlice';
import { SelectedGymDisplayInterface } from '../../pages/Do';
import { useEffect, useState } from 'react';

export function SelectedGymsDisplay(props: SelectedGymDisplayInterface) {


    const selectedGyms = useSelector((state: RootState) => state.userGym);
    const [availableGyms, setAvailableGyms] = useState([]);
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

    useEffect(() => {
        if (gyms.isLoading) {
        } else {
            setAvailableGyms(gyms.data);
        }
    }, [gyms.data]);


    return (
        <>
        {selectedGyms.length > 0 &&
                    selectedGyms.map((i: SelectedGymInterface, index) => (
                        <GymChip key={index} id={i.id} name={i.name} />
                    ))}
        <IonCard>
            <IonCardHeader>
                <IonCardTitle>Available Gyms</IonCardTitle>
                <IonCardSubtitle>Selected Locations: {selectedGyms.length+"/3"}</IonCardSubtitle>
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
        </>
    );

}