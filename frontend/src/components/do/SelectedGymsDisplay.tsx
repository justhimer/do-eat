// CSS Styling
import GymCourseStyle from '../../scss/GymCourses.module.scss';


// Custom Components
import { SoloGym } from './SoloGym';
import { GymChip} from './GymChip';


// Ionic Components
import { IonCard, IonCardHeader, IonCardTitle, IonCardSubtitle, IonCardContent} from '@ionic/react';

// State Management
import { useQuery } from '@tanstack/react-query';
import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';

// Interfaces
import { RootState } from '../../redux/store';
import { SelectedGymInterface } from '../../redux/userGymSlice';
import { SelectedGymDisplayInterface } from '../../pages/Do';

// API
import { gymAll, gymSome } from '../../api/gymAPIs';

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
        <IonCard className={GymCourseStyle.selectedGymsDisplay_card}>
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
                            selected={selectedGyms.some(i=>i.id===gym.id)}
                        />
                    ))
                )}
            </IonCardContent>
        </IonCard>
        </>
    );

}