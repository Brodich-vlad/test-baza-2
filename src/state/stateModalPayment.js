// import { create } from 'zustand';

// const stateModalPayment = create((set) => ({
//   isOpen: false,
//   open: () => set({ isOpen: true }),
//   close: () => set({ isOpen: false }),
// }))

// export default stateModalPayment

import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'

const stateModalPayment = create(
  persist(
    (set, get) => ({
      isOpen: false,
      isError:false,
      isThanks:false,
      //fishes: 0,
      //addAFish: () => set({ fishes: get().fishes + 1 }),

      open: () => set({ isOpen: true }),
      close: () => set({ isOpen: false }),
    }),
    {
      name: 'payment-modal-storage', // name of the item in the storage (must be unique)
      storage: createJSONStorage(() => sessionStorage), // (optional) by default, 'localStorage' is used
    },
  ),
)
export default stateModalPayment