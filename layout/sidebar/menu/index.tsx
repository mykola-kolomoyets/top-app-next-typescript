import { FC, Fragment } from "react";
import Link from "next/link";
import classnames from "classnames";

import AppContext from "../../../store/contexts/app-context";

import { TopLevelCategory } from "../../../utils/enums";
import { capitalize } from "../../../utils/fn";
import { FirstLevelMenuItem, MenuItem, PageItem } from "../../../utils/types";

import styles from "./menu.module.css";
import { useRouter } from "next/router";
import {
  firstLevelRoutes,
  firstLevelNames,
  firstLevelIcons
} from "./menu.constants";

export const firstLevelMenu: FirstLevelMenuItem[] = firstLevelRoutes.map(
  (route, index) => ({
    route,
    name: firstLevelNames[index],
    icon: firstLevelIcons[index],
    id: TopLevelCategory[capitalize(route)]
  })
);

const Menu: FC = () => {
  const { data } = AppContext.useContext();

  return (
    <div className={styles.menu}>
      <FirstLevelMenu {...data} />
    </div>
  );
};

type FirstLevelMenuProps = {
  firstCategory: TopLevelCategory;
  menu: MenuItem[];
};
const FirstLevelMenu: FC<FirstLevelMenuProps> = ({ firstCategory, menu }) => {
  const { setData } = AppContext.useContext();

  const menuClasses = (id: TopLevelCategory) =>
    classnames(styles.firstLevel, {
      [styles.firstLevelActive]: id === firstCategory
    });

  const onSecondLevelOpen = (category: string) => {
    const newMenu = menu.map((item) => {
      item.isOpened =
        item._id.secondCategory === category ? !item.isOpened : item.isOpened;
      return item;
    });

    setData({ menu: newMenu });
  };

  const isActive = (id: TopLevelCategory) => id === firstCategory;

  return (
    <Fragment>
      {firstLevelMenu.map((item) => (
        <div key={item.route}>
          <div onClick={() => setData({ firstCategory: item.id })}>
            <span className={menuClasses(item.id)}>
              {item.icon}

              <span>{item.name}</span>
            </span>
          </div>

          {isActive(item.id) && (
            <SecondLevelMenu
              menu={menu}
              route={item.route}
              onOpen={onSecondLevelOpen}
            />
          )}
        </div>
      ))}
    </Fragment>
  );
};

type SecondLevelMenuProps = {
  menu: MenuItem[];
  route: string;
  onOpen: (category: string) => void;
};
const SecondLevelMenu: FC<SecondLevelMenuProps> = ({ menu, route, onOpen }) => {
  const thirdLevelClasses = (isOpened: boolean) =>
    classnames(styles.secondLevelBlock, {
      [styles.secondLevelBlockOpen]: isOpened
    });

  const router = useRouter();

  return (
    <div className={styles.secondBlock}>
      {menu.map((item) => {
        const isOpened =
          item.pages
            .map((page) => page.alias)
            .includes(router.asPath.split("/")[2]) || item.isOpened;

        item.isOpened = isOpened;

        return (
          <div key={item._id.secondCategory}>
            <div
              className={styles.secondLevel}
              onClick={() => onOpen(item._id.secondCategory)}
            >
              {item._id.secondCategory}
            </div>

            {item.isOpened && (
              <div className={thirdLevelClasses(item.isOpened)}>
                <ThirdLevelMenu pages={item.pages} route={route} />
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

type ThirdLevelMenuProps = { pages: PageItem[]; route: string };
const ThirdLevelMenu: FC<ThirdLevelMenuProps> = ({ pages, route }) => {
  const router = useRouter();

  const pageItemClasses = (isOpened: boolean) =>
    classnames(styles.thirdLevel, {
      [styles.thirdLevelActive]: isOpened
    });

  return (
    <Fragment>
      {pages.map((page) => (
        <Link href={`/${route}/${page.alias}`}>
          <a
            className={pageItemClasses(
              `/${route}/${page.alias}` === router.asPath
            )}
          >
            {page.category}
          </a>
        </Link>
      ))}
    </Fragment>
  );
};

export default Menu;
