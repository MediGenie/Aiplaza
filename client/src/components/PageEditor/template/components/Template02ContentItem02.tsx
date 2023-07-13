import { FC, useMemo } from "react";
import {
  PageImageColumn,
  PageSentenceColumn,
  PageTextColumn,
} from "../../../../types/page-column.type";
import { usePageDispatch } from "../../usePageDispatch";
import { usePageValue } from "../../usePageValue";
import { Template02ItemCard } from "./Template02ItemCard";

interface Template02ContentItem02Props {
  readonly?: boolean;
}

export const Template02ContentItem02: FC<Template02ContentItem02Props> = ({
  readonly,
}) => {
  const page = usePageValue();
  const { getColumn, selectSection } = usePageDispatch();
  const thumbnail = useMemo(() => {
    return (getColumn("ITEM_02", "IMAGE") as PageImageColumn) || {};
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page.data]);

  const handleSelect = () => {
    if (readonly === true) return;
    selectSection("ITEM_02");
  };

  return (
    <button
      type="button"
      onClick={handleSelect}
      className="text-start"
      disabled={readonly}
    >
      <Template02ItemCard image={thumbnail.image?.url} />
    </button>
  );
};
