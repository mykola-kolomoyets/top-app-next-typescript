import { FC, Fragment, FunctionComponent } from "react";
import { Detailed, WithChildren } from "../utils/types";
import Footer from "./footer";
import Header from "./header";
import Sidebar from "./sidebar";

import styles from "./layout.module.css";

interface LayoutProps extends Detailed<HTMLDivElement> {}

const Layout: FC<WithChildren<LayoutProps>> = ({ children }) => (
  <div className={styles.wrapper}>
    <Header className={styles.header} />

    <Sidebar className={styles.sidebar} />

    <main className={styles.body}>{children}</main>

    <Footer className={styles.footer} />
  </div>
);

export const withLayout = <T extends Record<string, unknown>>(
  Component: FunctionComponent<T>
) => {
  return (props: T) => (
    <Layout>
      <Component {...props} />
    </Layout>
  );
};
