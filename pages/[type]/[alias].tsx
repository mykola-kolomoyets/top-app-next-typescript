import { GetStaticPaths, GetStaticProps, GetStaticPropsContext } from "next";
import { useState, FC } from "react";
import axios from "axios";

import { withLayout } from "../../layout";
import { MenuItem, ProductModel, TopPageModel } from "../../utils/types";
import { ParsedUrlQuery } from "querystring";
import { firstLevelMenu } from "../../layout/sidebar/menu";
import { TopLevelCategory } from "../../utils/enums";

type CourseProps = {
  menu: MenuItem[];
  firstCategory: TopLevelCategory;
  page: TopPageModel;
  products: ProductModel[];
};

const Courses: FC<CourseProps> = ({ menu, page, products }) => {
  return (
    <div style={{ background: "white" }}>{products && products.length}</div>
  );
};

export default withLayout(Courses);

export const getStaticPaths: GetStaticPaths = async () => {
  let paths: string[] = [];

  for (const menuItem of firstLevelMenu) {
    const { data: menu } = await axios.post<MenuItem[]>(
      `${process.env.NEXT_PUBLIC_DOMAIN}/api/top-page/find`,
      { firstCategory: menuItem.id }
    );

    paths = paths.concat(
      menu.flatMap((item) =>
        item.pages.map((page) => `/${menuItem.route}/${page.alias}`)
      )
    );
  }

  return {
    paths,
    fallback: true
  };
};

export const getStaticProps: GetStaticProps<CourseProps> = async ({
  params,
  params: { alias }
}: GetStaticPropsContext<ParsedUrlQuery>) => {
  if (!params)
    return {
      notFound: true
    };

  const firstCategoryItem = firstLevelMenu.find(
    (menu) => menu.route === params.type
  );

  if (!firstCategoryItem)
    return {
      notFound: true
    };

  const { data: menu } = await axios.post<MenuItem[]>(
    `${process.env.NEXT_PUBLIC_DOMAIN}/api/top-page/find`,
    { firstCategory: firstCategoryItem.id }
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
      firstCategory: firstCategoryItem.id,
      page,
      products
    }
  };
};
