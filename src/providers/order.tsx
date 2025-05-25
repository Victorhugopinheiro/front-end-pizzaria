"use client"

import { getCookieClient } from "@/lib/cookieClient";
import { api } from "@/service/api";
import { useRouter } from "next/navigation";
import { ReactNode, createContext, useState } from "react";


interface ActionsOrder {
    closeModal: () => void,
    openModal: (order_id: string) => Promise<void>,
    isOpen: boolean,
    detailOrder: OrderProps[],
    finishPedido: (order_id: string) => Promise<void>,
    totalPedido: (order: OrderProps[]) => number
}

interface OrderProps {

    id: string,
    amount: 6,
    order_id: string,
    product_id: string,
    product: {
        id: string,
        name: string,
        price: string,
        description: string,
        banner: string,

        category_id: string
    },
    order: {
        id: string,
        table: 11,
        status: boolean,
        draft: boolean,
        name: string,
    }

}


export const OrderContext = createContext({} as ActionsOrder)


export function OrderProvider({ children }: { children: ReactNode }) {

    const router = useRouter()

    const [isOpen, setIsOpen] = useState(false)
    const [detailOrder, setDetailOrder] = useState<OrderProps[] | []>([])

    function closeModal() {
        setIsOpen(false)
    }

    async function openModal(order_id: string) {


        try {
            const token = await getCookieClient()
            const response = await api.get("/order/detail",{
                headers:{
                    Authorization:`Bearer ${token}`
                },
                params:{order_id: order_id}
            })

            setDetailOrder(response.data)

            setIsOpen(true)
        }catch(err){
            console.log(err)
        }



    }


    async function finishPedido(order_id: string) {

        const token = await getCookieClient()

        const data = {
            order_id: order_id
        }


        const response = await api.put("/order/finish", data, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        router.refresh()

        closeModal()
    }

    function totalPedido(order: OrderProps[]) {

        return order.reduce((total, item) => {
            const totalPedido = parseFloat(item.product.price) * item.amount

            return total + totalPedido
        }, 0)

    }









    return (
        <OrderContext.Provider value={{ isOpen, closeModal, openModal, detailOrder, finishPedido, totalPedido }}>
            {children}
        </OrderContext.Provider>
    )
}