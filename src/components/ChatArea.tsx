import { Chat } from 'src/types/Chat'
import ChatPlaceholder from './ChatPlaceholder'
import ChatMessageItem from './ChatMessageItem'
import ChatMessageLoading from './ChatMessageLoading'

interface Props {
  chat: Chat | undefined
  loading: boolean
}
export default function ChatArea({ chat, loading }: Props) {
  return (
    <section className=" h-0 flex-auto overflow-y-scroll">
      {!chat && <ChatPlaceholder />}
      {chat &&
        chat.messages.map((message, index) => (
          <ChatMessageItem key={message.id} message={message} />
        ))}
      {loading && <ChatMessageLoading />}
    </section>
  )
}
