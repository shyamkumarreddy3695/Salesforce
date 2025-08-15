import React from 'react';
import { AlertCircle, CheckCircle, Code, FileText, Lightbulb } from 'lucide-react';
import type { Topic } from '../types';

interface TopicContentProps {
  topic: Topic;
}

export const TopicContent: React.FC<TopicContentProps> = ({ topic }) => {
  return (
    <div className="max-w-4xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">{topic.title}</h1>
        <div className="prose prose-lg max-w-none text-gray-700">
          <div dangerouslySetInnerHTML={{ __html: topic.content }} />
        </div>
      </div>

      {/* Key Points */}
      {topic.keyPoints.length > 0 && (
        <div className="mb-8">
          <div className="flex items-center mb-4">
            <CheckCircle className="text-green-500 mr-2" size={20} />
            <h2 className="text-xl font-semibold text-gray-900">Key Points</h2>
          </div>
          <div className="bg-green-50 border-l-4 border-green-400 p-4 rounded-r-lg">
            <ul className="space-y-2">
              {topic.keyPoints.map((point, index) => (
                <li key={index} className="flex items-start">
                  <span className="text-green-500 mr-2">•</span>
                  <span className="text-gray-700">{point}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}

      {/* Examples */}
      {topic.examples.length > 0 && (
        <div className="mb-8">
          <div className="flex items-center mb-4">
            <Code className="text-blue-500 mr-2" size={20} />
            <h2 className="text-xl font-semibold text-gray-900">Industry Examples</h2>
          </div>
          <div className="space-y-6">
            {topic.examples.map((example, index) => (
              <div key={index} className="bg-white border rounded-lg overflow-hidden shadow-sm">
                <div className="bg-gray-50 px-4 py-3 border-b">
                  <h3 className="font-semibold text-gray-900">{example.title}</h3>
                  <p className="text-sm text-gray-600 mt-1">{example.description}</p>
                </div>
                
                {example.code && (
                  <div className="bg-gray-900 text-gray-100 p-4 overflow-x-auto">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs text-gray-400 uppercase">
                        {example.language || 'Code'}
                      </span>
                    </div>
                    <pre className="text-sm">
                      <code>{example.code}</code>
                    </pre>
                  </div>
                )}
                
                <div className="p-4">
                  <div className="flex items-start">
                    <FileText className="text-gray-400 mr-2 mt-1 flex-shrink-0" size={16} />
                    <div className="text-gray-700 text-sm">{example.explanation}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Architectural Considerations */}
      {topic.architecturalConsiderations && topic.architecturalConsiderations.length > 0 && (
        <div className="mb-8">
          <div className="flex items-center mb-4">
            <Lightbulb className="text-yellow-500 mr-2" size={20} />
            <h2 className="text-xl font-semibold text-gray-900">Architectural Considerations</h2>
          </div>
          <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded-r-lg">
            <ul className="space-y-2">
              {topic.architecturalConsiderations.map((consideration, index) => (
                <li key={index} className="flex items-start">
                  <span className="text-yellow-500 mr-2">•</span>
                  <span className="text-gray-700">{consideration}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}

      {/* Limitations */}
      {topic.limitations && topic.limitations.length > 0 && (
        <div className="mb-8">
          <div className="flex items-center mb-4">
            <AlertCircle className="text-red-500 mr-2" size={20} />
            <h2 className="text-xl font-semibold text-gray-900">Limitations & Considerations</h2>
          </div>
          <div className="bg-red-50 border-l-4 border-red-400 p-4 rounded-r-lg">
            <ul className="space-y-2">
              {topic.limitations.map((limitation, index) => (
                <li key={index} className="flex items-start">
                  <span className="text-red-500 mr-2">•</span>
                  <span className="text-gray-700">{limitation}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};