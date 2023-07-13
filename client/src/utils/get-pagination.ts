export function getPagination({
  currentPage,
  pageSize,
  totalNumber,
}: {
  totalNumber: number;
  pageSize: number;
  currentPage: number;
}) {
  const PAGE_BLOCK = 10;

  if (totalNumber === 0) {
    return { pagination: [] };
  }

  const totalPages = Math.ceil(totalNumber / pageSize);
  if (totalPages === 0)
    return {
      pagination: [],
    };
  if (currentPage === 0)
    return {
      pagination: [],
    };
  if (currentPage > totalPages)
    return {
      pagination: [],
    };

  const currBlk = Math.ceil(currentPage / PAGE_BLOCK) - 1;
  const lastBlk = Math.ceil(totalPages / PAGE_BLOCK) - 1;
  const startNum = currBlk * PAGE_BLOCK + 1;
  let lastNum = currBlk * PAGE_BLOCK + PAGE_BLOCK;
  if (lastNum > totalPages) lastNum = totalPages;
  const count = lastNum - (startNum - 1);
  const pagination = Array(count)
    .join('0')
    .split('0')
    .map((v, i) => i + startNum);

  return {
    pagination,
    nextBlockStartPage: currBlk < lastBlk,
    prevBlockEndPage: currBlk !== 0,
    isLeftActive: currentPage > 1,
    isRightActive: currentPage < totalPages,
  };
}
