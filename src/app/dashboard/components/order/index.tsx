"use client"

import { RefreshCcw } from "lucide-react"
import style from "./style.module.scss"
import { OrdersOpen } from "@/lib/ordensProps"
import { Modal } from "../modal"
import { use } from "react"
import { OrderContext } from "@/providers/order"
import { api } from "@/service/api"
import { getCookieServer } from "@/lib/cookieServer"
import { useRouter } from "next/navigation"

export function Order({ orders }: { orders: OrdersOpen[] }) {

    const router = useRouter()

    const { isOpen, openModal } = use(OrderContext)

   
    async function getOrderDetail(order_id: string){
        await openModal(order_id)
    }

    function refreshButton(){
        router.refresh()
    }

    return (
        <>
            <main className={style.container}>
                <section className={style.headerOrder}>
                    <h1 className={style.meuH1}>Ultimos pedidos</h1>

                    <button onClick={refreshButton}><RefreshCcw size={22} /></button>
                </section>

                {orders.length === 0 && (
                    <span className={style.withoutTask}>Nenhum pedido para preparo...</span>
                )}
                
                {orders.map((item) => (
                    <section key={item.id} className={style.mesa}>
                        <button onClick={() => getOrderDetail(item.id)}>
                            <div />
                            <span>Mesa {item.table}</span>
                        </button>
                    </section>
                ))}


            </main>

            {isOpen && <Modal/>}

        </>
    )
}