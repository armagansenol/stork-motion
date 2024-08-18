import s from "./lets-talk.module.scss"

import { FormContact } from "@/components/form-contact"
import Header from "@/components/header"
import DefaultLayout from "@/layouts/default"

export default function LetsTalk() {
  return (
    <DefaultLayout>
      <Header />
      <section className={s.intro}>
        <h1>LET'S TALK</h1>
      </section>
      <FormContact />
    </DefaultLayout>
  )
}
