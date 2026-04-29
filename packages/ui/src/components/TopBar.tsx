import "./TopBar.css";

interface TopBarProps {
  children?: React.ReactNode;
}

export function TopBar({ children }: TopBarProps) {
  return (
    <div className="ui-topbar">
      {children}
    </div>
  );
}
