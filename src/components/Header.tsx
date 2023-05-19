import IconAdd from './icons/IconAdd'
import IconMenu from './icons/IconMenu'

interface Props {
  openSideBarClick: () => void
  title: string
  newChatClick: () => void
}

export default function Header({
  openSideBarClick,
  title,
  newChatClick,
}: Props) {
  return (
    <header className="flex w-full items-center justify-between border-b border-b-gray-600 p-2 md:hidden">
      <div onClick={openSideBarClick} className="">
        <IconMenu width={24} height={24} />
      </div>
      <div className="mx-2 truncate">{title}</div>
      <div onClick={newChatClick} className="">
        <IconAdd width={24} height={24} />
      </div>
    </header>
  )
}
