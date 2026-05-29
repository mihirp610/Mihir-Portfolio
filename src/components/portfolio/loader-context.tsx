import { createContext, useContext, useState, type ReactNode } from "react";

type Ctx = { ready: boolean; setReady: (v: boolean) => void };
const LoaderCtx = createContext<Ctx>({ ready: false, setReady: () => {} });

export function LoaderProvider({ children }: { children: ReactNode }) {
  const [ready, setReady] = useState(false);
  return <LoaderCtx.Provider value={{ ready, setReady }}>{children}</LoaderCtx.Provider>;
}

export const useLoader = () => useContext(LoaderCtx);
