import { FormContact } from "@/components/form-contact"
import Header from "@/components/header"
import DefaultLayout from "@/layouts/default"

export default function LetsTalk() {
  return (
    <DefaultLayout>
      <Header />
      <div className="mt-0 tablet:mt-16">
        <FormContact />
      </div>
    </DefaultLayout>
  )
}
