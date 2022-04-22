import classnames from "classnames";
import { FC, useMemo } from "react";
import { Detailed, Svg } from "../../utils/types";

import Star from "./assets/Star";

import styles from "./rating.module.css";

interface RatingProps extends Detailed<HTMLDivElement> {
  isEditable?: boolean;
  rating: number;
  onChangeRating?: (rating: number) => void;
}

const defaultRatings = new Array(5).fill(0);

const Rating: FC<RatingProps> = ({
  isEditable = false,
  rating,
  onChangeRating,
  ...props
}) => {
  const ratings = useMemo(
    () => defaultRatings.map((_, index) => (index + 1 <= rating ? 1 : 0)),
    [rating]
  );

  const ratingStars = useMemo(
    () =>
      ratings.map((rating, index) => (
        <Star
          key={`${rating}-${index}`}
          className={classnames(styles["star"], {
            [styles["star__filled"]]: rating === 1
          })}
          onClick={isEditable ? () => onChangeRating(index + 1) : null}
        />
      )),
    [rating]
  );

  return <div {...props}>{ratingStars}</div>;
};

export default Rating;
