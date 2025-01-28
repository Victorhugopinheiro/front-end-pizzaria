"use client"

import { useFormStatus } from "react-dom"



interface ButtonProps{
    name:string
}

export function Button({name}:ButtonProps){

    const {pending} = useFormStatus()

    return(
        <button  type="submit" disabled={pending}>{pending ? "Carregando..." : name}</button>
    )
}