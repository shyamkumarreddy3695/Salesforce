export interface Topic {
  id: string;
  title: string;
  section: string;
  content: string;
  examples: Example[];
  keyPoints: string[];
  limitations?: string[];
  architecturalConsiderations?: string[];
}

export interface Example {
  title: string;
  description: string;
  code?: string;
  language?: string;
  explanation: string;
}