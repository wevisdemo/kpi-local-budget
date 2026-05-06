"use client"; // จำเป็นต้องใช้ client component

import Lottie from "lottie-react";
import animationData from "@/public/landing_animate.json"; // Path ไฟล์ JSON

const LottieAnimation = () => {
  return (
    <div className="w-[70vw] h-auto flex items-center justify-center">
      <Lottie animationData={animationData} loop={true} />
    </div>
  );
};

export default LottieAnimation;
