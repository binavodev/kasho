"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";

type WaitlistContextValue = {
  open: boolean;
  openWaitlist: () => void;
  setOpen: (open: boolean) => void;
};

const WaitlistContext = createContext<WaitlistContextValue | null>(null);

export function WaitlistProvider({
  children,
}: Readonly<{
  children: React.ReactNode;
}>): React.ReactElement {
  const [open, setOpen] = useState(false);
  const openWaitlist = useCallback(() => {
    setOpen(true);
  }, []);

  const value = useMemo(
    () => ({
      open,
      openWaitlist,
      setOpen,
    }),
    [open, openWaitlist],
  );

  return (
    <WaitlistContext.Provider value={value}>{children}</WaitlistContext.Provider>
  );
}

export function useWaitlist(): WaitlistContextValue {
  const context = useContext(WaitlistContext);
  if (!context) {
    throw new Error("useWaitlist must be used within WaitlistProvider");
  }
  return context;
}
