import { DetailedHTMLProps, FC, HTMLAttributes, ReactNode } from "react";
import { HeaderTag } from "../../../utils/enums";
import { WithChildren } from "../../../utils/types";

import styles from "./header.module.css";

type TypographyHeadingProps = {
  tag: HeaderTag;
} & DetailedHTMLProps<HTMLAttributes<HTMLHeadingElement>, HTMLHeadingElement>;

const Heading: FC<WithChildren<TypographyHeadingProps>> = ({
  tag,
  children
}) => {
  const HeadingTag = tag;

  return <HeadingTag className={styles[tag]}>{children}</HeadingTag>;
};

export default Heading;
