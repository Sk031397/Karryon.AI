import { AgentProvider } from "@/components/AgentContext"
import { AppHeader } from "./dashboard/_components/AppHeader"

export default function DashboardLayout({children}:{children:React.ReactNode}) {
  return (
    <AgentProvider>
        <AppHeader/>
        <div className="px-10 md:px-20 lg:px-40 py-10">
          {children}
        </div>
    </AgentProvider>
  )
}
