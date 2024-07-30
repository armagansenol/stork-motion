import { SyntheticEvent, useState } from "react"
import s from "./custom-img.module.scss"

import cn from "clsx"

type Props = {
  alt?: string
  backgroundColor?: string
  objectFit?: "cover" | "contain"
  objectPosition?: string
  src: string
}

const Img = ({
  alt = "Media",
  backgroundColor = "transparent",
  objectFit = "cover",
  objectPosition = "center",
  src = "",
}: Props) => {
  const [loaded, setLoaded] = useState(false)

  function handleLoad(e: SyntheticEvent<HTMLImageElement>) {
    if (e.currentTarget.complete) {
      setLoaded(true)
    } else {
      e.currentTarget.onload = () => {
        setLoaded(true)
      }
    }
  }

  return (
    <figure className={cn(s.customImg, { [s.visible]: loaded })} style={{ backgroundColor }}>
      <img
        alt={alt}
        onLoad={handleLoad}
        src={src}
        style={{
          objectFit,
          objectPosition,
        }}
      />
    </figure>
  )
}

export default Img
