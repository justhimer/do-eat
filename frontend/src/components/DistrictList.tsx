import { useQuery } from "@tanstack/react-query";
import { DistrictItem } from "./DistrictItem";
import { FetchDistrictItemModel, fetchDistrictItems } from "../api/districtAPIs";
import AppStyle from '../scss/App.module.scss'
import districtStyle from '../scss/DistrictButton.module.scss'
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { IonButton, IonPopover, IonContent , IonCheckbox} from '@ionic/react';

export function DistrictList() {


    const test = useSelector((state: RootState) => state.userDistrict)

    // get districts from backend
    const { data: districts, isLoading, refetch } = useQuery({  // rename data to districts
        queryKey: ["districts"],
        queryFn: fetchDistrictItems,
    });

    return (
        <div>
            <IonButton id="district-popup-trigger">Districts</IonButton>
            <IonPopover className={districtStyle.districtContainer} trigger="district-popup-trigger" triggerAction="click" side="bottom" alignment="start">
                <IonContent class="ion-padding">
                {
                    districts && districts.map((district: FetchDistrictItemModel, index: number) => (
                        <DistrictItem
                            key={index}
                            checked={false}
                            id={district.id}
                            name={district.name} />
                    ))
                }
                </IonContent>
            </IonPopover>
        </div>

    );
}