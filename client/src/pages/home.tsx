import { FC, useRef, useState } from "react";
import Marquee from "react-fast-marquee";
import {
  AiPlazaLogo,
  ArrowIcon,
  ArrowRight,
  IMacProForm,
  IMacProProvider,
  IMacProUser,
  MainBanner01,
  MainBanner02,
  MainBanner03,
  MainBanner04,
  Marquee01,
  Marquee02,
  Marquee03,
  Marquee04,
  Marquee05,
  Questions01,
  Questions02,
  Questions03,
  Questions04,
  Questions05,
  Questions06,
  Questions07,
  Questions08,
  Questions09,
  YonseiLogo,
} from "../assets";
import { Link } from "react-router-dom";
import "@splidejs/react-splide/css";
// import '@splidejs/splide/css/skyblue';
import { Splide, SplideSlide, SplideTrack } from "@splidejs/react-splide";

interface HomeProps {}

const MarqueeBack = () => {
  const _marqueeArr = [Marquee01, Marquee02, Marquee03, Marquee04, Marquee05];
  const marqueeArr = [..._marqueeArr, ..._marqueeArr];
  return (
    <div className="relative lg:mx-20 mt-[130px] lg:mt-[7px]">
      <Marquee
        style={{ marginTop: "-20px", aspectRatio: "1680/566" }}
        gradientColor={[28, 28, 30]}
        gradientWidth={80}
      >
        {marqueeArr.map((el, index) => {
          return (
            <img
              className="mr-5 w-full h-full max-w-[80px] lg:max-w-[220px] max-h-[80px] lg:max-h-[220px]"
              key={`${el.toString()}-${index}`}
              src={el}
              alt={el.toString()}
            />
          );
        })}
      </Marquee>
      <div className="absolute min-w-[256px] max-w-[687px] max-h-[565px] z-[10] top-[-40px] lg:top-[33px] left-1/2 transform -translate-x-1/2">
        <img className="" src={IMacProForm} alt="IMacProForm" />
      </div>
    </div>
  );
};

