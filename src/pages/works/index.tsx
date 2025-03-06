import s from "./works.module.scss"

import cx from "clsx"

import { CardProject } from "@/components/card-project"
import DefaultLayout from "@/layouts/default"
import { useAll as getAllServices } from "@/api/queries/services"
import { useAll as getAllProjects } from "@/api/queries/project-card"
import { useState } from "react"
import LoadingScreen from "@/components/loading-screen"
import Header from "@/components/header"

export default function Works() {
  const [currentServices, setCurrentServices] = useState<string[]>([])
  const { data: projects, isLoading: projectsLoading } = getAllProjects(currentServices.join(","))
  const { data: services, isLoading: servicesLoading } = getAllServices()

  function handleCurrentServices(selectedService: string) {
    if (selectedService === "ALL") {
      return setCurrentServices([])
    }

    if (currentServices.includes(selectedService)) {
      const filtered = currentServices.filter((service) => service !== selectedService)
      return setCurrentServices(filtered)
    }

    return setCurrentServices((prev) => [...prev, selectedService])
  }

  if (projectsLoading || servicesLoading) {
    return <LoadingScreen />
  }

  return (
    <DefaultLayout>
      <Header />

      <section className={cx(s.intro, "flex flex-col tablet:flex-row items-center justify-between")}>
        <h1>WORKS</h1>
        <div
          className={cx(
            s.filter,
            "flex items-center tablet:items-start justify-center tablet:justify-start flex-wrap gap-2"
          )}
        >
          <div
            className={cx(s.filterItem, "cursor-pointer", { [s.active]: currentServices.length === 0 })}
            onClick={() => handleCurrentServices("ALL")}
          >
            All
          </div>
          <div
            className={cx(
              s.items,
              "flex items-center tablet:items-start justify-center tablet:justify-start flex-wrap gap-2"
            )}
          >
            {services &&
              services.map((item) => {
                return (
                  <div
                    className={cx(s.filterItem, "cursor-pointer", { [s.active]: currentServices.includes(item.id) })}
                    key={item.id}
                    onClick={() => handleCurrentServices(item.id)}
                  >
                    <span>{item.title}</span>
                  </div>
                )
              })}
          </div>
        </div>
      </section>
      <section className={cx(s.works, "grid grid-cols-1 tablet:grid-cols-2 gap-10 tablet:gap-y-20 tablet:gap-x-4")}>
        {projects &&
          projects.map((item, i) => {
            return (
              <div className={s.cardC} key={i}>
                <CardProject {...item} mediaClassName={s.worksMediaC} />
              </div>
            )
          })}
      </section>
      {projects?.length === 0 && (
        <div className="flex items-center justify-center h-[500px]">
          <h1 className="text-2xl font-bold">No projects found</h1>
        </div>
      )}
    </DefaultLayout>
  )
}
