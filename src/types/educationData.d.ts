export interface educationData {
  id: string
  institute: string
  startDate: Date
  finishDate: Date
}
export interface createEducationDataDto {
  institute: string
  startDate: Date
  finishDate: Date
}

export interface updatedEducationData {
  institute: string
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
