import { useQuery } from "@tanstack/react-query";
import { DistrictItem } from "./DistrictItem";
import { FetchDistrictItemModel, fetchDistrictItems } from "../../api/districtAPIs";
import districtStyle from '../scss/DistrictButton.module.scss'
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { IonItem, IonList, IonSelect} from '@ionic/react';
import { replaceDistrictSelection } from "../../redux/userDistrictSlice";

export function DistrictList() {

    const dispatch = useDispatch()
    const selectedDistrict = useSelector((state: RootState) => state.userDistrict)
    
    // get districts from backend
    const { data: districts, isLoading, refetch } = useQuery({  // rename data to districts
        queryKey: ["districts"],
        queryFn: fetchDistrictItems,
    });

    //control district list
    const valuesOnChange = (e:any)=>{
        if(JSON.stringify(selectedDistrict.districts)!==JSON.stringify(e.detail.value)){
            (dispatch(replaceDistrictSelection(e.detail.value)))
            return
        }
    }

    return (
        <IonList>
      <IonItem>
        <IonSelect aria-label="Districts" label="Districts" placeholder="All districts" multiple={true} onIonChange={valuesOnChange}>
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