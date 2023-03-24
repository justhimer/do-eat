const controllerName = "districts";

export interface FetchDistrictItemModel {
    id: number,
    name: string,
}

export const fetchDistrictItems = async (): Promise<FetchDistrictItemModel[]> => {

    console.log('fetching district...');

    const res = await fetch(`${process.env.BACKEND_SERVER}/${controllerName}`);

    if (res.ok) {
        const data = await res.json();
        return data;
    } else {
        throw new Error("Fetch districts fail");
    }

}