import { domain } from "./domain";

const controllerName = "districts";

export interface FetchDistrictItemModel {
    id: number,
    name: string,
}

export const fetchDistrictItems = async (): Promise<FetchDistrictItemModel[]> => {

    console.log('fetching district...');

    const res = await fetch(`${domain}/${controllerName}`);

    if (res.ok) {
        const data = await res.json();
        return data;
    } else {
        throw new Error("Fetch districts fail");
    }

}