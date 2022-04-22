import { FC } from "react";
import { HeaderTag } from "../../../utils/enums";
import { Detailed, WithChildren } from "../../../utils/types";

import styles from "./header.module.css";

interface TypographyHeadingProps extends Detailed<HTMLHeadingElement> {
  tag: HeaderTag;
}

const Heading: FC<WithChildren<TypographyHeadingProps>> = ({
  tag,
  children,
  ...props
}) => {
  const HeadingTag = tag;

  return (
    <HeadingTag className={styles[tag]} {...props}>
      {children}
    </HeadingTag>
  );
};

export default Heading;
