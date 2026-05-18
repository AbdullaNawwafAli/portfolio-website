export type ProjectMediaType = "img" | "vid"

export interface ProjectMediaData {
  id: string
  projectId: string
  cloudinaryId: string
  type: ProjectMediaType
  description: string
  alt: string
  order: number
}

export interface ProjectData {
  id: string
  name: string
  description: string
  startDate: Date
  finishDate: Date
  order: number
  featured: boolean
  tags?: ProjectTagData[]
  media?: ProjectMediaData[]
}

export interface ProjectTagData {
  id: string
  text: string
}

export interface ProjectMediaDto {
  cloudinaryId: string
  type: ProjectMediaType
  description: string
  alt: string
  order?: number
}

export interface createProjectDataDto {
  name: string
  description: string
  startDate: Date
  finishDate: Date
  order?: number
  featured: boolean
  media?: ProjectMediaDto[]
  tags?: string[]
}

export interface deleteProjectDataDto {
  id: string
}
