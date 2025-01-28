"use client"

import { use, useContext } from "react";
import style from "./style.module.scss"
import { X } from "lucide-react";
import { OrderContext } from "@/providers/order";
import Image from "next/image";


export function Modal() {

    const { closeModal, detailOrder, finishPedido, totalPedido } = useContext(OrderContext)

    async function finalizandoPedido(order_id: string) {
        await finishPedido(order_id)



    }

    return (
        <dialog className={style.dialogContainer}>
            <section className={style.content}>
                <button onClick={closeModal} className={style.close}><X size={40} /></button>
                <article className={style.article}>


                    <h1>Detalhes do pedido</h1>


                    <div className={style.tableAndName}>
                        <span className={style.table}>
                            Mesa<b>{detailOrder[0].order.table}</b>
                        </span>

                        {detailOrder[0].order?.name && (
                            <span className={style.name}>
                                <b>{detailOrder[0].order.name}</b>
                            </span>
                        )}
                    </div>



                    {detailOrder.map((item) => (
                        <section key={item.id} className={style.todosPedidos}>
                            <div className={style.containerInfo}>
                                <Image alt="imagem do produto" priority={true} quality={100} width={100} height={100} src={item.product.banner} />
                                <div className={style.controlInfo}>
                                    <span className={style.produto}> {item.product.name} - Qtd: {item.amount} -
                                        R${parseFloat(item.product.price) * item.amount} </span>
                                    <p>{item.product.description}</p>
                                </div>
                            </div>



                        </section>
                    ))}
                    <h3 className={style.totalPedido}>Total do pedido {totalPedido(detailOrder).toLocaleString("pt-br", {
                        style: "currency",
                        currency: "Brl"
                    })}</h3>

                    <button onClick={() => finalizandoPedido(detailOrder[0].order.id)} className={style.finish}>Concluir pedido</button>

                </article>

            </section>
        </dialog>
    )
}