import { useContext } from "react";
import { ExpiredModalContext } from "../AuthProvider";

export function useAuthModalContextState() {
  const context = useContext(ExpiredModalContext);
  if (!context) throw new Error("cannot find authContext");
  return context;
}
