const controllerName = "districts";

export interface FetchDistrictItemModel {
    id: number,
    name: string,
}

export const fetchDistrictItems = async (): Promise<FetchDistrictItemModel[]> => {

    const res = await fetch(`${process.env.REACT_APP_API_SERVER}/${controllerName}`);

    if (res.ok) {
        const data = await res.json();
        return data;
    } else {
        throw new Error("Fetch districts fail");
    }

}