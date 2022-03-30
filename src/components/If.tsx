import React from "react";

type IfProps = {
  condition: boolean;
  children: React.ReactNode;
};

export default function If(props: IfProps) {
  if (Array.isArray(props.children)) {
    if (props.condition) {
      return <>{props.children[0]}</>;
    } else {
      return <>{props.children[1]}</>;
    }
  } else if (props.condition) {
    return <>{props.children}</>;
  }

  return <></>;
}
