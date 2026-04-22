import z from "zod"

export const createSkillsSchema = z.object({
  skill_type_name: z.string().min(1, "Name must be at least 1 characters."),
  hero_photo: z.instanceof(File, {
    message: "Hero photo is required",
  }),
  responsibilities: z.union([z.array(z.string()), z.undefined()]),
})
