import React, { createContext, useState, useEffect } from 'react';
import { translations } from '../constants/translations';

// TODO: FALTA Optimizar para cambio de idioma

const LanguageContext = createContext({
  language: 'es',
  setLanguage: (lng: string) => { console.log(lng) },
  t: {},
});
export const LanguageProvider = ({ children }: { children: React.ReactNode }) => {
  const [language, setLanguage] = useState(() => {
    try {
      const saved = localStorage.getItem('service-language');
      return saved || 'es';
    } catch (error) {
      console.log(error);// Log the error
      return 'es';
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('service-language', language);
    } catch (error) {
      console.error("Failed to save language to localStorage", error);
    }
  }, [language]);

  const t = translations[language as keyof typeof translations] || translations.es;


  // const getWord = (key, subKey) => t[key][subKey]

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

// export const useLanguage = () => {
//   const context = useContext(LanguageContext);
//   if (context === undefined) {
//     throw new Error('useLanguage must be used within a LanguageProvider');
//   }
//   return context;
// }