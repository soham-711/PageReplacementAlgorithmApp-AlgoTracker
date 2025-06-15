export type FifoStep = {
  page: number;
  frame: (number | string)[];
  status: "Hit" | "Miss";
};

export type FifoResult = {
  steps: FifoStep[];
  pageHits: number;
  pageMisses: number;
  hitRatio: number;
};

export const runFifoAlgorithm = (pages: number[], frameSize: number): FifoResult => {
  const steps: FifoStep[] = [];
  const memory: Set<number> = new Set();
  const queue: number[] = [];

  let pageHits = 0;
  let pageMisses = 0;

  pages.forEach((page) => {
    let status: "Hit" | "Miss";

    if (memory.has(page)) {
      status = "Hit";
      pageHits++;
    } else {
      status = "Miss";
      pageMisses++;

      if (memory.size >= frameSize) {
        const oldest = queue.shift();
        if (oldest !== undefined) memory.delete(oldest);
      }

      memory.add(page);
      queue.push(page);
    }

    const frameState: (number | string)[] = new Array(frameSize).fill("");
    queue.forEach((val, index) => {
      frameState[index] = val;
    });

    steps.push({ page, frame: frameState, status });
  });

  return {
    steps,
    pageHits,
    pageMisses,
    hitRatio: pages.length ? (pageHits / pages.length) * 100 : 0,
  };
};
