'use client'
import { useEffect, useState } from 'react'
import ChatArea from 'src/components/ChatArea'
import Footer from 'src/components/Footer'
import Header from 'src/components/Header'
import Sidebar from 'src/components/Sidebar'
import SideBarChatButton from 'src/components/SideBarChatButton'
import { Chat } from 'src/types/Chat'
import { openai } from 'src/utils/openai'
import { v4 as uuid } from 'uuid'

export default function Home() {
  const [sidebarOpened, setSidebarOpened] = useState(false)
  const [chatList, setChatList] = useState<Chat[]>([])
  const [chatActiveId, setChatActiveId] = useState<string>('')
  const [chatActive, setChatActive] = useState<Chat>()
  const [AILoading, setAILoading] = useState(false)

  useEffect(() => {
    setChatActive(chatList.find((item) => item.id === chatActiveId))
  }, [chatActiveId, chatList])

  useEffect(() => {
    if (AILoading) getAIResponse()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [AILoading])

  const getAIResponse = async () => {
    const chatListClone = [...chatList]
    const chatIndex = chatListClone.findIndex(
      (item) => item.id === chatActiveId,
    )

    if (chatIndex > -1) {
      const translated = openai.translateMessages(
        chatListClone[chatIndex].messages,
      )
      const response = await openai.generate(translated)
      if (response) {
        chatListClone[chatIndex].messages.push({
          id: uuid(),
          author: 'ai',
          body: response,
        })
      }
    }
    setChatList(chatListClone)
    setAILoading(false)
  }

  const openSidebar = () => setSidebarOpened(true)
  const closeSidebar = () => setSidebarOpened(false)

  const handleClearConversations = () => {
    if (AILoading) return
    setChatActiveId('')
    setChatList([])
  }
  const handleNewChat = () => {
    if (AILoading) return
    setChatActiveId('')
    closeSidebar()
  }
  const handleSendMessage = (message: string) => {
    // se não existir o chat cria um chat novo
    if (!chatActiveId) {
      const newChatId = uuid()
      setChatList([
        {
          id: newChatId,
          title: message,
          messages: [{ id: uuid(), author: 'me', body: message }],
        },
        ...chatList,
      ])
      setChatActiveId(newChatId)
    } else {
      // se existir um chat só colocar a mensagem nova
      const chatListClone = [...chatList]
      const chatIndex = chatListClone.findIndex(
        (item) => item.id === chatActiveId,
      )
      chatListClone[chatIndex].messages.push({
        id: uuid(),
        author: 'me',
        body: message,
      })
      setChatList(chatListClone)
    }
    setAILoading(true)
  }

  const handleSelectChat = (id: string) => {
    if (AILoading) return
    const item = chatList.find((item) => item.id === id)
    if (item) {
      setChatActiveId(item.id)
    }
    closeSidebar()
  }
  const handleDeleteChat = (id: string) => {
    const chatListClone = [...chatList]
    const chatIndex = chatListClone.findIndex((item) => item.id === id)
    chatListClone.splice(chatIndex, 1)
    setChatList(chatListClone)
    setChatActiveId('')
  }
  const handleEditChat = (id: string, newTitle: string) => {
    if (newTitle) {
      const chatListClone = [...chatList]
      const chatIndex = chatListClone.findIndex((item) => item.id === id)
      chatListClone[chatIndex].title = newTitle
      setChatList(chatListClone)
    }
  }

  return (
    <main className="flex min-h-screen bg-gptcolor-100 text-white">
      <Sidebar
        open={sidebarOpened}
        onClose={closeSidebar}
        onClear={handleClearConversations}
        onNewChat={handleNewChat}
      >
        {chatList.map((chat) => (
          <SideBarChatButton
            key={chat.id}
            chatItem={chat}
            active={chat.id === chatActiveId}
            onClick={handleSelectChat}
            onDelete={handleDeleteChat}
            onEdit={handleEditChat}
          />
        ))}
      </Sidebar>
      <section className="flex w-full flex-col">
        <Header
          openSideBarClick={openSidebar}
          title={chatActive ? chatActive.title : 'Nova conversa'}
          newChatClick={handleNewChat}
        />
        <ChatArea chat={chatActive} loading={AILoading} />
        <Footer disabled={AILoading} onSendMessage={handleSendMessage} />
      </section>
    </main>
  )
}
