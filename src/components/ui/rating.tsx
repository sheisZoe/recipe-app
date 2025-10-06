import "@smastrom/react-rating/style.css";
import { Rating as ReactRating, Star } from "@smastrom/react-rating";

interface Props {
  className?: string;
  value: number;
  maxWidth?: number;
  spaceBetween?: "none" | "small" | "medium" | "large";
  readOnly?: boolean;
  isRequired?: boolean;
  onChange?: (value: number) => void;
}
export function Rating(props: Props) {
  const {
    className,
    value,
    maxWidth,
    readOnly = false,
    isRequired = false,
    spaceBetween = "none",
    onChange,
  } = props;

  const myStyles = {
    itemShapes: Star,
    activeFillColor: "#8b5cf6",
    inactiveFillColor: "#d8b4fe",
    maxWidth: maxWidth || 100,
  };
  return (
    <ReactRating
      style={{ maxWidth: maxWidth || 100 }}
      className={className}
      value={value}
      readOnly={readOnly}
      onChange={onChange}
      halfFillMode={"svg"}
      itemStyles={myStyles}
      isRequired={isRequired}
      spaceBetween={spaceBetween}
    />
  );
}
