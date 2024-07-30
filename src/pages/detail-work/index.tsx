import Img from "@/components/custom-img"
import s from "./detail-work.module.scss"

import cx from "clsx"
import { Link, useParams } from "react-router-dom"
import { FormContact } from "@/components/form-contact"
import Video from "@/components/custom-video"
import Marquee from "@/components/marquee"
import DefaultLayout from "@/layouts/default"
import { useSingle } from "@/api/queries/projects"

export default function DetailWork() {
  const params = useParams()
  // const navigate = useNavigate()
  const { isLoading, data } = useSingle(params.projectName ?? "")

  console.log(params, data)

  const mockData = {
    intro: {
      projectName: "Project Name",
      coverMedia: {
        type: "image",
        src: "/img/sample.jpg",
      },
      description:
        "Our project aims to create a comprehensive online platform designed to provide valuable academic resources and engaging content. This platform will feature a diverse range of webinar videos, instructional how-to videos, an extensive wiki, and a dynamic blog.",
      categories: [
        {
          title: "Branding",
          id: "1",
        },
      ],
    },
    content: [
      {
        type: "image",
        src: "/img/sample.jpg",
      },
      {
        type: "video",
        src: "/video/sample.mp4",
        autoplay: true,
      },
      {
        type: "video",
        src: "/video/sample.mp4",
        autoplay: false,
      },
    ],
    nextWork: {
      url: "/lol",
      media: "/img/sample.jpg",
    },
  }

  // useEffect(() => {
  //   if (!isLoading && !data) {
  //     return navigate("/not-found")
  //   }
  // }, [data, isLoading, navigate])

  // useEffect(() => {
  //   if (!isLoading) {
  //     ScrollTrigger.refresh()
  //   }
  // }, [isLoading])

  return (
    <DefaultLayout>
      <div className={cx(s.detailWork, "flex flex-col items-stretch")}>
        <div className={cx(s.intro, "flex flex-col items-stretch")}>
          <div className={cx(s.info, "flex items-center justify-between")}>
            <h1>{mockData.intro.projectName}</h1>
            <div className={cx("flex items-end justify-start flex-wrap gap-4")}>
              {mockData.intro.categories.map((item) => {
                return (
                  <div className={s.filterItem} key={item.id}>
                    <span>{item.title}</span>
                  </div>
                )
              })}
            </div>
          </div>

          <div className={s.mediaC}>
            <Img src={mockData.intro.coverMedia.src} />
          </div>

          <p className={s.description}>
            Our project aims to create a comprehensive online platform designed to provide valuable academic resources
            and engaging content. This platform will feature a diverse range of webinar videos, instructional how-to
            videos, an extensive wiki, and a dynamic blog.
          </p>
        </div>

        <div className={cx(s.content, "flex flex-col items-stretch")}>
          {mockData.content.map((item, i) => {
            return (
              <div className={s.block} key={i}>
                <div className={s.mediaC}>
                  {item.type === "image" ? <Img src={item.src} /> : <Video src={item.src} autoPlay={item.autoplay} />}
                </div>
              </div>
            )
          })}
        </div>

        <Link to="/lol" className={cx(s.marquee, "cursor-pointer")}>
          <Marquee duration={40} repeat={4}>
            <div className={cx(s.nextWork, "flex items-center")}>
              <span>NEXT WORK</span>
              <div className={s.mediaC}>
                <Img src="/img/sample.jpg" />
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
