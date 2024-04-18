// src/contexts/LanguageContext.js
import { createContext, useContext, useState } from 'react';

const LanguageContext = createContext();

export function useLanguage() {
  return useContext(LanguageContext);
}

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState('en');  

  const toggleLanguage = () => {
    setLanguage((current) => (current === 'en' ? 'fr' : 'en'));
  };

  return (
    <LanguageContext.Provider value={{ language, toggleLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};
