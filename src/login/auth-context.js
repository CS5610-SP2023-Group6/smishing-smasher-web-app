import { createContext, useContext, useState } from "react";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    const [loggedIn, setLoggedIn] = useState(false);

    const value = {
        loggedIn,
        setLoggedIn,
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
