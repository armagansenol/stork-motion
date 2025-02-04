import { z } from "zod"

export const FormSchema = z.object({
  name: z.string().min(1, {
    message: "Ad soyad bilgisi giriniz.",
  }),
  email: z.string().email({
    message: "Geçerli bir e-posta adresi giriniz.",
  }),
  message: z.string().min(1, {
    message: "Firma adı giriniz.",
  }),
  kvkk: z.boolean(),
})

export type FormData = z.infer<typeof FormSchema>
