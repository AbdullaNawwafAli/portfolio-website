export interface SkillsData {
  id: string
  skill_type_name: string
  skills: Skill[]
}

export interface Skill {
  id: string
  skill_type_id: string
  skill_logo_cloudinary_id: string
  skill_name: string
}
export interface createSkillsDataDto {
  skill_type_name: string
  skills: Skill[]
}

export interface updatedSkillsData {
  skill_type_name: string
  skills: Skill[]
}
export interface updateSkillsDataDto {
  id: string
  updatedData: updatedSkillsData
}

export interface deleteSkillsDataDto {
  id: string
}
