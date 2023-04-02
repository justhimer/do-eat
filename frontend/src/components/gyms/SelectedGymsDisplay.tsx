import { useQuery } from '@tanstack/react-query';
import AppStyle from '../../scss/App.module.scss';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { gymAll, gymSome } from '../../api/gymAPIs';
import { SoloGym } from './SoloGym';
import { IonCard,IonCardHeader,IonCardTitle,IonCardSubtitle,IonCardContent, IonChip } from '@ionic/react';

export function SelectedGymsDisplay(){

    const selectedDistricts = useSelector((state:RootState)=>state.userDistrict)
    const gyms = useQuery({
        queryKey:['gymLocations'],
        queryFn: ()=>{
            if(selectedDistricts.districts.length>0){
                return gymSome(selectedDistricts.districts)
            }else{
                return gymAll()
            }
        }
    })
    if (gyms.isLoading){
        return <div>loading</div>
    }else{
        return (
            <IonCard>
            <IonCardHeader>
              <IonCardTitle>Card Title</IonCardTitle>
              <IonChip>test</IonChip>
              <IonChip>test2</IonChip>
            </IonCardHeader>
            <IonCardContent>
                {
                    gyms.data && gyms.data.map((gym:any, index:any)=><SoloGym key={index} id={gym.id} name={gym.name} district={gym.district.name} icon={""} details={gym.address}/>)
                }
            </IonCardContent>
            </IonCard>
            
            
            )
    }
    
}