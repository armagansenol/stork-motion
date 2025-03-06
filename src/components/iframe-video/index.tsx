export interface IframeVideoProps {
  src: string
}

export function IframeVideo(props: IframeVideoProps) {
  return (
    <div
      className="absolute inset-0 bg-slate-300 pointer-events-none"
      style={{
        position: "relative",
        paddingBottom: "50%" /* 2:1 Aspect Ratio */,
        height: 0,
        overflow: "hidden",
      }}
    >
      <iframe
        src={props.src}
        allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media"
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          width: "100%",
          height: "100%",
          transform: "translate(-50%, -50%)",
          objectFit: "cover",
          minWidth: "100%",
          minHeight: "100%",
        }}
      ></iframe>
    </div>
  )
}
