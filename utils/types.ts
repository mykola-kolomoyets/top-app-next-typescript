import React, { DetailedHTMLProps, HTMLAttributes, ReactChild, ReactNode } from "react";
import { TopLevelCategory } from "./enums";

export type WithChildren<T = {}> = T & { children?: ReactChild | ReactNode[] };

export type Detailed<T> = DetailedHTMLProps<HTMLAttributes<T>, T>;

export type Svg = React.FunctionComponent<React.SVGAttributes<SVGAElement>>;

export type NameValue = {
  name: string;
  value: string;
}

export type Id = {
  secondCategory: string;
}

export type PageItem = {
  alias: string;
  title: string;
  _id: string;
  category: string;
}

export type MenuItem = {
  _id: Id;
  isOpened?: boolean;
  pages: PageItem[]
}

export type FirstLevelMenuItem = {
  route: string;
  name: string;
  icon: JSX.Element;
  id: TopLevelCategory;
}

export type TopPageAdvantage = {
  _id: string;
  title: string;
  description: string;
}

export type HeadHunterData = {
  _id: string;
  count: number;
  juniorSalary: number;
  middleSalary: number;
  seniorSalary: number;
  updatedAt: Date;
}

export type TopPageModel = {
  tags: string[];
  _id: string;
  secondCategory: string;
  alias: string;
  title: string;
  category: string;
  seoText: string;
  tagsTitle: string;
  metaTitle: string;
  metaDescription: string;
  firstCategory: TopLevelCategory;
  advantages: TopPageAdvantage[];
  createdAt: Date;
  updatedAt: Date;
  hh: HeadHunterData;
}

export interface ProductCharacteristic extends NameValue { }

export type ReviewModel = {
  name: string;
  _id: string;
  title: string;
  description: string;
  rating: number;
  createdAt: Date;
}

export type ProductModel = {
  _id: string;
  category: string[];
  tags: string[];
  title: string;
  link: string;
  price: number;
  credit: number;
  oldPrice: number;
  description: string;
  characteristics: ProductCharacteristic[];
  createdAt: Date;
  updatedAt: Date;
  image: string;
  initialRating: number;
  reviews: ReviewModel[];
  reviewCount: number;
  reviewAvg?: number;
  advantages: string;
}