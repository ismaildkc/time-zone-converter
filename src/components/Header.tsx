import Button from "./Button"

const Header = () => {
  return (
    <div className="px-2 h-16 flex items-center justify-between">
      <span>LOGO</span>
      <Button>13:42</Button>
    </div>
  )
}

export default Header