"use client";

import { useState } from "react";
import { AsciiLogo } from "./AsciiLogo";
import { MainMenu } from "./MainMenu";
import { SectionViewer } from "./SectionViewer";
import { Memory3DPanel } from "./Memory3DPanel";
import WindowChrome from "./WindowChrome";
import StepsPanel, { StepItem } from "./StepsPanel";
import { sectionContent } from "./sectionContent";

export function TerminalInterface() {
  const [currentSection, setCurrentSection] = useState<string>("");

  const handleSectionSelect = (section: string) => {
    setCurrentSection(section);
  };

  const handleBack = () => {
    setCurrentSection("");
  };

  const [activePanel, setActivePanel] = useState<"cli" | "steps" | "memory">("cli");
  const steps: StepItem[] = [
    { id: "input", label: "1. 입력", startLine: 1 },
    { id: "array", label: "2. 배열 생성", startLine: 15 },
    { id: "dp", label: "3. DP", startLine: 33 },
    { id: "output", label: "4. 출력", startLine: 95 },
  ];
  const [activeStepId, setActiveStepId] = useState<string | undefined>(undefined);

  return (
    <div className="py-6 min-h-screen bg-[rgb(231,229,211)] text-black">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-4 min-h-[calc(100vh-48px)]">
        {/* Left: CLI as a large standalone window */}
        <div className="lg:col-span-8 h-full">
          <div onClick={() => setActivePanel("cli")} className={`h-full`}>
            <WindowChrome title="CLI">
              <div className="p-4 h-full">
                {currentSection === "" ? (
                  <>
                    <AsciiLogo />
                    <MainMenu onSectionSelect={(sec) => { handleSectionSelect(sec); setActiveStepId(sec as string); }} active={activePanel === "cli"} />
                  </>
                ) : (
                  <div className="h-full overflow-auto">
                    <SectionViewer section={currentSection} onBack={() => { handleBack(); setActiveStepId(undefined); }} active={activePanel === "cli"} />
                  </div>
                )}
              </div>
            </WindowChrome>
          </div>
        </div>

        {/* Right: Detached steps and memory windows */}
        <div className="lg:col-span-4 space-y-4 h-full">
          <div className={`${activePanel === "steps" ? "ring-2 ring-neutral-900 rounded-[12px]" : ""}`}>
            <div onClick={() => setActivePanel("steps")}> 
              <WindowChrome title="단계">
              <StepsPanel steps={steps} activeStepId={activeStepId} />
              </WindowChrome>
            </div>
          </div>
          <div className="flex-1 min-h-0">
            <div className={`${activePanel === "memory" ? "ring-2 ring-neutral-900 rounded-[12px]" : ""}`}>
              <div onClick={() => setActivePanel("memory")}> 
                <WindowChrome title="메모리">
                  <div className="p-4">
                    <Memory3DPanel
                      active={activePanel === "memory"}
                      onActivate={() => setActivePanel("memory")}
                      sourceCode={currentSection ? sectionContent[currentSection]?.code : undefined}
                    />
                  </div>
                </WindowChrome>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TerminalInterface;


