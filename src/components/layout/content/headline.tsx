import { PropsWithChildren } from "react";

export const Headline: React.FC<PropsWithChildren> = ({ children }) => {
  return <h1>{children}</h1>;
};
