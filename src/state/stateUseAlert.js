import { create } from 'zustand'
// type 'errorUser'|'error'|'success'|'info'|'infoMiui';
const stateUseAlert = create((set) => ({
  isOpen: false,
  type: 'error',
  autoClose: true,
  open: (typeName ='error', autoClose = true ) => set({ 
    isOpen: true, 
    type: typeName, 
    autoClose: autoClose,
  }),
  close: () => set({ 
    isOpen: false, 
    type:'error', 
    autoClose: true,
  }),
}))

export default stateUseAlert