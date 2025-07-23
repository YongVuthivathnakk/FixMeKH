import { atom } from "jotai";
import { Doc } from "../../../../convex/_generated/dataModel";

export const currentUserIdAtom = atom<string | undefined>(undefined);