import { useState } from 'react';
import SearchBar from '../components/help/SearchBar';
import FAQSection from '../components/help/FAQSection';
import TutorialList from '../components/help/TutorialList';
import ContactSupport from '../components/help/ContactSupport';
import { helpArticles } from '../data/helpContent';

export default function Help() {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredArticles = searchQuery
    ? helpArticles.filter(article => 
        article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        article.content.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : helpArticles;

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-2xl font-semibold text-gray-900 mb-6">Help Center</h1>
      
      <SearchBar 
        value={searchQuery}
        onChange={setSearchQuery}
        placeholder="Search help articles..."
      />

      <div className="mt-8 space-y-8">
        {searchQuery ? (
          <div className="bg-white shadow rounded-lg p-6">
            <h2 className="text-lg font-medium text-gray-900 mb-4">
              Search Results ({filteredArticles.length})
            </h2>
            <TutorialList articles={filteredArticles} />
          </div>
        ) : (
          <>
            <FAQSection />
            <TutorialList articles={helpArticles} />
            <ContactSupport />
          </>
        )}
      </div>
    </div>
  );
}