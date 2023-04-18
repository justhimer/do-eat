const controllerName = "food-types";

export async function fetchFoodTypes() {
    const res = await fetch(`${process.env.REACT_APP_API_SERVER}/${controllerName}`);
    if (res.ok) {
        const result = await res.json();
        return result;
    } else {
        throw new Error
    }
}