import React, { DetailedHTMLProps, HTMLAttributes, ReactChild, ReactNode } from "react";

export type WithChildren<T = {}> = T & { children?: ReactChild | ReactNode[] };

export type Detailed<T> = DetailedHTMLProps<HTMLAttributes<T>, T>;

export type Svg = React.FunctionComponent<React.SVGAttributes<SVGAElement>>;