import { atom } from 'jotai'

export const activeNavAtom = atom<string>('hero')
export const isMenuOpenAtom = atom<boolean>(false)
