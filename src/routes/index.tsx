import React from "react";
import { Welcome } from "@/components/onboarding/welcome";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-[#0f1115] text-white flex items-center justify-center p-6">
      <div className="max-w-6xl w-full">
        <Welcome />
      </div>
    </div>
  );
}
