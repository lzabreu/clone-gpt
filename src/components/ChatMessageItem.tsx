import { ChatMessage } from 'src/types/ChatMessage'
import IconRobot from './icons/IconRobot'
import IconUser from './icons/IconUser'

interface Props {
  message: ChatMessage
}

export default function ChatMessageItem({ message }: Props) {
  return (
    <div
      className={`m-auto py-5 ${message.author === 'ai' && 'bg-gray-600/50'}`}
    >
      <div className="flex max-w-4xl p-4">
        <div
          className={`mx-4 flex h-10 w-10 items-center justify-center rounded md:ml-0 
          ${message.author === 'ai' ? 'bg-green-900' : 'bg-blue-900'}`}
        >
          {message.author === 'ai' && <IconRobot width={24} height={24} />}
          {message.author === 'me' && <IconUser width={24} height={24} />}
        </div>
        <div className=" flex-1 whitespace-pre-wrap text-base">
          {message.body}
        </div>
      </div>
    </div>
  )
}
