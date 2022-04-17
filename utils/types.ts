import { ReactChild } from "react";

export type WithChildren<T = {}> = T & { children?: ReactChild }