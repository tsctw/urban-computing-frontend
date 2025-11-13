import React from "react";
import { Element } from "react-scroll";
import Navbar from "./components/Navbar";

import HomeSection from "./sections/HomeSection";
import AnalyzeSection from "./sections/AnalyzeSection";
import VisualizeSection from "./sections/VisualizeSection";
import UploadSection from "./sections/UploadSection";
import ExtraSection from "./sections/ExtraSection";

const sections = [
  { id: "home", label: "Home", component: <HomeSection /> },
  { id: "analyze", label: "Analyze", component: <AnalyzeSection /> },
  { id: "visualize", label: "Visualize", component: <VisualizeSection /> },
  { id: "upload", label: "Upload", component: <UploadSection /> },
  { id: "extra", label: "Extra", component: <ExtraSection /> },
];

const App: React.FC = () => {
  return (
    <div className="font-sans">
      <Navbar
        sections={sections.map((s) => ({
          id: s.id,
          label: s.label,
          color: "",
        }))}
      />
      <main className="mt-[52px]">
        {sections.map((s) => (
          <Element key={s.id} name={s.id} id={s.id} className="scroll-mt-16">
            {s.component}
          </Element>
        ))}
      </main>
    </div>
  );
};

export default App;
