import classNames from "classnames";
import { FC } from "react";
import { Range, getTrackBackground } from "react-range";
interface RangeSlideProps {
  min: number;
  max: number;
  value: number[];
  onChange: (next: number[]) => void;
  disabled?: boolean;
}

export const RangeSlide: FC<RangeSlideProps> = ({
  min,
  max,
  onChange,
  value,
  disabled,
}) => {
  return (
    <div className="flex justify-center flex-wrap">
      <Range
        disabled={disabled}
        step={0.1}
        min={min}
        max={max}
        values={value}
        onChange={onChange}
        renderTrack={({ props, children }) => (
          <div
            onMouseDown={props.onMouseDown}
            onTouchStart={props.onTouchStart}
            style={{
              ...props.style,
              height: "36px",
              display: "flex",
              width: "100%",
            }}
          >
            <div
              ref={props.ref}
              style={{
                height: "6px",
                width: "100%",
                borderRadius: "4px",
                background: getTrackBackground({
                  values: value,
                  colors:
                    value.length === 1
                      ? ["#007AFF", "#C7C7CC"]
                      : ["#C7C7CC", "#007AFF", "#C7C7CC"],
                  min: min,
                  max: max,
                }),
                alignSelf: "center",
              }}
            >
              {children}
            </div>
          </div>
        )}
        renderThumb={({ props, isDragged, index }) => (
          <div
            {...props}
            style={{
              ...props.style,
              height: "24px",
              width: "24px",
              borderRadius: "12px",
              border: "1px solid #FFFFFF",
              backgroundColor: "#007AFF",
              boxShadow: "0px 2px 4px rgba(28, 28, 30, 0.25)",
            }}
            className="group"
          >
            <div
              className={classNames(
                "hidden group-hover:block bg-white absolute origin-top-left top-3 left-3 px-2.5 rounded rounded-tl-none",
                {
                  "!block": isDragged,
                }
              )}
              style={{ boxShadow: "0px 2px 4px rgba(28, 28, 30, 0.25)" }}
            >
              <span className="text-blue500 text-[14px] leading-[22px]">
                {value[index].toFixed(1)}
              </span>
            </div>
          </div>
        )}
      />
    </div>
  );
};
