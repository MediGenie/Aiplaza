import { FC } from "react";
import { Range, getTrackBackground } from "react-range";

interface LinearSlideProps {
  value: number;
  minValue: number;
  maxValue: number;
  onChange?: (next: number) => void;
  disabled?: boolean;
}

export const LinearSlide: FC<LinearSlideProps> = ({
  maxValue,
  minValue,
  value,
  onChange,
  disabled,
}) => {
  return (
    <div>
      <div className="flex justify-center flex-wrap">
        <Range
          disabled={disabled}
          step={1}
          min={minValue}
          max={maxValue}
          values={[value]}
          onChange={([next]) => onChange?.(next)}
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
                    values: [value],
                    colors: ["#E5E5EA", "#E5E5EA"],
                    min: minValue,
                    max: maxValue,
                  }),
                  alignSelf: "center",
                }}
              >
                {children}
              </div>
            </div>
          )}
          renderThumb={({ props, isDragged }) => (
            <div
              {...props}
              style={{
                ...props.style,
                height: "16px",
                width: "16px",
                borderRadius: "12px",
                backgroundColor: "#007AFF",
                boxShadow: "0px 2px 4px rgba(28, 28, 30, 0.25)",
              }}
            ></div>
          )}
          renderMark={({ props }) => (
            <div
              {...props}
              style={{
                ...props.style,
                width: 24,
                height: 24,
                backgroundColor: "#E5E5EA",
                borderRadius: 99,
              }}
            ></div>
          )}
        />
      </div>
    </div>
  );
};
