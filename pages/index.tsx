import { GetStaticProps } from "next";
import { useState, FC } from "react";
import axios from "axios";

import { Typography, Button, Badge } from "../components";
import Rating from "../components/rating";
import { withLayout } from "../layout";
import {
  BadgeSize,
  BadgeView,
  ButtonView,
  Direction,
  HeaderTag,
  TextView
} from "../utils/enums";
import { MenuItem } from "../utils/types";

type HomeProps = {
  menu: MenuItem[];
  firstCategory: number;
};

const Home: FC<HomeProps> = ({ menu, firstCategory }) => {
  const [rating, setRating] = useState(0);
  const onRatingChange = (rating: number) => {
    setRating(rating);
  };

  return (
    <div style={{ background: "white" }}>
      <Typography.Header tag={HeaderTag.h1}>Hello world</Typography.Header>

      <Typography.Text view={TextView.large}>Hello world</Typography.Text>
      <Typography.Text view={TextView.middle}>Hello world</Typography.Text>
      <Typography.Text view={TextView.small}>Hello world</Typography.Text>

      <Button
        view={ButtonView.primary}
        withArrow
        arrowDirection={Direction.left}
      >
        Узнать подробнее
      </Button>
      <Button view={ButtonView.ghost}>Hello world</Button>

      <Badge view={BadgeView.red} size={BadgeSize.middle}>
        10000
      </Badge>

      <Rating rating={rating} isEditable onChangeRating={onRatingChange} />
    </div>
  );
};

export default withLayout(Home);

export const getStaticProps: GetStaticProps<HomeProps> = async () => {
  const firstCategory = 0;
  const { data: menu } = await axios.post<MenuItem[]>(
    `${process.env.NEXT_PUBLIC_DOMAIN}/api/top-page/find`,
    { firstCategory }
  );

  return {
    props: {
      menu,
      firstCategory
    }
  };
};
