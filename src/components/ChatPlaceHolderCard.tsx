import IconSunTwentyFour from './icons/IconSunTwentyFour'

export default function ChatPlaceholderCard() {
  return (
    <div className="">
      <div className="mb-3 flex items-center justify-center text-lg">
        <IconSunTwentyFour width={24} height={24} className="mr-3" />
        Exemplo
      </div>
      <div className="mb-3 rounded bg-white/5 p-3 text-center text-sm text-white">
        Explique o sentido da vida em termos simples
      </div>
      <div className="mb-3 rounded bg-white/5 p-3 text-center text-sm text-white">
        Explique o sentido da vida em termos simples
      </div>
      <div className="mb-3 rounded bg-white/5 p-3 text-center text-sm text-white">
        Explique o sentido da vida em termos simples
      </div>
    </div>
  )
}
