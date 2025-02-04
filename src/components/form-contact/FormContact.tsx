import s from "./form-contact.module.scss"

import { zodResolver } from "@hookform/resolvers/zod"
import cx from "clsx"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { useSubmitForm } from "@/api/mutations/contact-form"
import { FormSchema } from "@/api/mutations/contact-form/schema"
import SilverStork from "@/components/silver-stork"
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/utility/form"
import { Input } from "@/components/utility/input"
import { Textarea } from "@/components/utility/textarea"

export default function FormContact() {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      name: "",
      email: "",
      message: "",
      kvkk: false,
    },
  })

  const { mutate } = useSubmitForm()

  function onSubmit(data: z.infer<typeof FormSchema>) {
    mutate(data, {
      onSuccess: (response) => {
        if (response.success) {
          alert(response.message)
          form.reset()
        }
      },
    })
  }

  return (
    <div className={cx(s.formContact, "grid grid-rows-[auto_auto] tablet:grid-rows-1 grid-cols-12")}>
      <div className={cx(s.text, "col-span-12 tablet:col-span-5")}>
        <h5>LET'S CREATE SOMETHING AMAZING TOGETHER</h5>
        <p>
          You can also send us an email at
          <strong>
            <a href="mailto:hello@luckluck.com"> hello@luckluck.com </a>
          </strong>
          if you prefer.
        </p>
        <div className={s.stork}>
          <SilverStork />
        </div>
      </div>
      <div className={cx(s.formC, "col-span-12 tablet:col-span-7 flex items-end")}>
        <div className="flex-1">
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
                        <Input className={cx(s.input, s.border)} placeholder="YOUR NAME" {...field} />
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
                        <Input className={cx(s.input, s.border)} placeholder="YOUR EMAIL ADDRESS" {...field} />
                      </FormControl>
                      <FormMessage className={s.formMessage} />
                    </FormItem>
                  )}
                />
              </div>
              <div
                className={cx(s.fieldC, {
                  [s.error]: form.formState.errors.message,
                })}
              >
                <FormField
                  control={form.control}
                  name="message"
                  render={({ field }) => (
                    <FormItem className={s.formItem}>
                      <FormControl>
                        <Textarea
                          className={cx(s.input, s.textarea, s.border)}
                          placeholder="HOW CAN WE HELP?"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage className={s.formMessage} />
                    </FormItem>
                  )}
                />
              </div>
              <button className={cx(s.submitBtn)} type="submit" disabled={!form.formState.isValid}>
                <span>Send now</span>
              </button>
            </form>
          </Form>
        </div>
      </div>
    </div>
  )
}
