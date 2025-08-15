import React from 'react';
import { Search } from 'lucide-react';
import { topics } from '../data/topics';
import type { Topic } from '../types';

interface SearchResultsProps {
  query: string;
  onTopicSelect: (topic: Topic) => void;
}

export const SearchResults: React.FC<SearchResultsProps> = ({ query, onTopicSelect }) => {
  const searchResults = topics.filter(topic => 
    topic.title.toLowerCase().includes(query.toLowerCase()) ||
    topic.content.toLowerCase().includes(query.toLowerCase()) ||
    topic.keyPoints.some(point => point.toLowerCase().includes(query.toLowerCase())) ||
    topic.examples.some(example => 
      example.title.toLowerCase().includes(query.toLowerCase()) ||
      example.description.toLowerCase().includes(query.toLowerCase()) ||
      (example.code && example.code.toLowerCase().includes(query.toLowerCase()))
    )
  );

  return (
    <div className="max-w-4xl">
      <div className="mb-6">
        <div className="flex items-center mb-4">
          <Search className="text-blue-500 mr-2" size={20} />
          <h1 className="text-2xl font-bold text-gray-900">
            Search Results for "{query}"
          </h1>
        </div>
        <p className="text-gray-600">
          Found {searchResults.length} result{searchResults.length !== 1 ? 's' : ''}
        </p>
      </div>

      {searchResults.length > 0 ? (
        <div className="space-y-4">
          {searchResults.map(topic => (
            <div
              key={topic.id}
              onClick={() => onTopicSelect(topic)}
              className="bg-white border rounded-lg p-6 hover:shadow-md transition-shadow cursor-pointer"
            >
              <h3 className="text-lg font-semibold text-gray-900 mb-2">{topic.title}</h3>
              <div className="text-gray-600 text-sm mb-3">
                Section: <span className="capitalize font-medium">{topic.section.replace('-', ' ')}</span>
              </div>
              <div className="text-gray-700 line-clamp-3">
                {topic.content.replace(/<[^>]*>/g, '').substring(0, 200)}...
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <Search className="mx-auto text-gray-400 mb-4" size={48} />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No results found</h3>
          <p className="text-gray-600">
            Try searching for terms like "workflow", "apex", "integration", or "lightning"
          </p>
        </div>
      )}
    </div>
  );
};