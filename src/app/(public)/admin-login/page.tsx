import { login } from "@/server/actions/auth"
import GithubLoginButton from "@/ui/GithubLoginButton"
import { Button } from "@/ui/shadcn/button"
import {
  FieldSet,
  FieldLegend,
  FieldDescription,
  FieldGroup,
  Field,
  FieldLabel,
  FieldError,
} from "@/ui/shadcn/field"
import { Input } from "@/ui/shadcn/input"

const AdminLoginPage = () => {
  return (
    <>
      <div className="flex flex-col gap-2 flex-1 h-full justify-between py-10 w-full">
        <div className="flex flex-col">
          <div className="text-8xl flex items-center justify-center">
            STOP!! WHO GOES THERE?
          </div>
          <div className="text-5xl flex justify-center center-text">
            IDENTIFY THYSELF! WHAT&apos;S THE SECRET PHRASE?
          </div>
          <GithubLoginButton />
        </div>
      </div>
    </>
  )
}

export default AdminLoginPage
