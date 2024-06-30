export const canDecreasePage = (page: number): boolean => page > 1;
export const canIncreasePage = (page: number, totalPages: number): boolean => page + 1 <= totalPages;