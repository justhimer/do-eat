import { useQuery } from "@tanstack/react-query";
import { DistrictItem } from "./DistrictItem";
import { FetchDistrictItemModel, fetchDistrictItems } from "../../api/districtAPIs";
import districtStyle from '../scss/DistrictButton.module.scss'
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { IonItem, IonList, IonSelect} from '@ionic/react';
import { replaceDistrictSelection } from "../../redux/userDistrictSlice";
import { Interface } from "readline";
import { DistrictListInterface } from "../../pages/Do";



export function DistrictList(props:DistrictListInterface) {
  
    // get districts from backend
    const { data: districts, isLoading, refetch } = useQuery({  // rename data to districts
        queryKey: ["districts"],
        queryFn: fetchDistrictItems,
    });

    return (
        <IonList>
      <IonItem>
        <IonSelect aria-label="Districts" label="Districts" placeholder="All districts" multiple={true} onIonChange={(e)=>{props.replaceDistrict(e.detail.value)}}>
          {
            districts && districts.map((district,index)=>{
                return <DistrictItem key={index} id={district.id} name={district.name}/>
            })
          }
        </IonSelect>
      </IonItem>
    </IonList>

    );
}