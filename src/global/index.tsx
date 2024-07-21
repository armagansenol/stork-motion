export interface IProduct {
  desc: string
  name: {
    full: string
    ui: {
      part1: string
      part2?: string
      color?: string
    }
  }
  imgs: IMedia[]
  similarProducts: ICardProduct[]
  specs: {
    name: string
    icon: string
  }[]
  accordion: {
    desc: string
    title: string
  }[]
  media: IMedia
  seoTitle: string
  url: string
}

export interface ICardProduct {
  hoverImg: { bottom: string; top: string }
  name: string
  img: string
  id?: number
  url?: string
}

export interface IOption {
  id?: string
  label: string
  value: string
}

export interface IMedia {
  mediaType: "video" | "image"
  src: string
  cover?: string
}
