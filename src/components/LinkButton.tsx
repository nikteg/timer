import React from "react";
import { Button, ButtonProps } from "grommet";
import { Link, LinkProps } from "react-router-dom";

export const LinkButton: React.FC<Pick<LinkProps, "to"> &
  ButtonProps> = props => {
  return (
    <Button
      as={({
        colorProp,
        hasIcon,
        hasLabel,
        focus,
        colorValue,
        fillContainer,
        focusIndicator,
        pad,
        sizeProp,
        ...rest
      }) => <Link {...rest} />}
      {...props}
    />
  );
};
