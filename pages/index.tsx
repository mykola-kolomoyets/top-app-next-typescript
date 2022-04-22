import Head from "next/head";
import Image from "next/image";
import { useState, FC } from "react";

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

const Home: FC = () => {
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
