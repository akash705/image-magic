
import React, { useState } from 'react';
import { AppTab } from './types';
import TabButton from './components/TabButton';
import ImageEditor from './components/ImageEditor';
import ImageAnalyzer from './components/ImageAnalyzer';
import TimeTraveler from './components/TimeTraveler';
import StyleAdvisor from './components/StyleAdvisor';

const EditIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path d="M17.414 2.586a2 2 0 00-2.828 0L7 10.172V13h2.828l7.586-7.586a2 2 0 000-2.828z" /><path fillRule="evenodd" d="M2 6a2 2 0 012-2h4a1 1 0 010 2H4v10h10v-4a1 1 0 112 0v4a2 2 0 01-2 2H4a2 2 0 01-2-2V6z" clipRule="evenodd" /></svg>
);
const AnalyzeIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" /></svg>
);
const TimeTravelIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" /></svg>
);
const StyleIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>
);


const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<AppTab>(AppTab.EDITOR);

  const renderContent = () => {
    switch (activeTab) {
      case AppTab.EDITOR:
        return <ImageEditor />;
      case AppTab.ANALYZER:
        return <ImageAnalyzer />;
      case AppTab.TIME_TRAVEL:
        return <TimeTraveler />;
      case AppTab.STYLE_ADVISOR:
        return <StyleAdvisor />;
      default:
        return <ImageEditor />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white bg-gradient-to-br from-gray-900 via-indigo-900/20 to-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <header className="text-center mb-8">
          <h1 className="text-4xl sm:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-indigo-500">
            Image Magic
          </h1>
          <p className="mt-2 text-lg text-gray-300">
            Edit, analyze, and transform your photos with the power of AI.
          </p>
        </header>

        <nav className="flex justify-center mb-8 bg-gray-800/50 backdrop-blur-sm p-2 rounded-lg max-w-xl mx-auto">
          <div className="flex flex-wrap justify-center space-x-2">
            <TabButton
              label="Editor"
              isActive={activeTab === AppTab.EDITOR}
              onClick={() => setActiveTab(AppTab.EDITOR)}
              icon={<EditIcon />}
            />
            <TabButton
              label="Analyzer"
              isActive={activeTab === AppTab.ANALYZER}
              onClick={() => setActiveTab(AppTab.ANALYZER)}
              icon={<AnalyzeIcon />}
            />
            <TabButton
              label="Time Travel"
              isActive={activeTab === AppTab.TIME_TRAVEL}
              onClick={() => setActiveTab(AppTab.TIME_TRAVEL)}
              icon={<TimeTravelIcon />}
            />
            <TabButton
              label="Style Advisor"
              isActive={activeTab === AppTab.STYLE_ADVISOR}
              onClick={() => setActiveTab(AppTab.STYLE_ADVISOR)}
              icon={<StyleIcon />}
            />
          </div>
        </nav>

        <main className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-xl p-6 sm:p-8 shadow-2xl shadow-indigo-900/20">
          {renderContent()}
        </main>

      </div>
    </div>
  );
};

export default App;
