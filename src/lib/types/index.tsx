export interface IOption {
  id?: string
  label: string
  value: string
}

export interface MediaProps {
  mediaType: MediaType
  src: string
  cover?: string
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
  intro: {
    projectName: string
    coverMedia: MediaProps
    description: string
    services: string[]
  }
  content: MediaProps[]
  nextWork: {
    url: string
    media: MediaProps
  }
}

export interface ProjectCardProps {
  id: string
  mediaSrc: string
  mediaType: MediaType
  projectName: string
  services: string[]
  url: string
}
