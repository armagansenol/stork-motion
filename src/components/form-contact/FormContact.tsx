import s from "./form-contact.module.scss"

import { zodResolver } from "@hookform/resolvers/zod"
import cx from "clsx"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/utility/form"
import { Input } from "@/components/utility/input"

import { Checkbox } from "@/components/utility/checkbox"
import { Link } from "react-router-dom"

const FormSchema = z.object({
  name: z.string().min(1, {
    message: "Ad soyad bilgisi giriniz.",
  }),
  email: z.string().email({
    message: "Geçerli bir e-posta adresi giriniz.",
  }),
  company: z.string().min(1, {
    message: "Firma adı giriniz.",
  }),
  kvkk: z.boolean(),
})

export default function FormContact() {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      name: "",
      email: "",
      company: "",
      kvkk: false,
    },
  })

  function onSubmit(data: z.infer<typeof FormSchema>) {
    console.log("form submitted", data)
  }

  return (
    <div className={cx(s.formContact, "grid grid-cols-12")}>
      <div className={cx(s.text, "col-span-5")}>
        <h5>LET'S CREATE SOMETHING AMAZING TOGETHER</h5>
        <p>You can also send us an email at hello@luckluck.com if you prefer.</p>
      </div>
      <div className={cx(s.formC, "col-span-7")}>
        <div className="flex items-end">
          <Form {...form}>
            <form className={s.form} onSubmit={form.handleSubmit(onSubmit)}>
              <div
                className={cx(s.fieldC, {
                  [s.error]: form.formState.errors.name,
                })}
              >
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem className={s.formItem}>
                      <FormControl>
                        <Input className={cx(s.input, s.border)} placeholder="Ad Soyad" {...field} />
                      </FormControl>
                      <FormMessage className={s.formMessage} />
                    </FormItem>
                  )}
                />
              </div>
              <div
                className={cx(s.fieldC, {
                  [s.error]: form.formState.errors.email,
                })}
              >
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem className={s.formItem}>
                      <FormControl>
                        <Input className={cx(s.input, s.border)} placeholder="E-posta" {...field} />
                      </FormControl>
                      <FormMessage className={s.formMessage} />
                    </FormItem>
                  )}
                />
              </div>

              <div
                className={cx(s.fieldC, {
                  [s.error]: form.formState.errors.company,
                })}
              >
                <FormField
                  control={form.control}
                  name="company"
                  render={({ field }) => (
                    <FormItem className={s.formItem}>
                      <FormControl>
                        <Input className={cx(s.input, s.border)} placeholder="Firma Adı" {...field} />
                      </FormControl>
                      <FormMessage className={s.formMessage} />
                    </FormItem>
                  )}
                />
              </div>

              {/* <div
                className={cx(s.fieldC, {
                  [s.error]: form.formState.errors.company,
                })}
              >
                <FormField
                  control={form.control}
                  name="kvkk"
                  render={({ field }) => (
                    <FormItem className={cx(s.formItem, "flex items-center")}>
                      <FormControl>
                        <Checkbox className={s.box} checked={field.value} onCheckedChange={field.onChange} />
                      </FormControl>
                      <FormLabel className={s.formLabel}>
                        <Link to="/">KVKK</Link> ve diğer yasal metinleri okudum, onaylıyorum.
                      </FormLabel>
                    </FormItem>
                  )}
                />
              </div> */}

              <button className={cx(s.submitBtn, "cursor-pointer")} type="submit"></button>
            </form>
          </Form>
        </div>
      </div>
    </div>
  )
}
