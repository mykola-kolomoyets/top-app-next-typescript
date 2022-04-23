import { FC } from "react";

import { Detailed } from "../../utils/types";
import Menu from "./menu";

interface SidebarProps extends Detailed<HTMLDivElement> {}

const Sidebar: FC<SidebarProps> = (props) => (
  <div {...props}>
    <Menu />
  </div>
);

export default Sidebar;
