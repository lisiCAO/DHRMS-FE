import { useLocalStorage } from  "usehooks-ts";

export const useRecentSearches = () => {
  const [recentSearches, setRecentSearches] = useLocalStorage(
    "recent-searches",
    []
  );

  return {
    recentSearches,
    setRecentSearches,
  };
};