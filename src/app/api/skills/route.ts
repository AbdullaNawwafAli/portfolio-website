import { getSkillsDb } from "@/server/db/queries/skills"
import { NextResponse } from "next/server"

export async function GET() {
  try {
    const skills = await getSkillsDb()
    if (!skills) {
      return NextResponse.json(null, { status: 200 })
    }
    return NextResponse.json(skills)
  } catch (error) {
    return NextResponse.json(
      { message: "Error fetching skills" },
      { status: 500 }
    )
  }
}

// export async function POST(req: Request) {
//   try {
//     const body = await req.json()

//     const created = await createSkillsDb({
//       company_name: body.company_name,
//       job_title: body.job_title,
//       country: body.country,
//       city: body.city,
//       startDate: new Date(body.startDate),
//       finishDate: body.finishDate ? new Date(body.finishDate) : undefined,
//       responsibilities: body.responsibilities,
//     })

//     return NextResponse.json(created, { status: 201 })
//   } catch (error) {
//     return NextResponse.json(
//       { message: "Error creating skills" },
//       { status: 500 }
//     )
//   }
// }

// export async function DELETE(req: Request) {
//   try {
//     const body = await req.json()

//     const { id } = body
//     if (!id) {
//       return NextResponse.json({
//         message: "Missing id  in request",
//       })
//     }

//     const deleted = await deleteWorkDb({ id })

//     return NextResponse.json({
//       message: "skills entry deleted successfully",
//       item: deleted,
//     })
//   } catch (error) {
//     return NextResponse.json(
//       { message: "Error deleting skills" },
//       { status: 500 }
//     )
//   }
// }
