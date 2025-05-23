import Button from "./Button";
import ToggleButton from "./ToggleButton";

interface IHeaderProps { 
  currentLocalTime: string;
  handleTimeFormat: (value: boolean) => void;
}

const Header = ({ currentLocalTime, handleTimeFormat }: IHeaderProps) => {
  return (
    <header className="px-4 h-16 flex items-center justify-between border-b border-1 border-[#202020]">
      <span>LOGO</span>
      <div className="ml-auto flex items-center gap-2">
        <Button>{currentLocalTime}</Button>
        <ToggleButton
          values={[
            { label: "24", value: true },
            { label: "12", value: false },
          ]}
          onChange={(value) => handleTimeFormat(value)}
        />
      </div>
    </header>
  );
};

export default Header;
