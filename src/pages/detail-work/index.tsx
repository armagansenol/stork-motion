import s from "./detail-work.module.scss"

import cx from "clsx"
import { useEffect } from "react"
import { Link, useNavigate, useParams } from "react-router-dom"
import { useScrollbar } from "@14islands/r3f-scroll-rig"

import { useSingle } from "@/api/queries/projects"
import Img from "@/components/custom-img"
import { FormContact } from "@/components/form-contact"
import Header from "@/components/header"
import { IframeVideo } from "@/components/iframe-video"
import Marquee from "@/components/marquee"
import DefaultLayout from "@/layouts/default"
import { MediaType } from "@/lib/types"

export default function DetailWork() {
  const params = useParams()
  const navigate = useNavigate()
  const { isLoading, data } = useSingle(params.projectName ?? "")
  const scrollbar = useScrollbar()

  console.log("data", data)

  const baseUrl = `https://cms.storkmotion.com/assets/images/projects/${params.projectName}/`

  console.log(params, data, isLoading)

  useEffect(() => {
    if (!isLoading && !data) {
      return navigate("/not-found")
    }
  }, [data, isLoading, navigate])

  useEffect(() => {
    scrollbar?.__lenis?.scrollTo(0, { immediate: true })
  }, [])

  return (
    <DefaultLayout>
      <Header />
      <div className={cx(s.detailWork, "flex flex-col items-stretch")}>
        <div className={cx(s.intro, "flex flex-col items-stretch")}>
          <div className={cx(s.info, "flex flex-col tablet:flex-row items-center justify-between")}>
            <h1>{data && data.projectName}</h1>
            <div className={cx("flex items-end justify-center flex-wrap gap-2 tablet:gap-4 tablet:justify-end")}>
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
            {data?.coverMedia.type === MediaType.image ? (
              <Img objectFit="cover" src={data?.coverMedia.desktop as string} />
            ) : (
              <IframeVideo src={data?.coverMedia.desktop as string} />
            )}
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
                            <IframeVideo src={`${"https://vimeo.com/1061704780?share=copy"}#t=0.01` as string} />
                          )}
                        </div>
                      </div>
                    )
                  })}
                </div>
              )
            })}
        </div>
        <Link to={`/works/${data?.nextWork.url}`} className={cx(s.marquee, "cursor-pointer")}>
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
