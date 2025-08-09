import { useState } from 'react';
import { AsciiLogo } from './AsciiLogo';
import { MainMenu } from './MainMenu';
import { SectionViewer } from './SectionViewer';

export function TerminalInterface() {
  const [currentSection, setCurrentSection] = useState<string>('');

  const handleSectionSelect = (section: string) => {
    setCurrentSection(section);
  };

  const handleBack = () => {
    setCurrentSection('');
  };

  return (
    <div className="p-8 min-h-screen">
      <div className="max-w-6xl mx-auto">
        {currentSection === '' ? (
          <>
            <AsciiLogo />
            <MainMenu onSectionSelect={handleSectionSelect} />
          </>
        ) : (
          <SectionViewer section={currentSection} onBack={handleBack} />
        )}
      </div>
    </div>
  );
}