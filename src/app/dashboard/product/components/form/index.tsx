"use client"
import { Button } from "@/app/dashboard/components/button"
import style from "./styles.module.scss"
import { UploadCloud } from "lucide-react"
import Image from "next/image"
import { useState } from "react"
import { api } from "@/service/api"
import { getCookieClient } from "@/lib/cookieClient"
import { toast } from "sonner"

interface CategoryProps {
  id: string;
  name: string;
}

interface Props {
  categories: CategoryProps[]
}

export function Form({ categories }: Props) {

  const [imageProps, setImageProps] = useState<File>()
  const [urlImage, setUrlImage] = useState("")

  function changeImage(e: React.ChangeEvent<HTMLInputElement>) {
    if (e.target.files && e.target.files[0]) {

      const image = e.target.files[0]

      if (image.type !== "image/png" && image.type !== "image/jpeg") {
        toast.warning("Formato de imagem errado")
        return
      }

      setImageProps(image)
      setUrlImage(URL.createObjectURL(image))
    }


  }


  async function createProduct(formData: FormData) {
    const categoryIndex = formData.get("category")
    const name = formData.get("name")
    const price = formData.get("price")
    const description = formData.get("description")

    if (!categoryIndex || !name || !price || !description || !imageProps) {
      toast.warning("Preencha todos os campos")
      return
    }

    const token = getCookieClient()
    const data = new FormData();

    data.append("name", name)
    data.append("price", price)
    data.append("description", description)
    data.append("category_id", categories[Number(categoryIndex)].id)
    data.append("file", imageProps)

    const response = await api.post("/products", data, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }).catch((err) => {
      console.log(err);
      toast.warning("Erro ao cadastrar produto")
      return;
    })

    toast.success("Produto Cadastrado")

  }



  return (
    <main className={style.container}>
      <h1>Novo Produto</h1>

      <form action={createProduct} className={style.form}>
        <label className={style.labelImage}>
          <span>
            <UploadCloud size={30} color="#FFF" />
          </span>

          <input
            type="file"
            accept="image/png, image/jpeg"
            required
            onChange={changeImage}
          />


          {urlImage && (
            <Image
              alt="Imagem de preview"
              src={urlImage}
              className={style.preview}
              fill={true}
              quality={100}
              priority={true}
            />
          )}

        </label>

        <select name="category">
          {categories.map((item, index) => (
            <option key={item.id} value={index}>{item.name}</option>
          ))}

        </select>

        <input type="text" name="name" placeholder="Digite o nome do produto"
          className={style.input}
        />

        <input type="text" name="price" placeholder="Digite o preço do produto"
          className={style.input}
        />



        <textarea typeof="textarea" placeholder="Descrição do produto" name="description"
          className={style.input}
        />

        <Button name="Cadastrar" />
      </form>
    </main>
  )
}