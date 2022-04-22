import { FC } from "react";
import classnames from "classnames";

import { ButtonView, Direction } from "../../utils/enums";
import { Detailed, WithChildren } from "../../utils/types";

import styles from "./button.module.css";

import ArrowIcon from "./assets/arrow.svg";

interface ButtonProps extends Detailed<HTMLButtonElement> {
  view: ButtonView;
  withArrow?: boolean;
  arrowDirection?: Direction;
}

const Button: FC<WithChildren<ButtonProps>> = ({
  view,
  children,
  className,
  withArrow,
  arrowDirection = Direction.right,
  ...props
}) => {
  const wrapperClassNames = classnames(
    className,
    styles.button,
    styles[`button__${view}`]
  );

  const arrowClassNames = withArrow
    ? classnames(styles.arrow, styles[`arrow__${arrowDirection}`])
    : "";

  return (
    <button className={wrapperClassNames} {...props}>
      {children}

      {withArrow && (
        <span className={arrowClassNames}>
          <ArrowIcon />
        </span>
      )}
    </button>
  );
};

export default Button;
