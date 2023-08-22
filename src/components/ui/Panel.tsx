import { ReactNode } from "react";

interface Props {
  header: string;
  children: ReactNode;
}

const Panel = ({ header, children }: Props) => {
  return (
    <div className="panel">
      <h1 className="panel-heading mb-5 has-text-centered">{header}</h1>
      <section className="container">{children}</section>
    </div>
  );
};

export default Panel;
