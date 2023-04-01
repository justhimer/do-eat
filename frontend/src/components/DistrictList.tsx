import { useQuery } from "@tanstack/react-query";
import { DistrictItem } from "./DistrictItem";
import { FetchDistrictItemModel, fetchDistrictItems } from "../api/districtAPIs";
import AppStyle from '../scss/App.module.scss'

export function DistrictList() {

    // get districts from backend
    const { data: districts, isLoading, refetch } = useQuery({  // rename data to districts
        queryKey: ["districts"],
        queryFn: fetchDistrictItems,
    });

    return (
        <div>
            <div className={AppStyle.title}>District</div>
            {
                districts && districts.map((district: FetchDistrictItemModel, index: number) => (
                    <DistrictItem
                        key={index}
                        id={district.id}
                        name={district.name} />
                ))
            }
        </div>

    );
}