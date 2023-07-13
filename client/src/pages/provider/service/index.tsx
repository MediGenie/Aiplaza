import { FC, useEffect, useLayoutEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ApiError } from "../../../apis/api-error";
import { providerServiceApis } from "../../../apis/service";
import {
  Favorites,
  FilterButton,
  NotFavorites,
  SearchIcon,
} from "../../../assets";
import { useAuthValue } from "../../../auth/hooks";
import { Select } from "../../../components/SelectButton/Select";
import { FavoriteDefault, WhitePlus, WhiteStar } from "../../../icons";
import { AlertModal } from "../../../modals";
import { BookMarkType } from "../../../types/bookmark.type";
import { PaginateData } from "../../../types/paginate-data.interface";
import { ServiceListItemFull } from "../../../types/service";

interface ServiceProps {}

const Service: FC<ServiceProps> = () => {
  const [page, setPage] = useState<number>(2);
  const [sort, setSort] = useState<string>("created_at");
  const [data, setData] = useState<PaginateData<ServiceListItemFull>>({
    page_size: 0,
    rows: [],
    total_number: 0,
  });
  const [search, setSearch] = useState<string>("");
  const [modal, setModal] = useState({ show: false, message: "" });
  const [fetching, setFetching] = useState(false);
  const [bookmark, setBookMark] = useState<BookMarkType[]>([]);
  const { user } = useAuthValue();
  const [ctBookMark, setCtBookMark] = useState(false);
  const [headerSearchResult, setHeaderSearchResult] = useState("");

  const getFullBookMark = () => {
    if (ctBookMark === false) {
      providerServiceApis
        .getProviderFullBookMark(user?._id)
        .then((res) => {
          setData({
            page_size: data.page_size,
            rows: [...res],
            total_number: data.total_number,
          });
          setCtBookMark(!ctBookMark);
        })
        .catch((e: ApiError) => showModal(e.message));
    } else if (ctBookMark === true) {
      setPage(2);
      providerServiceApis
        .getProviderServiceList(1, sort, search, user?._id)
        .then((res) => {
          setData(res);
          setCtBookMark(!ctBookMark);
        })
        .catch((e: ApiError) => showModal(e.message));
    }
    setHeaderSearchResult("");
  };

  const bookMarkHandler = (_id: string) => {
    providerServiceApis
      .createProviderBookMark(user?._id, _id)
      .then((res) => {
        setBookMark(res);
      })
      .catch((e: ApiError) => showModal(e.message));
  };

  const searchGetItems = () => {
    setHeaderSearchResult(search);
    setPage(2);
    providerServiceApis
      .getProviderServiceList(1, sort, search, user?._id)
      .then((res) => {
        setData(res);
        setCtBookMark(false);
      })
      .catch((e: ApiError) => showModal(e.message));
  };

  const handleScroll = () => {
    const scrollHeight = document.documentElement.scrollHeight;
    const scrollTop = document.documentElement.scrollTop;
    const clientHeight = document.documentElement.clientHeight;
    if (scrollTop + clientHeight >= scrollHeight && fetching === false) {
      // 페이지 끝에 도달하면 추가 데이터를 받아온다
      setFetching(true);
      setPage(page + 1);
      providerServiceApis
        .getProviderServiceList(page, sort, search, user?._id)
        .then((res) => {
          setData({
            page_size: res.page_size,
            rows: [...data.rows, ...res.rows],
            total_number: res.total_number,
          });
        })
        .catch((e: ApiError) => showModal(e.message));
      setFetching(false);
    }
  };

  useEffect(() => {
    // scroll event listener 등록
    window.addEventListener("scroll", handleScroll);
    return () => {
      // scroll event listener 해제
      window.removeEventListener("scroll", handleScroll);
    };
  });

  useLayoutEffect(() => {
    setPage(2);
    setData({
      page_size: 0,
      rows: [],
      total_number: 0,
    });
    providerServiceApis
      .getProviderServiceList(1, sort, search, user?._id)
      .then((res) => {
        setData(res);
        setCtBookMark(false);
      })
      .catch((e: ApiError) => showModal(e.message));

    providerServiceApis
      .getProviderBookMarkList(user?._id)
      .then((res) => {
        setBookMark(res);
        setCtBookMark(false);
      })
      .catch((e: ApiError) => showModal(e.message));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sort]);

  const navigate = useNavigate();
  const showModal = (msg: string) => {
    setModal({ message: msg, show: true });
  };

  const hiddenModal = () => {
    setModal((prev) => ({ ...prev, show: false }));
    navigate("/");
  };

  return (
    <div className="container p-[30px] mt-[50px]">
      <AlertModal
        title="오류"
        message={modal.message}
        open={modal.show}
        onClose={hiddenModal}
      />
      <div className="flex justify-between max-md:flex-col">
        <h1 className="text-h2 font-bold">Services List</h1>
        <div className=" max-md:pt-[20px]">
          <div className="flex items-center space-x-2.5 max-md:flex-col max-md:items-start max-md:space-x-0">
            <div className="flex space-x-2.5 max-md:justify-between max-md:w-full">
              <div className="flex space-x-2.5">
                <button
                  onClick={() => navigate("create")}
                  className="hover:shadow-2 rounded-[5px] bg-blue500 w-10 h-10 flex items-center justify-center"
                >
                  <img src={WhitePlus} style={{ color: "#ffffff" }} alt="" />
                </button>
                <button
                  onClick={getFullBookMark}
                  className=" rounded-[5px] bg-gray100 w-10 h-10 flex items-center justify-center"
                >
                  <img
                    className="w-5 h-5"
                    src={ctBookMark ? Favorites : FavoriteDefault}
                    alt="즐겨찾기"
                  />
                </button>
              </div>
              <Select
                data={[
                  { value: "-created_at", label: "최신순" },
                  { value: "name", label: "가나다순" },
                  { value: "user_count", label: "이용자순" },
                ]}
                setValue={setSort}
                value={sort}
                img={FilterButton}
                imgAlt="orderBy"
              />
            </div>

            <div className="h-10 bg-gray100 px-5 rounded-full flex items-center justify-between space-x-[3px] max-md:mt-2.5 max-md:w-full">
              <input
                className="bg-gray100 border-0 max-w-[86px] text-b2 max-md:max-w-full"
                style={{ fontSize: "15px" }}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="검색"
              />
              <button type="submit" onClick={() => searchGetItems()}>
                <img src={SearchIcon} alt="검색버튼" className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
      {headerSearchResult !== "" ? (
        <div className=" font-bold text-b1 mt-5 mb-10">
          <span className=" text-blue500">{headerSearchResult}</span>
          <span className="text-gray600">에 대한 검색결과</span>
        </div>
      ) : (
        <></>
      )}
      <div className="mt-10 grid grid-cols-4 gap-10 max-sm:grid-cols-1 max-md:grid-cols-2">
        {data !== undefined && data.rows.length !== 0 ? (
          data.rows.map((value, index) => {
            let checked = false;
            if (bookmark) {
              bookmark.map((v2, i2) => {
                if (value._id === bookmark[i2].service) {
                  checked = true;
                }
              });
            }
            return (
              <div className="border border-gray200 rounded-lg overflow-hidden">
                <div
                  className="flex items-end justify-end min-h-[160px] !bg-no-repeat !bg-cover !bg-center"
                  style={{
                    background: `url(${data.rows[index].thumbnail.url})`,
                  }}
                >
                  <button
                    onClick={() => bookMarkHandler(value._id)}
                    className="m-2.5 rounded-[5px] w-8 h-8 flex items-center justify-center"
                    style={{
                      background: `rgba(28, 28, 30, 0.5)`,
                    }}
                  >
                    <img
                      className="w-4 h-4"
                      src={checked ? Favorites : WhiteStar}
                      alt={checked ? "선택됨" : "선택되지않음"}
                    />
                  </button>
                </div>
                <Link to={`/provider/service/${value._id}`}>
                  <div className="mt-[-5px] px-5 py-5">
                    <p
                      className="text-b2  max-w-[218px] break-words line-clamp-1"
                      style={{ fontWeight: 600 }}
                    >
                      {value.name}
                    </p>
                    <p
                      className="mt-[5px] text-gray600 font-normal text-b2 break-words line-clamp-2"
                      style={{ fontSize: "15px", lineHeight: "24px" }}
                    >
                      {value.description}
                    </p>
                  </div>
                </Link>
              </div>
            );
          })
        ) : (
          <h2 className="text-center font-bold absolute left-1/2 -translate-x-1/2">
            등록된 서비스가 존재하지 않습니다.
          </h2>
        )}
      </div>
      <div className="mt-20"></div>
    </div>
  );
};

export default Service;
