import { Chat } from 'src/types/Chat'
import ChatPlaceholder from './ChatPlaceholder'
import ChatMessageItem from './ChatMessageItem'
import ChatMessageLoading from './ChatMessageLoading'
import { useEffect, useRef } from 'react'

interface Props {
  chat: Chat | undefined
  loading: boolean
}
export default function ChatArea({ chat, loading }: Props) {
  const scrollArea = useRef<HTMLDivElement>(null)
  useEffect(() => {
    scrollArea.current?.scrollTo(0, scrollArea.current?.scrollHeight)
  }, [loading, chat?.messages.length])
  return (
    <section ref={scrollArea} className=" h-0 flex-auto overflow-y-scroll">
      {!chat && <ChatPlaceholder />}
      {chat &&
        chat.messages.map((message, index) => (
          <ChatMessageItem key={message.id} message={message} />
        ))}
      {loading && <ChatMessageLoading />}
    </section>
  )
}
