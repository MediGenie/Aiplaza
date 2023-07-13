import { FC, ReactNode, useState } from 'react';
import { LayoutContext } from './context';
import { Footer } from './Footer';
import { Header } from './Header';

interface LayoutProps {
  children: ReactNode;
}

export const Layout: FC<LayoutProps> = ({ children }) => {
  const [state, setState] = useState(false);
  return (
    <LayoutContext.Provider value={{ setHideFooter: setState }}>
      <div>
        <Header />
        <div className="bg-white pt-15">{children}</div>
        {state === false && <Footer />}
      </div>
    </LayoutContext.Provider>
  );
};
