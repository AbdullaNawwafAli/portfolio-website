import GithubLoginButton from "@/ui/GithubLoginButton"
import PageLayoutWrapper from "@/ui/wrappers/PageLayoutWrapper"

const AdminLoginPage = () => {
  return (
    <PageLayoutWrapper className="gap-2 justify-between">
      <div className="flex flex-col">
        <div className="text-8xl flex items-center justify-center">
          STOP!! WHO GOES THERE?
        </div>
        <div className="text-5xl flex justify-center center-text">
          IDENTIFY THYSELF! WHAT&apos;S THE SECRET PHRASE?
        </div>
        <GithubLoginButton />
      </div>
    </PageLayoutWrapper>
  )
}

export default AdminLoginPage
