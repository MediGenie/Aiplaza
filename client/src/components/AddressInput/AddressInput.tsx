import classNames from 'classnames';
import { FC, ChangeEventHandler } from 'react';
import { Helmet } from 'react-helmet';
import { InputBox } from '../InputBox';

interface PostCodeResponse {
  zonecode: string; // 우편번호
  address: string; // 기본주소
  addressEnglish: string; // 기본 영문 주소
  addressType: 'R' | 'J'; // R 도로명 J 지번
  userSelectedType: 'R' | 'J'; // 사용자가 선택한 주소 타입
  noSelected: 'Y' | 'N'; // 연관 주소에서 선택 안함 부분 구분자
  userLanguageType: 'K' | 'E';
  roadAddress: string; // 도로명 주소
  roadAddressEnglish: string; // 영문 도로명 주소
  jibunAddress: string;
  jibunAddressEnglish: string;
  autoRoadAddress: string;
  autoRoadAddressEnglish: string;
  autoJibunAddress: string;
  autoJibunAddressEnglish: string;
  buildingCode: string;
  buildingName: string;
  apartment: 'Y' | 'N';
  sido: string;
  sidoEnglish: string;
  sigungu: string;
  sigunguEnglish: string;
  sigunguCode: string;
  roadnameCode: string;
  bcode: string;
  roadname: string;
  roadnameEnglish: string;
  bname: string;
  bnameEnglish: string;
  bname1: string;
  bname1English: string;
  bname2: string;
  bname2English: string;
  hname: string;
  query: string;
}

interface AddressInputProps {
  address?: string;
  address_detail?: string;
  onChangeAddress?: (addr: string) => void;
  onChangeAddressDetail?: (addr: string) => void;
  address_error?: string;
  address_detail_error?: string;
}

export const AddressInput: FC<AddressInputProps> = ({
  address,
  address_detail,
  onChangeAddress,
  onChangeAddressDetail,
  address_detail_error,
  address_error,
}) => {
  const handleAddress = () => {
    const Postcode = (window as any).daum?.Postcode;
    if (Postcode) {
      const instance = new Postcode({
        oncomplete: (data: PostCodeResponse) => {
          const { roadAddress } = data;
          if (onChangeAddress) {
            onChangeAddress(roadAddress);
          } else {
            console.warn('AddressInput onChangeAddress 입력해주세요.');
          }
        },
        popupTitle: '주소 검색',
      });
      instance.open();
    }
  };
  const handleAddressDetail: ChangeEventHandler<HTMLInputElement> = (e) => {
    const value = e.target.value;
    onChangeAddressDetail?.(value);
  };
  return (
    <div>
      <Helmet>
        <script src="//t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js"></script>
      </Helmet>
      <div className="mb-[5px]">
        <div
          className={classNames(
            'items-center flex py-2 px-[15px] bg-white rounded border border-gray300',
            {
              'border-warning': !!address_error,
            },
          )}
        >
          <input
            className="flex-1 bg-white text-b3 placeholder:text-gray400"
            disabled
            placeholder="주소를 입력해 주세요."
            value={address}
          ></input>
          <button
            className="hidden lg:inline-block bg-blue800 text-white rounded py-1 px-5 font-medium text-b2"
            type="button"
            onClick={handleAddress}
          >
            주소찾기
          </button>
        </div>
        <button
          className="inline-block lg:hidden mt-[5px] mb-[5px] w-full bg-blue800 text-white rounded py-1 px-5 font-medium text-b2"
          type="button"
          onClick={handleAddress}
        >
          주소찾기
        </button>
        {address_error && <p className="error-msg">{address_error}</p>}
      </div>
      <InputBox
        value={address_detail}
        className="w-full"
        placeholder="상세주소를 입력해 주세요."
        onChange={handleAddressDetail}
        error={!!address_detail_error}
      />
      {address_detail_error && (
        <p className="error-msg">{address_detail_error}</p>
      )}
    </div>
  );
};
