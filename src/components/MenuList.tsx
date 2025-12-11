import type { MenuCategory as MenuCategoryType } from "../types.ts";
import MenuItem from "./MenuItem";
import "./MenuList.css";

interface Props {
  category: MenuCategoryType;
}

const MenuList = ({ category }: Props) => {
  return (
    <section className="menu-category">
      <h2>{category.category}</h2>
      {category.items.map((item, index) => (
        <MenuItem key={index} item={item} />
      ))}
    </section>
  );
};

export default MenuList;
