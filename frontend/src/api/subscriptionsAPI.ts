const controllerName = 'subscriptions'

export interface SubscriptionPlan{
    id: number;
    name: string;
    unlimited: boolean;
    credits: number;
    fee: number;
    duration: number;
}


export async function getSubscriptionPlans(){
    const res = await fetch(`${process.env.REACT_APP_API_SERVER}/${controllerName}/all`,{
        method: 'GET',
        headers:{
            "Content-Type": "application/json; charset=utf-8"
        }
    })
    if (res.ok){
        const result:SubscriptionPlan[] = await res.json()
        return result
    }else{
        throw new Error('error')
    }
}