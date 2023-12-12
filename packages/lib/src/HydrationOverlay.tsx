import React, { type PropsWithChildren } from "react";
import { Overlay } from "./Overlay";

export function HydrationChecker(props: PropsWithChildren) {
  return (
    <>
      {props.children}
      <Overlay />
    </>
  );
}
