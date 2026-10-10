import { create } from 'zustand'

type StoreTest = {
    count: number,
    inc: () => void,
    dec: () => void
}

export const useCounterStoreTest = create<StoreTest>((set) => ({
    count: 1,
    inc: () => set((state) => ({ count: state.count + 1 })),
    dec: () => set((state) => ({ count: state.count - 1 }))
}))