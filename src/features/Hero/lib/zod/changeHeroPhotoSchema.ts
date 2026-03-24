import z from "zod"

export const changeHeroPhotoSchema = z.object({
  hero_photo: z.instanceof(File, {
    message: "Hero photo is required",
  }),
})
