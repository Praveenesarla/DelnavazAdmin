/* eslint-disable prettier/prettier */
import * as React from 'react';
import {createContext, PropsWithChildren, useContext, useState} from 'react';

type AuthContext = {
  authenticated: boolean;
  setAuthenticated: (newOption: boolean) => void;
};

const QuizContext = createContext<AuthContext>({
  authenticated: false,
  setAuthenticated: () => {},
});

export default function AuthProvider({children}: PropsWithChildren) {
  const [authenticated, setAuthenticated] = useState<boolean>(false);
  return (
    <QuizContext.Provider value={{authenticated, setAuthenticated}}>
      {children}
    </QuizContext.Provider>
  );
}

export const useAuthContext = () => useContext(QuizContext);
