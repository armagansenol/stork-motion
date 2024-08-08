export interface IOption {
  id?: string
  label: string
  value: string
}

export interface MediaProps {
  desktop?: string
  mobile?: string
  type: MediaType
  autoplay?: boolean
}

export enum MediaType {
  image = "image",
  video = "video",
}

export interface ServiceProps {
  title: string
  id: string
}

export interface ProjectProps {
  projectName: string
  coverMedia: MediaProps
  description: string
  services: string[]
  content: {
    id: string
    items: MediaProps[]
  }[]
  nextWork: {
    url: string
    media: string
  }
  folderName: string
}

export interface ProjectCardProps {
  id: string
  mediaSrc: string
  mediaType: MediaType
  projectName: string
  services: string[]
  url: string
}
