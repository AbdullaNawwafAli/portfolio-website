import z from "zod"

export const createSkillsSchema = z.object({
  skill_type_name: z.string().min(1, "Name must be at least 1 characters."),
  skills: z
    .array(
      z.object({
        skill_name: z.string().min(1, "Skill name is required."),
        skill_logo_cloudinary_id: z.string(),
      })
    )
    .min(1, "Add at least one skill."),
})
