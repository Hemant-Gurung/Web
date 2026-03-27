import type { MenuItem as MenuItemType } from "../types.ts";
import "./MenuItem.css";

interface Props {
  item: MenuItemType;
}

const MenuItem = ({ item }: Props) => {
  return (
    <div className="menu-item">
      <h3>{item.name} - ${item.price.toFixed(2)}</h3>
      <p>{item.description}</p>
    </div>
  );
};

export default MenuItem;
