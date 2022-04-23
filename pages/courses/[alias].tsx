import { GetStaticPaths, GetStaticProps, GetStaticPropsContext } from "next";
import { useState, FC } from "react";
import axios from "axios";

import { withLayout } from "../../layout";
import { MenuItem, ProductModel, TopPageModel } from "../../utils/types";
import { ParsedUrlQuery } from "querystring";

type CourseProps = {
  menu: MenuItem[];
  firstCategory: number;
  page: TopPageModel;
  products: ProductModel[];
};

const firstCategory = 0;

const Courses: FC<CourseProps> = ({ menu, page, products }) => {
  return (
    <div style={{ background: "white" }}>{products && products.length}</div>
  );
};

export default withLayout(Courses);

export const getStaticPaths: GetStaticPaths = async () => {
  const { data: menu } = await axios.post<MenuItem[]>(
    `${process.env.NEXT_PUBLIC_DOMAIN}/api/top-page/find`,
    { firstCategory }
  );

  return {
    paths: menu.flatMap((item) =>
      item.pages.map((page) => `/courses/${page.alias}`)
    ),
    fallback: true
  };
};

export const getStaticProps: GetStaticProps<CourseProps> = async ({
  params,
  params: { alias }
}: GetStaticPropsContext<ParsedUrlQuery>) => {
  if (!params) {
    return {
      notFound: true
    };
  }

  const { data: menu } = await axios.post<MenuItem[]>(
    `${process.env.NEXT_PUBLIC_DOMAIN}/api/top-page/find`,
    { firstCategory }
  );

  const { data: page } = await axios.get<TopPageModel>(
    `${process.env.NEXT_PUBLIC_DOMAIN}/api/top-page/byAlias/${alias}`
  );

  const { data: products } = await axios.post<ProductModel[]>(
    `${process.env.NEXT_PUBLIC_DOMAIN}/api/product/find`,
    {
      category: page.category,
      limit: 10
    }
  );

  return {
    props: {
      menu,
      firstCategory,
      page,
      products
    }
  };
};
