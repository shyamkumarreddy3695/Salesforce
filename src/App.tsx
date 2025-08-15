import React, { useState } from 'react';
import { Search, Menu, X, ChevronDown, ChevronRight, Book, Code, Settings, Zap, Cloud, Users } from 'lucide-react';
import { topics } from './data/topics';
import { TopicContent } from './components/TopicContent';
import { SearchResults } from './components/SearchResults';
import type { Topic } from './types';

function App() {
  const [selectedTopic, setSelectedTopic] = useState<Topic>(topics[0]);
  const [searchQuery, setSearchQuery] = useState('');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [expandedSections, setExpandedSections] = useState<Set<string>>(new Set(['admin']));

  const toggleSection = (sectionId: string) => {
    const newExpanded = new Set(expandedSections);
    if (newExpanded.has(sectionId)) {
      newExpanded.delete(sectionId);
    } else {
      newExpanded.add(sectionId);
    }
    setExpandedSections(newExpanded);
  };

  const handleTopicSelect = (topic: Topic) => {
    setSelectedTopic(topic);
    setSearchQuery('');
    setIsSidebarOpen(false);
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  const getSectionIcon = (sectionId: string) => {
    const icons = {
      admin: Settings,
      development: Code,
      integration: Cloud,
      aura: Zap,
      lwc: Book,
      architecture: Users
    };
    return icons[sectionId] || Book;
  };

  const sections = [
    { id: 'admin', title: 'Salesforce Administration', color: 'bg-blue-500' },
    { id: 'development', title: 'Salesforce Development', color: 'bg-green-500' },
    { id: 'integration', title: 'Integration Patterns', color: 'bg-purple-500' },
    { id: 'aura', title: 'Aura Components', color: 'bg-orange-500' },
    { id: 'lwc', title: 'Lightning Web Components', color: 'bg-indigo-500' },
    { id: 'architecture', title: 'Architecture & Limitations', color: 'bg-red-500' }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="flex items-center justify-between px-4 py-3">
          <div className="flex items-center space-x-4">
            <button
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="lg:hidden p-2 rounded-md hover:bg-gray-100"
            >
              {isSidebarOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
            <h1 className="text-xl font-bold text-gray-900">Salesforce Master Hub</h1>
          </div>
          
          <div className="relative max-w-md w-full mx-4">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-4 w-4 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search topics, examples, or concepts..."
              value={searchQuery}
              onChange={(e) => handleSearch(e.target.value)}
              className="block w-full pl-10 pr-3 py-2 border border-gray-200 rounded-lg bg-gray-50 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <aside className={`${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } lg:translate-x-0 fixed lg:relative z-30 w-80 h-screen bg-white border-r overflow-y-auto transition-transform duration-300 ease-in-out`}>
          <div className="p-6">
            <div className="space-y-2">
              {sections.map(section => {
                const sectionTopics = topics.filter(topic => topic.section === section.id);
                const Icon = getSectionIcon(section.id);
                const isExpanded = expandedSections.has(section.id);
                
                return (
                  <div key={section.id} className="space-y-1">
                    <button
                      onClick={() => toggleSection(section.id)}
                      className="flex items-center justify-between w-full p-3 rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      <div className="flex items-center space-x-3">
                        <div className={`w-8 h-8 ${section.color} rounded-lg flex items-center justify-center`}>
                          <Icon size={16} className="text-white" />
                        </div>
                        <span className="font-medium text-gray-900">{section.title}</span>
                      </div>
                      {isExpanded ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
                    </button>
                    
                    {isExpanded && (
                      <div className="ml-11 space-y-1">
                        {sectionTopics.map(topic => (
                          <button
                            key={topic.id}
                            onClick={() => handleTopicSelect(topic)}
                            className={`block w-full text-left p-2 rounded-md text-sm transition-colors ${
                              selectedTopic.id === topic.id 
                                ? 'bg-blue-50 text-blue-700 font-medium' 
                                : 'text-gray-600 hover:bg-gray-50'
                            }`}
                          >
                            {topic.title}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </aside>

        {/* Overlay for mobile */}
        {isSidebarOpen && (
          <div
            className="fixed inset-0 bg-black bg-opacity-50 z-20 lg:hidden"
            onClick={() => setIsSidebarOpen(false)}
          />
        )}

        {/* Main Content */}
        <main className="flex-1 p-6 lg:p-8 min-h-screen">
          {searchQuery ? (
            <SearchResults query={searchQuery} onTopicSelect={handleTopicSelect} />
          ) : (
            <TopicContent topic={selectedTopic} />
          )}
        </main>
      </div>
    </div>
  );
}

export default App;