import menuData from "../data/menu.json";
import MenuList from "../components/MenuList";
import type { MenuCategory } from "../types.ts";

const Menu = () => {
  return (
    <div>
      <h1>Menu</h1>
      {menuData.map((category: MenuCategory, idx) => (
        <MenuList key={idx} category={category} />
      ))}
    </div>
  );
};

export default Menu;
