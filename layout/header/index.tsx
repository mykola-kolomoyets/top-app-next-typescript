import { FC, Fragment } from "react";
import { Detailed, WithChildren } from "../../utils/types";

interface HeaderProps extends Detailed<HTMLDivElement> {}

const Layout: FC<HeaderProps> = (props) => <header {...props}>Header</header>;

export default Layout;
