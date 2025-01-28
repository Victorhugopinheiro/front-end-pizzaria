"use client"

import Image from "next/image";
import Link from "next/link";
import logo from "/public/logo.svg"
import style from "./styles.module.scss"
import { FormInput, LogOut, LucideFormInput } from "lucide-react";
import { deleteCookie } from "cookies-next";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export function Header(){

    const router = useRouter()

    async function handleLogout(){
        deleteCookie("session", {path: "/"})
        router.replace("/")
        toast.success("Usuário deslogado")
        
    }

    return(
        <header className={style.container}>
            <div  className={style.content}>
                <Link href={"/"}>
                    <Image alt="Logo dashboard" src={logo}
                    width={180} height={80} priority={true} quality={100}
                    />
                </Link>

                <nav>
                    <Link href={"/dashboard/category"}>Categoria</Link>

                    <Link href={"/dashboard/product"}>Produto</Link>

                    <form action={handleLogout}>
                        <button type="submit">
                            <LogOut size={24}/>
                        </button>
                    </form>
                </nav>
            </div>
        </header>
    )
}