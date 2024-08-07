import s from "./card-project.module.scss"

import cx from "clsx"
import { Link } from "react-router-dom"

import Img from "@/components/custom-img"
import Video from "@/components/custom-video"
import { MediaType, ProjectCardProps } from "@/lib/types"

export interface Props extends ProjectCardProps {
  mediaClassName: string
}

export default function CardProject(props: Props) {
  return (
    <Link
      className={cx(
        s.cardProject,
        "flex flex-col items-center tablet:items-start justify-center tablet:justify-start cursor-pointer"
      )}
      to={`/works/${props.url}`}
    >
      <div className={cx(s.mediaC, props.mediaClassName)}>
        {props.mediaType === MediaType.image ? <Img src={props.mediaSrc} /> : <Video src={props.mediaSrc} />}
      </div>
      <p className={s.title}>{props.projectName}</p>
      <div className={cx(s.categories, "flex items-center justify-center tablet:justify-start flex-wrap gap-2")}>
        {props.services &&
          props.services.map((item, i) => {
            return (
              <div className={s.category} key={i}>
                <span>{item}</span>
              </div>
            )
          })}
      </div>
    </Link>
  )
}
