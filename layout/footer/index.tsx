import classnames from "classnames";
import { FC, Fragment } from "react";
import { format } from "date-fns";

import { Detailed } from "../../utils/types";

import styles from "./footer.module.css";

interface FooterProps extends Detailed<HTMLDivElement> {}

const Layout: FC<FooterProps> = ({ className, ...props }) => (
  <footer className={classnames(className, styles.footer)} {...props}>
    <section>
      Owl &copy; 2022 - {format(new Date(), "yyyy")} All rights reserved.
    </section>

    <a href="#" target="_blank">
      Rights
    </a>
    <a href="#" target="_blank">
      Rules
    </a>
  </footer>
);

export default Layout;
