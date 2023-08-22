import { ReactNode } from "react";

interface Props {
  firstPanel?: ReactNode;
  secondPanel?: ReactNode;
}

const TwoColumnLayout = ({ firstPanel, secondPanel }: Props) => {
  return (
    <div className="columns">
      {firstPanel && <div className="column is-half">{firstPanel}</div>}
      {secondPanel && <div className="column is-half">{secondPanel}</div>}
    </div>
  );
};

export default TwoColumnLayout;
