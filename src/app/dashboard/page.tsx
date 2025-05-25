import { api } from "@/service/api";
import { Order } from "./components/order";
import { getCookieServer } from "@/lib/cookieServer";
import { OrdersOpen } from "@/lib/ordensProps";

async function GetOrders(): Promise<OrdersOpen[] | []> {

    const token = await getCookieServer()


    try {
        const response = await api.get("/orders", {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })

        

        return response.data || []

    } catch (err) {
        console.log(err)
        return []
    }
}

export default async function Dashboard() {

    const OrdersOpen = await GetOrders()
    return (
        <>
            <Order orders={OrdersOpen} />
        </>
    )
}


