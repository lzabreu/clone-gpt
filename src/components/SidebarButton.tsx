import { ReactNode } from 'react'

interface Props {
  icon: ReactNode
  label: string
  onClick: () => void
}

export default function SidebarButton({ icon, label, onClick }: Props) {
  return (
    <div
      onClick={onClick}
      className="flex cursor-pointer items-center rounded-md p-3 text-sm hover:bg-gray-500/20"
    >
      <div className="mr-3">{icon}</div>
      <div className="mr-3 flex-1 truncate">{label}</div>
    </div>
  )
}
