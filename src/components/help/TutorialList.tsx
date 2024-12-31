import { BookOpen } from 'lucide-react';
import type { HelpArticle } from '../../data/helpContent';

interface TutorialListProps {
  articles: HelpArticle[];
}

export default function TutorialList({ articles }: TutorialListProps) {
  return (
    <div className="bg-white shadow rounded-lg p-6">
      <h2 className="text-lg font-medium text-gray-900 mb-4">Tutorials & Guides</h2>
      
      <div className="space-y-4">
        {articles.map((article) => (
          <article key={article.id} className="border-b border-gray-200 pb-4 last:border-0 last:pb-0">
            <div className="flex items-start">
              <div className="flex-shrink-0">
                <BookOpen className="h-6 w-6 text-blue-500" />
              </div>
              <div className="ml-4">
                <h3 className="text-sm font-medium text-gray-900">{article.title}</h3>
                <p className="mt-1 text-sm text-gray-500 line-clamp-2">{article.content}</p>
                <button className="mt-2 text-sm text-blue-600 hover:text-blue-500">
                  Read more
                </button>
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}