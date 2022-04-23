import { FC, Fragment } from "react";
import Link from "next/link";
import classnames from "classnames";

import AppContext from "../../../store/contexts/app-context";

import { TopLevelCategory } from "../../../utils/enums";
import { capitalize } from "../../../utils/fn";
import { FirstLevelMenuItem, MenuItem, PageItem } from "../../../utils/types";

import BooksIcon from "./assets/books";
import CoursesIcon from "./assets/courses";
import ProductIcon from "./assets/product";
import ServicesIcon from "./assets/services";

import styles from "./menu.module.css";
import { useRouter } from "next/router";

const firstLevelRoutes: FirstLevelMenuItem["route"][] = [
  "courses",
  "services",
  "books",
  "products"
];

const firstLevelNames: FirstLevelMenuItem["name"][] = [
  "Курсы",
  "Сервисы",
  "Книги",
  "Продукты"
];

const firstLevelIcons: FirstLevelMenuItem["icon"][] = [
  <CoursesIcon />,
  <ServicesIcon />,
  <BooksIcon />,
  <ProductIcon />
];

const firstLevelMenu: FirstLevelMenuItem[] = firstLevelRoutes.map(
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

const FirstLevelMenu: FC<{
  firstCategory: TopLevelCategory;
  menu: MenuItem[];
}> = ({ firstCategory, menu }) => {
  const { setData } = AppContext.useContext();

  const menuClasses = (id: TopLevelCategory) =>
    classnames(styles.firstLevel, {
      [styles.firstLevelActive]: id === firstCategory
    });

  const onSecondLevelOpen = (category: string) => {
    const newMenu = menu.map((item) => ({
      ...item,
      isOpened:
        item._id.secondCategory === category ? !item.isOpened : item.isOpened
    }));

    setData({ menu: newMenu });
  };

  const isActive = (id: TopLevelCategory) => {
    return id === firstCategory;
  };

  return (
    <Fragment>
      {firstLevelMenu.map((item) => (
        <div key={item.route}>
          <Link href={`/${item.route}`}>
            <a>
              <span className={menuClasses(item.id)}>
                {item.icon}

                <span>{item.name}</span>
              </span>
            </a>
          </Link>

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

const SecondLevelMenu: FC<{
  menu: MenuItem[];
  route: string;
  onOpen: (category: string) => void;
}> = ({ menu, route, onOpen }) => {
  const thirdLevelClasses = (isOpened: boolean) =>
    classnames(styles.secondLevelBlock, {
      [styles.secondLevelBlockOpen]: isOpened
    });

  const router = useRouter();

  return (
    <div className={styles.secondBlock}>
      {menu.map((item) => {
        if (
          item.pages
            .map((page) => page.alias)
            .includes(router.asPath.split("/")[2])
        )
          item.isOpened = true;

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

const ThirdLevelMenu: FC<{ pages: PageItem[]; route: string }> = ({
  pages,
  route
}) => {
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
