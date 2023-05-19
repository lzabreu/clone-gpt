import { useEffect, useRef, useState, KeyboardEvent } from 'react'
import IconSend from './icons/IconSend'

interface Props {
  disabled: boolean
  onSend: (message: string) => void
}
export default function ChatMessageInput({ disabled, onSend }: Props) {
  const [text, setText] = useState('')
  const textEl = useRef<HTMLTextAreaElement>(null)
  useEffect(() => {
    if (textEl.current) {
      textEl.current.style.height = '0px'
      const scrollHeight = textEl.current.scrollHeight
      textEl.current.style.height = scrollHeight + 'px'
    }
  }, [textEl, text])
  const handleSendMessage = () => {
    if (!disabled && text.trim() !== '') {
      onSend(text)
      setText('')
    }
  }
  const handleTextKeyUp = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.code.toLowerCase() === 'enter' && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }
  return (
    <div
      className={`flex rounded-md border border-gray-800/50 bg-gptcolor-50 p-2 
      ${disabled && 'opacity-50'}`}
    >
      <textarea
        ref={textEl}
        className="h-6 max-h-48 flex-1 resize-none overflow-y-auto border-0 bg-transparent outline-none"
        placeholder="Digite uma mensagem"
        onChange={(e) => setText(e.target.value)}
        onKeyUp={handleTextKeyUp}
        disabled={disabled}
        value={text}
      ></textarea>
      <div
        onClick={handleSendMessage}
        className={`cursor-pointer self-end rounded p-1 
        ${text.length ? 'hover: bg-black/20 opacity-100' : 'opacity-20'}`}
      >
        <IconSend width={20} height={20} />
      </div>
    </div>
  )
}
