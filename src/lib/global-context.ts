import { createContext, useContext } from 'react';

const GlobalContext = createContext(null);

function useGlobalContext() {
  const context = useContext(GlobalContext);
  if (context) return context;
  return {
    siteSettings: {},
    siteNavigation: [],
  };
}

export { GlobalContext, useGlobalContext };
