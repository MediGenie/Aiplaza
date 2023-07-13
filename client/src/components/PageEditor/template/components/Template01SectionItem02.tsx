import { FC, useMemo } from 'react';
import {
  PageImageColumn,
  PageSentenceColumn,
  PageTextColumn,
} from '../../../../types/page-column.type';
import { usePageDispatch } from '../../usePageDispatch';
import { usePageValue } from '../../usePageValue';
import { Template01ItemCard } from './Template01ItemCard';

interface Template01SectionItem02Props {
  readonly?: boolean;
}

export const Template01SectionItem02: FC<Template01SectionItem02Props> = ({
  readonly,
}) => {
  const page = usePageValue();
  const { getColumn, selectSection } = usePageDispatch();
  const thumbnail = useMemo(() => {
    return (getColumn('ITEM_02', 'IMAGE') as PageImageColumn) || {};
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page.data]);

  const title = useMemo(() => {
    return (getColumn('ITEM_02', 'TITLE') as PageSentenceColumn) || {};
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page.data]);

  const subSentence = useMemo(() => {
    return (getColumn('ITEM_02', 'SUB_SENTENCE') as PageTextColumn) || {};
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page.data]);

  const handleSelect = () => {
    if (readonly === true) return;
    selectSection('ITEM_02');
  };

  return (
    <button
      type="button"
      onClick={handleSelect}
      className="text-start"
      disabled={readonly}
    >
      <Template01ItemCard
        content={subSentence.content}
        contentColor={subSentence.color}
        image={thumbnail.image?.url}
        title={title.content}
        titleColor={title.color}
      />
    </button>
  );
};
