import { useState } from "react";

export function usePassos(total: number, start = 0) {
  const [idx, setIdx] = useState(start);
  const canPrev = idx > 0;
  const canNext = idx < total - 1;

  function prev() { if (canPrev) setIdx(i => i - 1); }
  function next() { if (canNext) setIdx(i => i + 1); }
  function go(i: number) { if (i >= 0 && i < total) setIdx(i); }

  return { idx, canPrev, canNext, prev, next, go };
}