import { FC } from "react";
import { WithChildren } from "../../utils/types";
import AppContext, { AppStore, initialAppState } from "../contexts/app-context";
import Provider from "./provider";

const AppProvider: FC<WithChildren<{ startState?: AppStore }>> = ({
  children,
  startState
}) => (
  <Provider
    initialState={startState || initialAppState}
    ContextComponent={AppContext}
  >
    {children}
  </Provider>
);

export default AppProvider;
