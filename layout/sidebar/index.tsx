import { FC } from "react";
import { Detailed } from "../../utils/types";

interface SidebarProps extends Detailed<HTMLDivElement> {}

const Sidebar: FC<SidebarProps> = (props) => <div {...props}>Sidebar</div>;

export default Sidebar;
