"use client";
import clsx from "clsx";
import { StaticImport } from "next/dist/shared/lib/get-img-props";
import Image from "next/image";
import React from "react";

const Banner = ({ className }: { className?: string }) => {
  return (
    <div
      className={clsx(
        "bg-black relative lg:h-[400px] w-full max-w-[700px] md:h-[350px] sm:h-[300px] h-[200px] rounded-2xl drop-shadow-glow sm:mt-18 mt-16",
        className
      )}
    ></div>
  );
};

export default Banner;
