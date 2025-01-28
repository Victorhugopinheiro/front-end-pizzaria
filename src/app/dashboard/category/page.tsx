import { api } from "@/service/api"
import { Button } from "../components/button"
import style from "./styles.module.scss"
import { getCookieServer } from "@/lib/cookieServer"

export default function Category() {

    async function registerCategory(formData:FormData) {
        "use server"

       

        const nameCategory = formData.get("categoria")

        if(!nameCategory) return

        const token = await getCookieServer()

        const data = {
            name:nameCategory
        }

        const response = await api.post("/category", data, {
            headers:{
                Authorization: `Bearer ${token}`
            }
        })
        .catch((err) => {
            console.log(err)
        })
    }

    return (
        <main className={style.container}>
            <section className={style.content}>

                <h1>Nova Categoria</h1>


                <form action={registerCategory}
                    className={style.form}>
                    <input placeholder="Digite a categoria" name="categoria" type="text" />

                    <Button name="Cadastrar" />

                </form>

            </section>
        </main>
    )
}