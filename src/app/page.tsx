import Image from "next/image"
import style from "./page.module.scss"
import logo from "/public/logo.svg"
import Link from "next/link"
import { api } from "@/service/api"
import { redirect } from "next/navigation"
import { cookies } from "next/headers"

export default function Page(){

  async function LoginServerSide(formData: FormData){
    "use server"

    const email = formData.get("email")
    const password = formData.get("password")


    if(email === "" || password === ""){
      console.log("PREENCHA TODOS OS CAMPOS")
      return
    }

   try{

    const data = await api.post("/session",{
      email:email,
      password:password
    })


    if(!data.data.token){
      return
    }

    const expressTime = 60 * 60 * 24 * 30 * 1000

    const cookieStore = await cookies();

    cookieStore.set("session", data.data.token, {
      maxAge: expressTime,
      path: "/",
      httpOnly:false,
      secure: process.env.NODE_ENV === "production"

    })


    console.log(data.data.token)


    redirect("/dashboard")
   }catch(err){
    console.log(err)
   }

    
  }

  return(
    <main className={style.container}>

      <Image alt="Logo-Login" src={logo} />
      <section className={style.content}>
        <form action={LoginServerSide}>
          <input type="email" name="email" required placeholder="Digite seu email" />

          <input type="password" name="password" required placeholder="Digite sua senha" />

          <button className={style.button} type="submit">Acessar</button>
        </form>
      </section>

      <Link className={style.mySingup} href={"/signup"}>Não possui conta? cadastre-se</Link>
    </main>
  )
}