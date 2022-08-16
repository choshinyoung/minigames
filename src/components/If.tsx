import React from "react";

type IfProps = {
  condition: boolean;
  children: React.ReactNode;
};

export default function If({condition, children}: IfProps) {
  if (Array.isArray(children)) {
    if (condition) {
      return <>{children[0]}</>;
    } else {
      return <>{children[1]}</>;
    }
  } else if (condition) {
    return <>{children}</>;
  }

  return <></>;
}
