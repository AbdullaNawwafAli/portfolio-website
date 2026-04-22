export interface EducationData {
  id: string
  institute: string
  country: string
  startDate: Date
  finishDate: Date
}
export interface createEducationDataDto {
  institute: string
  country: string
  startDate: Date
  finishDate: Date
}

export interface updatedEducationData {
  institute: string
  country: string
  startDate: Date
  finishDate: Date
}
export interface updateEducationDataDto {
  id: string
  updatedData: updatedEducationData
}

export interface deleteEducationDataDto {
  id: string
}
