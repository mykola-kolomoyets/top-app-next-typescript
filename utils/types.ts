import React, { DetailedHTMLProps, HTMLAttributes, ReactChild } from "react";

export type WithChildren<T = {}> = T & { children?: ReactChild };

export type Detailed<T> = DetailedHTMLProps<HTMLAttributes<T>, T>;

export type Svg = React.FunctionComponent<React.SVGAttributes<SVGAElement>>;