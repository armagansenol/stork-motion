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
