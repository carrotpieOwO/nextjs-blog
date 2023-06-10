import { create } from "zustand";

interface Nav {
    nav: boolean;
    setNav: (nav: boolean) => void;
}
  
  const useNavStore = create<Nav>((set) => ({
    nav: false,
    setNav: (bool) => {
      set((state) => ({ nav: bool }));
    },
  }));
  
  export default useNavStore;