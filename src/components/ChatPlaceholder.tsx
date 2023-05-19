import ChatPlaceholderCard from './ChatPlaceHolderCard'

export default function ChatPlaceholder() {
  return (
    <div className="m-5 ">
      <h3 className="my-8 text-center text-4xl font-bold ">B7GPT</h3>
      <div className="m-auto mb-8 flex flex-col gap-5 md:max-w-4xl md:flex-row">
        <ChatPlaceholderCard />
        <ChatPlaceholderCard />
        <ChatPlaceholderCard />
      </div>
    </div>
  )
}
