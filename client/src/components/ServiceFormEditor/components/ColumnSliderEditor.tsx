import { Menu, Transition } from '@headlessui/react';
import classNames from 'classnames';
import { FC, useState, Fragment } from 'react';
import {
  copy,
  deleteIcon,
  img,
  imgBlue500,
  more,
  tableFieldBlue500,
  tableFieldGray600,
} from '../../../icons';
import { AddImageModal } from '../../../modals/AddImageModal';
import { AddTableModal } from '../../../modals/AddTableModal';
import { InputBox } from '../../InputBox';
import { InputLine } from '../../InputLine';
import { NumberInputBox } from '../../NumberInputBox';
import { useFormDispatchContext } from '../hooks/useFormDispatchContext';
import { ColumnTypeToIconMap } from '../icons';
import { ServiceFormSliderColumn } from '../types';
import { RangePreview } from './RangePreview';
import { Table } from './Table';

interface ColumnSliderEditorProps extends ServiceFormSliderColumn {
  section: number;
  index: number;
  isSelected?: boolean;
}

export const ColumnSliderEditor: FC<ColumnSliderEditorProps> = (props) => {
  const {
    description,
    label,
    type,
    index,
    section,
    image,
    table,
    isSelected,
    fixed_slide,
    max_slide,
    min_slide,
  } = props;
  const [openImageModal, setOpenImageModal] = useState(false);
  const [openTableModal, setOpenTableModal] = useState(false);
  const dispatch = useFormDispatchContext();

  const handleCopy = () => {
    const { index, section, ...rest } = props;
    console.log('copy', rest);
    dispatch.insertColumn(rest, section, index);
  };

  const handleRemove = () => {
    dispatch.removeColumn(section, index);
  };

  const handleChangeLabel = (next: string) => {
    dispatch.updateItem({
      section,
      column: index,
      data: {
        label: next,
      },
    });
  };
  const handleChangeDescription = (next: string) => {
    dispatch.updateItem({
      section,
      column: index,
      data: {
        description: next,
      },
    });
  };
  const handelSelectImage = (file: File & { url: string }) => {
    dispatch.updateItem({
      section,
      column: index,
      data: {
        image: file,
      },
    });
  };
  const handleAddTable = (tableData: any) => {
    dispatch.updateItem({
      section,
      column: index,
      data: {
        table: tableData,
      },
    });
  };
  const handleChangeTable = (
    row_index: number,
    col_index: number,
    text: string
  ) => {
    if (table === null) {
      return;
    }

    const _table = Array.from(table);
    _table[row_index].rows[col_index] = text;

    dispatch.updateItem({
      section,
      column: index,
      data: {
        table: _table,
      },
    });
  };

  const handleMinSlide = (next: number) => {
    let next_min = next;
    let next_max = max_slide;
    if (next_min >= next_max) {
      next_max = next_min + 1;
    }
    dispatch.updateItem({
      section,
      column: index,
      data: {
        min_slide: next_min,
        max_slide: next_max,
      },
    });
  };

  const handleMaxSlide = (next: number) => {
    let next_min = min_slide;
    let next_max = next;
    if (next_min >= next_max) {
      next_min = next_max - 1;
    }
    dispatch.updateItem({
      section,
      column: index,
      data: {
        min_slide: next_min,
        max_slide: next_max,
      },
    });
  };

  return (
    <div
      className={classNames('bg-white rounded', {
        'border-blue500 border-2': isSelected,
        'border border-gray100': !isSelected,
      })}
    >
      <div className="p-10">
        <div className="flex items-center space-x-2.5">
          <div className="bg-gray100 px-2 py-1.5 space-x-0.5 flex items-center rounded">
            <img
              src={ColumnTypeToIconMap[type]}
              alt="제목 아이콘"
              className="w-5 h-5"
            />
            <span className="text-b3 text-gray400 w-5 text-center">
              {index + 1}
            </span>
          </div>
          <InputBox
            className="flex-1"
            placeholder="(필수) 제목을 입력해 주세요."
            value={label}
            onChange={(e) => handleChangeLabel(e.target.value)}
          />
          <div className="flex items-center space-x-2.5 pl-2.5">
            <button className="w-6 h-6" type="button" onClick={handleCopy}>
              <img src={copy} alt="컬럼 복사" className="w-full h-full" />
            </button>
            <button className="w-6 h-6" type="button" onClick={handleRemove}>
              <img src={deleteIcon} alt="컬럼 삭제" className="w-full h-full" />
            </button>
            <Menu as="div" className="relative w-6 h-6">
              <div className="w-6 h-6">
                <Menu.Button className="w-6 h-6">
                  <img src={more} alt="이미지 추가" className="w-full h-full" />
                </Menu.Button>
              </div>
              <Transition
                as={Fragment}
                enter="transition ease-out duration-100"
                enterFrom="transform opacity-0 scale-95"
                enterTo="transform opacity-100 scale-100"
                leave="transition ease-in duration-75"
                leaveFrom="transform opacity-100 scale-100"
                leaveTo="transform opacity-0 scale-95"
              >
                <Menu.Items className="absolute origin-top-right right-2.5 top-3 w-[200px] bg-white rounded-l shadow-1 border border-gray100 rounded-lg overflow-hidden">
                  <Menu.Item>
                    {({ active }) => (
                      <button
                        type="button"
                        className={classNames('block p-5 w-full text-left', {
                          'bg-gray50 text-blue500': active,
                        })}
                        onClick={() => setOpenImageModal(true)}
                      >
                        <div className="flex items-center space-x-2.5">
                          <img
                            src={active ? imgBlue500 : img}
                            alt="이미지"
                            className="w-6 h-6"
                          />
                          <span
                            className={classNames('text-b3', {
                              'text-blue500': active,
                            })}
                          >
                            이미지 삽입
                          </span>
                        </div>
                      </button>
                    )}
                  </Menu.Item>
                  <Menu.Item>
                    {({ active }) => (
                      <button
                        type="button"
                        className={classNames('block p-5 w-full text-left', {
                          'bg-gray50 text-blue500': active,
                        })}
                        onClick={() => setOpenTableModal(true)}
                      >
                        <div className="flex items-center space-x-2.5">
                          <img
                            src={active ? tableFieldBlue500 : tableFieldGray600}
                            alt="테이블"
                            className="w-6 h-6"
                          />
                          <span
                            className={classNames('text-b3', {
                              'text-blue500': active,
                            })}
                          >
                            표 삽입
                          </span>
                        </div>
                      </button>
                    )}
                  </Menu.Item>
                </Menu.Items>
              </Transition>
            </Menu>
          </div>
        </div>
        <InputLine
          placeholder="(선택) 설명을 입력해 주세요."
          className="mt-5 w-full"
          value={description}
          onChange={(e) => handleChangeDescription(e.target.value)}
        />
        {image && (
          <img
            src={image.url}
            alt="이미지"
            className="w-full object-cover mt-5"
          />
        )}
        {table && (
          <div className="mt-5">
            <Table data={table} onChange={handleChangeTable} />
          </div>
        )}
        <AddImageModal
          open={openImageModal}
          onClose={() => setOpenImageModal(false)}
          onSelect={handelSelectImage}
        />
        <AddTableModal
          open={openTableModal}
          onClose={() => setOpenTableModal(false)}
          onSelect={handleAddTable}
        />
      </div>
      <div
        className="h-1"
        style={{
          background: 'linear-gradient(180deg, #F2F2F7 0%, #FFFFFF 100%)',
        }}
      ></div>
      <div className="p-10" key={`${fixed_slide}`}>
        <RangePreview
          fixed_slide={fixed_slide}
          key={`section-${section}-column-${index}`}
          min={min_slide}
          max={max_slide}
        />
        <div className="flex justify-between">
          <NumberInputBox
            className="w-[109px]"
            placeholder="(필수) 최소값"
            value={min_slide}
            onChange={handleMinSlide}
          />
          <NumberInputBox
            className="w-[109px]"
            placeholder="(필수) 최대값"
            value={max_slide}
            onChange={handleMaxSlide}
          />
        </div>
      </div>
    </div>
  );
};
