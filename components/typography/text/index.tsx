import { FC } from "react";
import classnames from "classnames";

import { Detailed, WithChildren } from "../../../utils/types";

import styles from "./text.module.css";
import { TextView } from "../../../utils/enums";

interface TypographyTextProps extends Detailed<HTMLParagraphElement> {
  view: TextView;
  wrapperClassName?: string;
  isBold?: boolean;
}

const Text: FC<WithChildren<TypographyTextProps>> = ({
  view,
  wrapperClassName,
  children,
  isBold,
  ...props
}) => {
  const classNames = classnames(
    styles.paragraph,
    styles[`paragraph__${view}`],
    wrapperClassName,
    { [styles["paragraph__bold"]]: isBold }
  );

  return (
    <p className={classNames} {...props}>
      {children}
    </p>
  );
};

export default Text;