const Home: FC<HomeProps> = () => {
  const [isStart, setIsStart] = useState(true);
  const [isEnd, setIsEnd] = useState(false);
  const ref = useRef<Splide>(null);
  const goNext = () => {
    if (!isEnd) {
      ref.current?.splide?.go?.(">");
      if (ref.current?.splide?.index !== 0) {
        setIsStart(false);
      }
      if (
        ref.current?.splide?.index !== undefined &&
        ref.current?.splide?.index >= 6
      ) {
        setIsEnd(true);
      }
    }
  };
  const goPrev = () => {
    ref.current?.splide?.go?.("<");
    if (ref.current?.splide?.index === 0) {
      setIsStart(true);
    }
    if (
      ref.current?.splide?.index !== undefined &&
      ref.current?.splide?.index < 6
    ) {
      setIsEnd(false);
    }
  };

  const questions = [
    {
      image: Questions01,
      subTitle: "Edit Field(Text)",
      title: "텍스트형 에딧필드",
      content: "Text 응답이 가능합니다.",
    },
    {
      image: Questions02,
      subTitle: "Edit Field(Number)",
      title: "숫자형 에딧필드",
      content: "숫자(123) 응답이 가능합니다.",
    },
    {
      image: Questions03,
      subTitle: "File Upload",
      title: "파일업로드",
      content: "파일등록이 가능합니다.",
    },
    {
      image: Questions04,
      subTitle: "Drop Down",
      title: "드롭다운",
      content: "목록 리스트 중 1개 항목 선택이 가능합니다.",
    },
    {
      image: Questions05,
      subTitle: "Radio Button",
      title: "라디오 버튼",
      content: "여러개의 목록 중 단일 선택이 가능합니다.",
    },
    {
      image: Questions06,
      subTitle: "CheckBox",
      title: "체크박스",
      content: "여러개의 목록 중 다중 선택이 가능합니다.",
    },
    {
      image: Questions07,
      subTitle: "Slider",
      title: "슬라이더",
      content: "지정된 최솟값과 최대값 사이 영역 응답이 가능합니다.",
    },
    {
      image: Questions08,
      subTitle: "Spinner",
      title: "스피너",
      content: "값을 늘리거나 줄여 응답이 가능합니다.",
    },
    {
      image: Questions09,
      subTitle: "Linear Magnification",
      title: "선형배율",
      content: "단계에 대한 정도 응답이 가능합니다.",
    },
  ];
  return (
    <div>
      <div
        className="flex flex-col w-full bg-center bg-cover bg-white select-none aspect-square mx-auto"
        style={{ backgroundImage: `url(${MainBanner01})`, height: 580 }}
      >
        <div className="mt-[160px] text-center">
          <img
            className="mb-5 mx-auto h-[44px]"
            src={AiPlazaLogo}
            alt="AiPlazaLogo"
          />
          <p className="text-h3 font-medium text-white">
            MoNeT AI Plaza에서는 원하는 양식대로 설문폼을 만들고 자유롭게
            응답하여
            <br />
            AI 빅데이터를 기반으로 분석된 결과를 확인할 수 있습니다.
            <br className="md:hidden" />
          </p>
        </div>
        <div className="mt-[80px] mx-auto">
          <Link to="/sign-in">
            <button className="px-5 py-2.5 bg-blue500 text-white rounded-[5px]">
              이용하기
            </button>
          </Link>
        </div>
      </div>
      <div className="mx-5 lg:mx-10 mt-20">
        <div
          className="flex flex-col w-full h-[600px] bg-center bg-cover bg-white select-none aspect-square mx-auto rounded-[20px]"
          style={{ backgroundImage: `url(${MainBanner02})` }}
        >
          <div className="p-10 lg:p-20">
            <p className="text-blue300 text-h1 font-semibold">Service</p>
            <p className="text-b1 font-medium text-white">
              MoNeT AI Plaza는 연세대학교 의과대학 모네 연구실에서 제공하는
              <br />
              AI 빅데이터 분석 기반의 영상자료 분석 서베이 플랫폼입니다.
            </p>
            <div className="mt-[190px] h-[120px] w-[120px]">
              <img src={YonseiLogo} alt="YonseiLogo" />
            </div>
          </div>
        </div>
        <div className="mt-10">
          <div className="flex flex-col lg:flex-row gap-10">
            <div className="max-w-[900px] w-full lg:h-[900px] bg-gray100 rounded-[20px]">
              <div className="p-10 lg:p-20 flex flex-col items-center">
                <p className="text-h1 font-semibold">Service Provider</p>
                <p className="mt-[14px] lg:text-center text-b1">
                  서비스 제공자는 손쉽게 분석 서비스를 제공하고
                  <br />
                  분석 결과를 확인할 수 있습니다.
                </p>
                <Link
                  className="mt-5 text-b2 font-medium text-blue500"
                  to="/sign-in"
                  state={{ userType: "Provider" }}
                >
                  {`이용하기 >`}
                </Link>
                <div className="mt-[76px] max-w-[589px] max-h-[485px]">
                  <img src={IMacProProvider} alt="IMacProProvider" />
                </div>
              </div>
            </div>
            <div className="max-w-[900px] w-full lg:h-[900px] bg-gray100 rounded-[20px]">
              <div className="p-10 lg:p-20 flex flex-col items-center">
                <p className="text-h1 font-semibold">User</p>
                <p className="mt-[14px] lg:text-center text-b1">
                  일반회원은 서비스 제공자가 제공한 분석 서비스 양식에 맞춰
                  <br />
                  영상자료 및 데이터를 입력할 수 있고,
                  <br />
                  이에 대한 분석 결과를 확인할 수 있습니다.
                </p>
                <Link
                  className="mt-5 text-b2 font-medium text-blue500"
                  to="/sign-in"
                  state={{ userType: "Consumer" }}
                >
                  {`이용하기 >`}
                </Link>
                <div className="mt-[46px] max-w-[589px] max-h-[485px]">
                  <img src={IMacProUser} alt="IMacProUser" />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className=" mt-10">
          <div
            className="flex flex-col w-full h-[600px] bg-center bg-cover bg-white select-none aspect-square mx-auto rounded-[20px]"
            style={{ backgroundImage: `url(${MainBanner03})` }}
          >
            <div className="p-10 lg:p-20 ">
              <p className="text-white text-h1 font-semibold">Flow</p>
              <div className="text-b1 text-white">
                <p className="font-bold">입력하고, 확인하고, 다운받으세요.</p>
                <p className="text-b1">
                  AI 빅데이터 기반 기술력으로 입력된 데이터에 맞춰 자동
                  프로그래밍 후 결과값이 도출됩니다.
                  <br className="md:hidden" />
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className=" mt-10">
          <div className="flex flex-col w-full h-[900px] bg-black bg-center bg-cover select-none aspect-square mx-auto rounded-[20px]">
            <div className="relative px-5 lg:px-20 py-20">
              <p className="text-center text-white text-h1 font-semibold">
                One Form, One Service
              </p>
              <div className="mt-2.5 text-center text-b1 text-gray400">
                <p>
                  서비스 제공자는 자신만의 서비스를 손쉽게 제작할 수 있습니다.
                </p>
                <p className="text-b1">
                  테마를 사용해 소개페이지를, 질문폼을 사용해 자신만의 서비스를
                  만들어 보세요.
                  <br className="md:hidden" />
                </p>
              </div>
              <MarqueeBack />
              <div className="absolute right-10 lg:right-20 bottom-[-190px] lg:bottom-[-16px] text-white">
                {/* <div className="flex justify-end mt-[13px] text-white"> */}
                <div className="flex items-center text-end">
                  <p className="mr-5 font-bold text-h3">
                    나만의 소개페이지
                    <br />
                    만들러가기
                  </p>
                  <Link
                    className="bg-gradient-to-t from-blue500 to-blue300 rounded-full"
                    to="/sign-in"
                  >
                    <img
                      className="mx-[22px] my-[25px] w-9 h-[30px]"
                      src={ArrowRight}
                      alt="ArrowRight"
                    />
                  </Link>
                </div>
              </div>
              {/* <div className="max-w-[687px] max-h-[565px] z-[10] absolute top-[254px] left-1/2 transform -translate-x-1/2">
                <img className="" src={IMacProForm} alt="IMacProForm" />
              </div> */}
            </div>
          </div>
        </div>
        <div className="relative mt-10">
          <Splide
            aria-label="recommandedDealers"
            role="presentation"
            options={{
              pagination: false,
              autoWidth: true,
            }}
            hasTrack={false}
            ref={ref}
          >
            <div className="lg:ml-[340px]">
              <p className="text-blue500 text-h1 font-semibold">Questions</p>
              <p>
                결과값 도출에 필요한 질문을 다양하고 쉽게 이용할 수 있습니다.
              </p>
            </div>
            <div className="mt-5 flex-1 overflow-hidden">
              {/* <div className="ml-auto splide__arrows"> */}
              <div className="z-[10] absolute right-[-2.5%] top-[10px] lg:top-11 transform lg:-translate-x-[50px]">
                <div className="flex flex-row space-x-[10px]">
                  <button
                    className={`flex justify-center items-center w-[44px] h-[44px] ${
                      isStart ? "bg-gray400" : "bg-blue500"
                    } rounded-full`}
                    onClick={goPrev}
                  >
                    <img className="w-6 h-6" src={ArrowIcon} alt="ArrowIcon" />
                  </button>
                  <button
                    className={`flex justify-center items-center w-[44px] h-[44px] ${
                      isEnd ? "bg-gray400" : "bg-blue500"
                    } rounded-full`}
                    onClick={goNext}
                  >
                    <img
                      className="w-6 h-6 rotate-180"
                      src={ArrowIcon}
                      alt="ArrowIcon"
                    />
                  </button>
                </div>
              </div>
              <div className="splide__arrows hidden" />
              <SplideTrack>
                <SplideSlide key="Questions0">
                  <div className="lg:ml-[340px]"></div>
                </SplideSlide>
                {questions.map((el, index) => {
                  return (
                    <SplideSlide key={`Questions${index + 1}`}>
                      <div className="mr-5 w-[390px] lg:w-[440px] max-h-[387px] p-[10px] lg:p-[60px] bg-gray100 rounded-[20px]">
                        <div>
                          <img
                            className="max-w-[320px] max-h-[140px]"
                            src={el.image}
                            alt={`Questions${index + 1}`}
                          />
                        </div>
                        <p className="mt-5 font-bold text-b4 text-blue800">
                          {el.subTitle}
                        </p>
                        <p className="mt-[5px] font-bold text-h3 text-gray800">
                          {el.title}
                        </p>
                        <p className="mt-5 text-b3 text-gray600">
                          {el.content}
                        </p>
                      </div>
                    </SplideSlide>
                  );
                })}
              </SplideTrack>
            </div>
          </Splide>
        </div>
      </div>
      <div
        className="mt-20 flex flex-col w-full max-h-[264px] bg-center bg-cover bg-white select-none aspect-square mx-auto"
        style={{ backgroundImage: `url(${MainBanner04})`, height: 264 }}
      >
        <div className="mt-[80px] text-center">
          <p className="text-h1 font-bold text-white">지금 시작해보세요</p>
        </div>
        <div className="mt-[20px] mx-auto">
          <Link to="/sign-in">
            <div className="text-b2 font-medium text-blue500">{`이용하기 >`}</div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;
