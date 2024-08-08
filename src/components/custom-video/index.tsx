import s from "./custom-video.module.scss"

type Props = {
  autoPlay?: boolean
  bgColor?: string
  cover?: string
  loop?: boolean
  muted?: boolean
  src: string
}

const Video = ({ autoPlay = true, bgColor = "var(--white-transparent)", cover = "#", src = "#" }: Props) => {
  return (
    <figure className={s.customVideo} style={{ background: bgColor }}>
      <video
        poster={cover}
        className={s.vid}
        muted={autoPlay}
        autoPlay={autoPlay}
        loop={autoPlay}
        playsInline
        controls={!autoPlay}
      >
        <source src={src} type="video/mp4" />
      </video>
    </figure>
  )
}

export default Video
