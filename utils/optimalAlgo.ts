export type OptimalStep = {
  step: number;
  page: number;
  frame: (number | null)[];
  status: "Hit" | "Miss";
};

export type OptimalResult = {
  steps: OptimalStep[];
  pageHits: number;
  pageMisses: number;
  hitRatio: number;
};

export function runOptimalAlgorithm(pages: number[], frameSize: number): OptimalResult {
  const frame: (number | null)[] = new Array(frameSize).fill(null);
  const n = pages.length;
  const s = new Set<number>();
  const result: OptimalStep[] = [];

  let pageHits = 0;
  let pageFaults = 0;

  // Predicts which page to replace (used farthest in future or not at all)
  const predict = (
    pages: number[],
    frame: (number | null)[],
    index: number
  ): number => {
    let farthest = -1;
    let replaceIndex = -1;

    for (let i = 0; i < frame.length; i++) {
      let found = false;
      for (let j = index; j < pages.length; j++) {
        if (frame[i] === pages[j]) {
          if (j > farthest) {
            farthest = j;
            replaceIndex = i;
          }
          found = true;
          break;
        }
      }
      if (!found) return i; // If not found again, replace this
    }

    return replaceIndex === -1 ? 0 : replaceIndex;
  };

  for (let i = 0; i < n; i++) {
    const currentPage = pages[i];
    let status: "Hit" | "Miss";

    if (s.has(currentPage)) {
      status = "Hit";
      pageHits++;
    } else {
      status = "Miss";
      pageFaults++;

      if (s.size >= frameSize) {
        const replaceIndex = predict(pages, frame, i + 1);
        s.delete(frame[replaceIndex]!);
        frame[replaceIndex] = currentPage;
      } else {
        const emptyIndex = frame.indexOf(null);
        if (emptyIndex !== -1) {
          frame[emptyIndex] = currentPage;
        }
      }

      s.add(currentPage);
    }

    result.push({
      step: i + 1,
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
