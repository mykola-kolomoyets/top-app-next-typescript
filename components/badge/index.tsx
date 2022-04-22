import classnames from "classnames";
import { FC, Fragment } from "react";

import { BadgeSize, BadgeView } from "../../utils/enums";
import { Detailed, WithChildren } from "../../utils/types";

import styles from "./badge.module.css";

interface BadgeProps extends Detailed<HTMLDivElement> {
  view: BadgeView;
  size: BadgeSize;
  color?: string;
  href?: string;
}

const Badge: FC<WithChildren<BadgeProps>> = ({
  children,
  view,
  size,
  color,
  href,
  className,
  ...props
}) => {
  const badgeClassNames = classnames(
    styles.badge,
    styles[`badge__${size}`],
    styles[`badge__${view}`],
    { [styles[`badge__with-link`]]: Boolean(href) }
  );

  return (
    <div className={badgeClassNames} {...props}>
      {Boolean(href) ? <a href={href}>{children}</a> : children}
    </div>
  );
};

export default Badge;
