import { FC, useCallback, useState } from 'react';
import { PageEditor } from '../components/PageEditor';
import { templateIdEnum } from '../components/PageEditor/enum/template-id';
import { template01DefaultValue } from '../lib/template-1-default-value';
import { template02DefaultValue } from '../lib/template-2-default-value';
import { template03DefaultValue } from '../lib/template-3-default-value';
import { PageSectionType } from '../types/page-section.type';

interface PageEditProps {}

export const PageEdit: FC<PageEditProps> = () => {
  const [templateId, setTemplateId] = useState(templateIdEnum.TEMPLATE_1);
  const [state, setState] = useState<PageSectionType[]>(template01DefaultValue);

  const handleTemplate = useCallback((id: templateIdEnum) => {
    setTemplateId(id);
    if (id === templateIdEnum.TEMPLATE_1) {
      setState(template01DefaultValue);
    }
    if (id === templateIdEnum.TEMPLATE_2) {
      setState(template02DefaultValue);
    }
    if (id === templateIdEnum.TEMPLATE_3) {
      setState(template03DefaultValue);
    }
  }, []);
  return (
    <PageEditor
      templateId={templateId}
      value={state}
      onChange={setState}
      onChangeTemplateId={handleTemplate}
    />
  );
};
