
import { TopLevelCategory } from "../../utils/enums";
import { MenuItem } from "../../utils/types";
import Context from "./context";

export type AppStore = {
  menu: MenuItem[];
  firstCategory: TopLevelCategory;
};

export const initialAppState: AppStore = {
  menu: [],
  firstCategory: TopLevelCategory.Courses
};

const AppContext = new Context(initialAppState);

export default AppContext;