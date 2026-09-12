let visited = false;

export const markVisited = () => {
  visited = true;
};

export const hasVisited = () => typeof window !== "undefined" && visited;
