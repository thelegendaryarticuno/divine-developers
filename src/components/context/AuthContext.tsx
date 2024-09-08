// context/AuthContext.tsx
import React, { createContext, useReducer, useContext } from "react";

interface User {
  name: string;
  avatar?: string;
  email: string;
}

interface AuthState {
  user: User | null;
}

interface AuthAction {
  type: string;
  payload?: User | null;
}

const initialState: AuthState = {
  user: null,
};

// Reducer function to manage user state
const authReducer = (state: AuthState, action: AuthAction): AuthState => {
  switch (action.type) {
    case "LOGIN":
      return { user: action.payload || null };
    case "LOGOUT":
      return { user: null };
    default:
      return state;
  }
};

const AuthContext = createContext<{
  state: AuthState;
  dispatch: React.Dispatch<AuthAction>;
}>({
  state: initialState,
  dispatch: () => null,
});

// Provide Auth Context to the app
export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  return (
    <AuthContext.Provider value={{ state, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use the auth context
export const useAuth = () => useContext(AuthContext);
