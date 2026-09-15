import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext();
const USERS_KEY = "veloshop-users";
const CURRENT_USER_KEY = "veloshop-current-user";

const readStorage = (key, fallback) => {
  try {
    return JSON.parse(localStorage.getItem(key)) || fallback;
  } catch {
    return fallback;
  }
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => readStorage(CURRENT_USER_KEY, null));

  useEffect(() => {
    if (user) localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(user));
    else localStorage.removeItem(CURRENT_USER_KEY);
  }, [user]);

  const login = (email, password) => {
    const users = readStorage(USERS_KEY, []);
    const account = users.find(
      (candidate) =>
        candidate.email === email.trim().toLowerCase() &&
        candidate.password === password,
    );
    if (!account) return { error: "Email or password is incorrect." };
    const safeUser = { ...account };
    delete safeUser.password;
    setUser(safeUser);
    return { user: safeUser };
  };

  const register = (name, email, password) => {
    const users = readStorage(USERS_KEY, []);
    const normalizedEmail = email.trim().toLowerCase();
    if (users.some((candidate) => candidate.email === normalizedEmail)) {
      return { error: "An account with this email already exists." };
    }
    const account = {
      id: `user-${Date.now()}`,
      name: name.trim(),
      email: normalizedEmail,
      password,
      addresses: [],
    };
    localStorage.setItem(USERS_KEY, JSON.stringify([...users, account]));
    const safeUser = { ...account };
    delete safeUser.password;
    setUser(safeUser);
    return { user: safeUser };
  };

  const updateUser = (changes) => {
    const updatedUser = { ...user, ...changes };
    const users = readStorage(USERS_KEY, []).map((candidate) =>
      candidate.id === updatedUser.id
        ? { ...candidate, ...changes }
        : candidate,
    );
    localStorage.setItem(USERS_KEY, JSON.stringify(users));
    setUser(updatedUser);
  };

  const logout = () => setUser(null);

  return (
    <AuthContext.Provider value={{ user, login, register, updateUser, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
