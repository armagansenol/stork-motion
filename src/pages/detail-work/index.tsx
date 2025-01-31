import s from "./detail-work.module.scss"

import cx from "clsx"
import { Link, useNavigate, useParams } from "react-router-dom"

import { useSingle } from "@/api/queries/projects"
import Video from "@/components/custom-video"
import { FormContact } from "@/components/form-contact"
import Marquee from "@/components/marquee"
import Img from "@/components/custom-img"
import DefaultLayout from "@/layouts/default"
import { useEffect } from "react"
import Header from "@/components/header"

export default function DetailWork() {
  const params = useParams()
  const navigate = useNavigate()
  const { isLoading, data } = useSingle(params.projectName ?? "")

  const baseUrl = `https://cms.storkmotion.com/assets/images/projects/${params.projectName}/`

  console.log(params, data, isLoading)

  // const mockData = {
  //   projectName: "Project Name",
  //   coverMedia: {
  //     type: "image",
  //     desktop: "/img/sample.jpg",
  //     mobile: "/img/sample.jpg",
  //   },
  //   description:
  //     "Our project aims to create a comprehensive online platform designed to provide valuable academic resources and engaging content. This platform will feature a diverse range of webinar videos, instructional how-to videos, an extensive wiki, and a dynamic blog.",
  //   services: ["Branding"],
  //   content: [
  //     {
  //       id: "1",
  //       items: [
  //         {
  //           type: "image",
  //           desktop: "/img/sample.jpg",
  //           mobile: "/img/sample.jpg",
  //         },
  //         {
  //           type: "video",
  //           desktop: "/video/sample.mp4",
  //           mobile: "/video/sample.mp4",
  //           autoplay: true,
  //         },
  //       ],
  //     },
  //     {
  //       id: "2",
  //       items: [
  //         {
  //           type: "image",
  //           desktop: "/img/sample.jpg",
  //           mobile: "/img/sample.jpg",
  //         },
  //         {
  //           type: "image",
  //           desktop: "/img/sample.jpg",
  //           mobile: "/img/sample.jpg",
  //         },
  //       ],
  //     },
  //     {
  //       id: "3",
  //       items: [
  //         {
  //           type: "image",
  //           desktop: "/img/sample.jpg",
  //           mobile: "/img/sample.jpg",
  //         },
  //       ],
  //     },
  //     {
  //       id: "4",
  //       items: [
  //         {
  //           type: "video",
  //           desktop: "/video/sample.mp4",
  //           mobile: "/video/sample.mp4",
  //           autoplay: true,
  //         },
  //       ],
  //     },
  //   ],
  //   nextWork: {
  //     url: "/lol",
  //     media: "/img/sample.jpg",
  //   },
  // }

  useEffect(() => {
    if (!isLoading && !data) {
      return navigate("/not-found")
    }
  }, [data, isLoading, navigate])

  // useEffect(() => {
  //   if (!isLoading) {
  //     ScrollTrigger.refresh()
  //   }
  // }, [isLoading])

  return (
    <DefaultLayout>
      <Header />

      <div className={cx(s.detailWork, "flex flex-col items-stretch")}>
        <div className={cx(s.intro, "flex flex-col items-stretch")}>
          <div className={cx(s.info, "flex flex-col tablet:flex-row items-center justify-between")}>
            <h1>{data && data.projectName}</h1>
            <div className={cx("flex items-end justify-start flex-wrap gap-2 tablet:gap-4")}>
              {data &&
                data.services.map((item, i) => {
                  return (
                    <div className={s.filterItem} key={i}>
                      <span>{item}</span>
                    </div>
                  )
                })}
            </div>
          </div>

          <div className={s.mediaC}>
            <Img src={data?.coverMedia.desktop as string} />
          </div>

          <p className={s.description}>{data?.description}</p>
        </div>

        <div className={cx(s.content, "flex flex-col items-stretch")}>
          {data &&
            data.content.map((content) => {
              return (
                <div className="flex justify-stretch items-stretch gap-3 tablet:gap-5" key={content.id}>
                  {content.items.map((item, i) => {
                    return (
                      <div className={cx(s.block, "flex-1")} key={i}>
                        <div className={s.mediaC}>
                          {item.type === "image" ? (
                            <Img src={`${baseUrl}/${item.desktop}` as string} />
                          ) : (
                            <Video src={`${item.desktop}#t=0.01` as string} autoPlay={item.autoplay as boolean} />
                          )}
                        </div>
                      </div>
                    )
                  })}
                </div>
              )
            })}
        </div>

        <Link to={`/${data?.nextWork.url}`} className={cx(s.marquee, "cursor-pointer")}>
          <Marquee duration={20} repeat={4} inverted>
            <div className={cx(s.nextWork, "flex items-center")}>
              <span>NEXT WORK</span>
              <div className={s.mediaC}>
                <Img src={data?.nextWork.media as string} />
              </div>
            </div>
          </Marquee>
        </Link>

        <section className={s.contactForm}>
          <FormContact />
        </section>
      </div>
    </DefaultLayout>
  )
}
