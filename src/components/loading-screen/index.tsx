import { IconLoading } from "@/components/icons"

export default function LoadingScreen() {
  return (
    <div className="w-full h-[calc(100vh-var(--header-height))] flex items-center justify-center">
      <div className="w-10 h-10">
        <IconLoading fill="var(--black)" />
      </div>
    </div>
  )
}
