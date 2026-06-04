"use client";

import dynamic from "next/dynamic";

const CameraFlashes = dynamic(() => import("@/components/CameraFlashes"), { ssr: false });

export default function CameraFlashesWrapper() {
  return <CameraFlashes />;
}
