type Step = {
  page: number;
  frame: (number | null)[];
  status: "Hit" | "Miss";
};

export type LruResult = {
  pageHits: number;
  pageMisses: number;
  hitRatio: number;
  steps: Step[];
};

export function runLruAlgorithm(pages: number[], frameSize: number): LruResult {
  const n = pages.length;
  let frame: (number | null)[] = new Array(frameSize).fill(null);
  let pageMap: Map<number, number> = new Map(); // Page access history

  let pageFaults = 0;
  let pageHits = 0;

  const result: Step[] = [];

  for (let i = 0; i < n; i++) {
    const currentPage = pages[i];
    let status: "Hit" | "Miss";

    if (pageMap.has(currentPage)) {
      status = "Hit";
      pageHits++;
    } else {
      status = "Miss";
      pageFaults++;

      if (pageMap.size >= frameSize) {
        // Remove least recently used
        const lruPage = [...pageMap.entries()].reduce((a, b) => (a[1] < b[1] ? a : b))[0];
        pageMap.delete(lruPage);

        const lruIndex = frame.indexOf(lruPage);
        if (lruIndex !== -1) {
          frame[lruIndex] = currentPage;
        }
      } else {
        const emptyIndex = frame.indexOf(null);
        if (emptyIndex !== -1) {
          frame[emptyIndex] = currentPage;
        }
      }
    }

    // Update access time
    pageMap.set(currentPage, i);

    result.push({
      page: currentPage,
      frame: [...frame],
      status,
    });
  }

  return {
    steps: result,
    pageHits,
    pageMisses: pageFaults,
    hitRatio: (pageHits / n) * 100,
  };
}
