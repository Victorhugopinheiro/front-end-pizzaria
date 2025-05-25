import Image from "next/image"
import style from "../page.module.scss"
import logo from "/public/logo.svg"
import Link from "next/link"
import { api } from "@/service/api"
import { redirect } from "next/navigation"

export default function Signup() {


    async function handleRegister(formData: FormData) {
        "use server"

        const name = formData.get("name")
        const email = formData.get("email")
        const password = formData.get("password")

        if (name === "" || email === "" || password === "") {
            console.log("PREENCHA TODOS OS CAMPOS")
            return;
        }

        try {
            await api.post("/users",{
                name: name,
                email: email,
                password: password
            });

        } catch (err) {
            console.log("error")
            console.log(err)
        }

        redirect("/")
    }
    return (
        <main className={style.container}>

            <Image alt="Logo-Login" src={logo} />

            <section className={style.content}>
                <h1 className={style.h1Singup}>Criando sua conta</h1>
                <form action={handleRegister}>
                    <input type="text" name="name" required placeholder="Digite seu nome" />

                    <input type="email" name="email" required placeholder="Digite seu email" />



                    <input type="password" name="password" required placeholder="Digite sua senha" />

                    <button className={style.button} type="submit">Acessar</button>
                </form>
            </section>

            <Link className={style.mySingup} href={"/signup"}>Não possui conta? cadastre-se</Link>
        </main>
    )
}