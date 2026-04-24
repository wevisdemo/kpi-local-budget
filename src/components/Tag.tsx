import type { HTMLAttributes, ReactNode } from "react";

type TagVariant = "exist" | "propose";
type TagSize = "big" | "small";

interface TagProps extends HTMLAttributes<HTMLSpanElement> {
  /**
   * `exist` = สิ่งที่กำลังจะทำอยู่แล้ว (gray)
   * `propose` = ไอเดียใหม่จากเพื่อนบ้าน (green)
   */
  variant?: TagVariant;
  size?: TagSize;
  children: ReactNode;
}

const variantClasses: Record<TagVariant, string> = {
  exist: "bg-gray-20-80 text-gray-50",
  propose: "bg-green-10-80 text-green-50",
};

const sizeClasses: Record<TagSize, string> = {
  big: "px-5 py-2 wv-b4",
  small: "px-3.5 py-1.5 wv-b5",
};

export default function Tag({
  variant = "exist",
  size = "big",
  className = "",
  children,
  ...rest
}: TagProps) {
  return (
    <span
      className={[
        "inline-flex items-center justify-center rounded-full wv-ibmplexlooped whitespace-nowrap wv-b6 w-fit",
        variantClasses[variant],
        sizeClasses[size],
        className,
      ].join(" ")}
      {...rest}
    >
      {children}
    </span>
  );
}
