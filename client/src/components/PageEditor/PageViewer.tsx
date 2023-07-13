import { FC } from 'react';
import { PageSectionType } from '../../types/page-section.type';
import { templateIdEnum } from './enum/template-id';
import { PageDispatchContext, PageValueContext } from './page-context';
import { PageView } from './PageView';
import './style.css';

interface PageViewerProps {
  templateId: templateIdEnum;
  value: PageSectionType[];
}

export const PageViewer: FC<PageViewerProps> = ({ value, templateId }) => {
  const getColumn = (section_key: string, name_key: string) => {
    const section = value.find((v) => v.key === section_key);
    if (!section) {
      return null;
    }
    const column = section.columns.find((v) => v.key === name_key);
    return column || null;
  };

  return (
    <PageValueContext.Provider
      value={{ data: value, template: templateId, select_column: null }}
    >
      <PageDispatchContext.Provider
        value={{
          changeTemplate: () => {},
          getColumn,
          updateColumn: () => {},
          selectSection: () => {},
          getSection: () => {
            return null;
          },
        }}
      >
        <PageView readonly />
      </PageDispatchContext.Provider>
    </PageValueContext.Provider>
  );
};
