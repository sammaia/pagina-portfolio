"use client";

import dynamic from "next/dynamic";

const RobotCompanion = dynamic(() => import("./RobotCompanion"), {
  ssr: false,
});

export default function RobotCompanionWrapper() {
  return <RobotCompanion />;
}
