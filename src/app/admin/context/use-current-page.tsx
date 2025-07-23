"use client";

import { createContext, useContext } from "react";


type CurrentPageContextType = {
    currentPage: string;
    setCurrentPage: (page: string) => void;
};

const CurrentPageContext = createContext<CurrentPageContextType | null>(null);

export const useCurrentPage = () => {
    const ctx = useContext(CurrentPageContext);
    if (!ctx) {
        throw new Error("useCurrentPage must be used within a CurrentPageProvider");
    }
    return ctx;
};

export { CurrentPageContext }