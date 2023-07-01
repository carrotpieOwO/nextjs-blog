import { create } from "zustand";

interface Nav {
    nav: boolean;
    setNav: (nav: boolean) => void;
    openSearch: boolean;
    setOpenSearch: ( openSearch: boolean ) => void
}
  
  const useNavStore = create<Nav>((set) => ({
    nav: false,
    setNav: (bool) => {
      set((state) => ({ nav: bool }));
    },
    openSearch: false,
    setOpenSearch: (bool) => {
      set((state) => ({ openSearch: bool }))
    } ,
  }));
  
  export default useNavStore;