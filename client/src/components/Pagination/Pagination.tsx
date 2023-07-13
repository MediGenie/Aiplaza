import classNames from 'classnames';
import { FC, useMemo } from 'react';
import { PaginationLeftArrow } from '../../assets';
import { getPagination } from '../../utils/get-pagination';

interface PaginationProps {
  pageSize: number;
  currentPage: number;
  totalNumber: number;
  onChange?: (next: number) => any;
  containterClassName?: string;
}

const Pagination: FC<PaginationProps> = ({
  currentPage,
  pageSize,
  totalNumber,
  onChange,
  containterClassName,
}) => {
  const pageMetadata = useMemo(() => {
    return getPagination({
      currentPage: currentPage,
      pageSize: pageSize,
      totalNumber: totalNumber,
    });
  }, [currentPage, pageSize, totalNumber]);

  if (pageMetadata.pagination.length === 0) {
    return null;
  }

  return (
    <div
      className={classNames(
        `flex space-x-[5px] items-center justify-center`,
        containterClassName,
      )}
    >
      <button
        className="flex justify-center items-center bg-gray100 w-6 h-6 rounded-[5px]"
        onClick={() => {
          onChange && onChange(currentPage - 1);
        }}
        disabled={!pageMetadata.isLeftActive}
      >
        <img src={PaginationLeftArrow} alt="이전" className="w-4 h-4" />
      </button>

      {pageMetadata.pagination.map((v) => (
        <button
          key={`${v}`}
          disabled={v === currentPage}
          onClick={() => {
            onChange && onChange(v);
          }}
          className="flex justify-center items-center w-6 h-6 rounded-[5px] text-b2 font-medium bg-gray100 disabled:bg-black text-gray400 disabled:text-white"
        >
          {v}
        </button>
      ))}
      <button
        className="flex justify-center items-center bg-gray100 w-6 h-6 rounded-[5px]"
        onClick={() => {
          onChange && onChange(currentPage + 1);
        }}
        disabled={!pageMetadata.isRightActive}
      >
        <img
          src={PaginationLeftArrow}
          alt="다음"
          className="w-4 h-4 rotate-180"
        />
      </button>
    </div>
  );
};

Pagination.defaultProps = {} as Partial<PaginationProps>;

export default Pagination;
