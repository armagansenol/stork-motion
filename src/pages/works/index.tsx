import s from "./works.module.scss"

import cx from "clsx"

import { CardProject } from "@/components/card-project"
import DefaultLayout from "@/layouts/default"
import { useAll as getAllServices } from "@/api/queries/services"
import { useAll as getAllProjects } from "@/api/queries/project-card"

export default function Works() {
  const { data: projects } = getAllProjects()
  const { data: services } = getAllServices()

  // const filters = [
  //   { ui: "Branding", type: "BRANDING" },
  //   { ui: "Web Design & Development", type: "WEB_DESIGN_AND_DEVELOPMENT" },
  //   { ui: "Motion Design", type: "MOTION_DESIGN" },
  // ]

  // const mockProjects = [
  //   {
  //     title: "Test 1",
  //     mediaType: MediaType.image,
  //     mediaSrc: "/img/sample.jpg",
  //     categories: [
  //       {
  //         ui: "Branding",
  //         type: "BRANDING",
  //       },
  //     ],
  //     url: "lol",
  //   },
  //   {
  //     title: "Test 2",
  //     mediaType: MediaType.image,
  //     mediaSrc: "/img/sample.jpg",
  //     categories: [
  //       { ui: "Branding", type: "BRANDING" },
  //       { ui: "Web Design & Development", type: "WEB_DESIGN_AND_DEVELOPMENT" },
  //       { ui: "Motion Design", type: "MOTION_DESIGN" },
  //     ],
  //     url: "lol",
  //   },
  //   {
  //     title: "Test 2",
  //     mediaType: MediaType.image,
  //     mediaSrc: "/img/sample.jpg",
  //     categories: [
  //       { ui: "Branding", type: "BRANDING" },
  //       { ui: "Web Design & Development", type: "WEB_DESIGN_AND_DEVELOPMENT" },
  //       { ui: "Motion Design", type: "MOTION_DESIGN" },
  //     ],
  //     url: "lol",
  //   },
  //   {
  //     title: "Test 2",
  //     mediaType: MediaType.image,
  //     mediaSrc: "/img/sample.jpg",
  //     categories: [
  //       { ui: "Branding", type: "BRANDING" },
  //       { ui: "Web Design & Development", type: "WEB_DESIGN_AND_DEVELOPMENT" },
  //       { ui: "Motion Design", type: "MOTION_DESIGN" },
  //     ],
  //     url: "lol",
  //   },
  //   {
  //     title: "Test 2",
  //     mediaType: MediaType.image,
  //     mediaSrc: "/img/sample.jpg",
  //     categories: [
  //       { ui: "Branding", type: "BRANDING" },
  //       { ui: "Web Design & Development", type: "WEB_DESIGN_AND_DEVELOPMENT" },
  //       { ui: "Motion Design", type: "MOTION_DESIGN" },
  //     ],
  //     url: "lol",
  //   },
  // ]

  return (
    <DefaultLayout>
      <section className={cx(s.intro, "flex items-center justify-between")}>
        <h1>WORKS</h1>
        <div className={cx(s.filter, "flex items-start justify-start flex-wrap gap-4")}>
          <div className={s.filterItem}>All</div>
          <div className={cx("flex items-start justify-start flex-wrap gap-4")}>
            {services &&
              services.map((item) => {
                return (
                  <div className={s.filterItem} key={item.id}>
                    <span>{item.title}</span>
                  </div>
                )
              })}
          </div>
        </div>
      </section>
      <section className={cx(s.works, "grid grid-cols-2 gap-y-20 gap-x-4")}>
        {projects &&
          projects.map((item, i) => {
            return (
              <div className={s.cardC} key={i}>
                <CardProject {...item} mediaClassName={s.worksMediaC} />
              </div>
            )
          })}
      </section>
    </DefaultLayout>
  )
}
