import { DetailedHTMLProps, FC, HTMLAttributes } from "react";
import clasnames from "classnames";

import { WithChildren } from "../../../utils/types";

import styles from "./text.module.css";

type TypographyTextProps = {
  wrapperClassName?: string;
} & DetailedHTMLProps<
  HTMLAttributes<HTMLParagraphElement>,
  HTMLParagraphElement
>;

const Text: FC<WithChildren<TypographyTextProps>> = ({ wrapperClassName }) => (
  <p className={clasnames(styles.p, wrapperClassName)}></p>
);

export default Text;
