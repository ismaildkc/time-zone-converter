import Button from "./Button"

const Header = ({ currentLocalTime }: { currentLocalTime: string }) => {
  return (
    <div className="px-2 h-16 flex items-center justify-between">
      <span>LOGO</span>
      <Button>{currentLocalTime}</Button>
    </div>
  )
}

export default Header