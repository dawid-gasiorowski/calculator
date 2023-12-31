import { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

const PageLayout = ({ children }: Props) => {
  return (
    <div>
      <header>
        {/* <img src={logo} className="App-logo" alt="logo" />
        Offer Calculator */}
      </header>
      <main>{children}</main>
    </div>
  );
};

export default PageLayout;
