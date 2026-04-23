import {
  createSkillsDataDto,
  deleteSkillsDataDto,
  updateSkillsDataDto,
} from "@/types/skills"
import { db } from "../drizzle"
import { skillInfoTable, skillTypeTable } from "../drizzle/schema"
import { create } from "domain"

export async function getSkillsDb() {
  const skills = await db.query.skillTypeTable.findMany({
    columns: { skill_type_name: true },
    with: {
      skill_info: {
        columns: {
          skill_type_id: true,
          skill_name: true,
          skill_logo_cloudinary_id: true,
        },
      },
    },
  })
  return skills
}

export async function updateSkillsDb({ id, updatedData }: updateSkillsDataDto) {
  //TODO: when implementing update functionality
  //   const skills = await db
  //     .update(educationTable)
  //     .set({
  //       institute: updatedData.institute,
  //       startDate: updatedData.startDate,
  //       finishDate: updatedData.finishDate,
  //     })
  //     .where(eq(educationTable.id, id))
  //   return skills
}

export async function createSkillsDb(createSkillsData: createSkillsDataDto) {
  const skills = await db
    .insert(skillTypeTable)
    .values({
      skill_type_name: createSkillsData.skill_type_name,
    })
    .returning()

  createSkillsData.skills.map(async (skill) => {
    await db.insert(skillInfoTable).values({
      skill_name: skill.skill_name,
      skill_logo_cloudinary_id: skill.skill_logo_cloudinary_id,
      skill_type_id: skills[0].id,
    })
  })

  return skills
}

export async function deleteEducationDb({ id }: deleteSkillsDataDto) {
  //TODO: when implementing delete functionality
  // const skills = await db
  //   .delete(educationTable)
  //   .where(eq(educationTable.id, id))
  // return skills
}
