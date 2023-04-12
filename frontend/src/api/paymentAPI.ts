const controllerName = "payment"

export async function getPaymentURL(plan_id:number) {
    const res = await fetch(`${process.env.REACT_APP_API_SERVER}/${controllerName}/web/session/${plan_id}`, {
        method: "POST",
        headers: {
            "Content-Type": 'application/json',
            "Authorization": `Bearer ${localStorage.getItem('token')}`
        },
    });
    if (res.ok){
        const result = await res.json();
        window.location = result.url;
    }else{
        throw new Error
    }
}