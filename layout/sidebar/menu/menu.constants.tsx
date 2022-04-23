import { FirstLevelMenuItem } from "../../../utils/types";
import BooksIcon from "./assets/books";
import CoursesIcon from "./assets/courses";
import ProductIcon from "./assets/product";
import ServicesIcon from "./assets/services";

export const firstLevelRoutes: FirstLevelMenuItem["route"][] = [
  "courses",
  "services",
  "books",
  "products"
];

export const firstLevelNames: FirstLevelMenuItem["name"][] = [
  "Курсы",
  "Сервисы",
  "Книги",
  "Продукты"
];

export const firstLevelIcons: FirstLevelMenuItem["icon"][] = [
  <CoursesIcon />,
  <ServicesIcon />,
  <BooksIcon />,
  <ProductIcon />
];
