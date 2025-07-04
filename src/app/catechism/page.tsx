"use client";
import { useState } from "react";
import { useTranslation } from "../../context/LanguageContext";

interface CatechismSection {
  id: string;
  number: number;
  title: string;
  part: number;
  section: number;
  chapter?: number;
  article?: number;
  content: string;
  tags: string[];
}

const CATECHISM_STRUCTURE = [
  {
    part: 1,
    title: "The Profession of Faith",
    sections: [
      { id: "creed", title: "I Believe - We Believe", articles: ["The Desire for God", "God Comes to Meet Man", "Man's Response to God"] },
      { id: "trinity", title: "I Believe in God the Father", articles: ["I Believe in God", "The Father", "The Almighty", "Creator"] },
      { id: "jesus", title: "I Believe in Jesus Christ", articles: ["And in Jesus Christ", "Conceived by the Holy Spirit", "Suffered, Died, and was Buried", "Rose from the Dead"] },
      { id: "spirit", title: "I Believe in the Holy Spirit", articles: ["I Believe in the Holy Spirit", "The One, Holy, Catholic, and Apostolic Church", "I Believe in the Forgiveness of Sins"] }
    ]
  },
  {
    part: 2,
    title: "The Celebration of the Christian Mystery",
    sections: [
      { id: "liturgy", title: "The Sacramental Economy", articles: ["The Paschal Mystery", "The Sacramental Celebration"] },
      { id: "sacraments", title: "The Seven Sacraments of the Church", articles: ["Sacraments of Initiation", "Sacraments of Healing", "Sacraments of Service"] }
    ]
  },
  {
    part: 3,
    title: "Life in Christ",
    sections: [
      { id: "dignity", title: "Man's Vocation: Life in the Spirit", articles: ["The Dignity of the Human Person", "The Human Community", "God's Salvation"] },
      { id: "commandments", title: "The Ten Commandments", articles: ["You Shall Love the Lord", "You Shall Love Your Neighbor"] }
    ]
  },
  {
    part: 4,
    title: "Christian Prayer",
    sections: [
      { id: "prayer-life", title: "Prayer in the Christian Life", articles: ["The Revelation of Prayer", "The Tradition of Prayer", "The Life of Prayer"] },
      { id: "lords-prayer", title: "The Lord's Prayer: 'Our Father!'", articles: ["The Summary of the Gospel", "Our Father Who Art in Heaven", "The Seven Petitions"] }
    ]
  }
];

const SAMPLE_CATECHISM_ENTRIES: CatechismSection[] = [
  {
    id: "ccc-1",
    number: 1,
    title: "The Desire for God",
    part: 1,
    section: 1,
    chapter: 1,
    article: 1,
    content: "The desire for God is written in the human heart, because man is created by God and for God; and God never ceases to draw man to himself. Only in God will he find the truth and happiness he never stops searching for.",
    tags: ["God", "human nature", "desire", "truth", "happiness"]
  },
  {
    id: "ccc-27",
    number: 27,
    title: "The Desire for God",
    part: 1,
    section: 1,
    chapter: 1,
    article: 1,
    content: "The desire for God is written in the human heart, because man is created by God and for God; and God never ceases to draw man to himself. Only in God will he find the truth and happiness he never stops searching for.",
    tags: ["God", "human nature", "creation"]
  },
  {
    id: "ccc-2559",
    number: 2559,
    title: "Prayer as God's Gift",
    part: 4,
    section: 1,
    chapter: 1,
    article: 1,
    content: "Prayer is the raising of one's mind and heart to God or the requesting of good things from God. But when we pray, do we speak from the height of our pride and will, or 'out of the depths' of a humble and contrite heart?",
    tags: ["prayer", "humility", "heart", "mind"]
  }
];

export default function CatechismPage() {
  const { t } = useTranslation();
  const [selectedPart, setSelectedPart] = useState<number>(1);
  const [selectedSection, setSelectedSection] = useState<string>("");
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<CatechismSection[]>([]);
  const [showSearch, setShowSearch] = useState(false);

  const handleSearch = () => {
    if (!searchQuery.trim()) {
      setSearchResults([]);
      return;
    }

    const results = SAMPLE_CATECHISM_ENTRIES.filter(entry =>
      entry.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
      entry.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      entry.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
    );
    setSearchResults(results);
    setShowSearch(true);
  };

  const currentPart = CATECHISM_STRUCTURE.find(part => part.part === selectedPart);

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-red-50 dark:from-gray-900 dark:via-orange-900 dark:to-red-900">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 dark:text-white mb-4">
            📜 Catechism of the Catholic Church
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Explore the complete teaching of the Catholic Church. The Catechism presents Catholic doctrine in a systematic way, covering faith, sacraments, moral life, and prayer.
          </p>
        </div>

        {/* Search Section */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 mb-8">
          <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-4">
            🔍 Search the Catechism
          </h2>
          <div className="flex gap-4">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
              placeholder="Search by topic, keyword, or paragraph number..."
              className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-orange-500 dark:bg-gray-700 dark:text-white"
            />
            <button
              onClick={handleSearch}
              className="px-6 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors"
            >
              Search
            </button>
          </div>

          {/* Search Results */}
          {showSearch && (
            <div className="mt-6">
              <h3 className="font-semibold text-gray-800 dark:text-white mb-4">
                Search Results ({searchResults.length})
              </h3>
              {searchResults.length > 0 ? (
                <div className="space-y-4">
                  {searchResults.map((result) => (
                    <div key={result.id} className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                      <div className="flex justify-between items-start mb-2">
                        <h4 className="font-semibold text-orange-600 dark:text-orange-400">
                          CCC {result.number}: {result.title}
                        </h4>
                        <span className="text-sm text-gray-500 dark:text-gray-400">
                          Part {result.part}
                        </span>
                      </div>
                      <p className="text-gray-700 dark:text-gray-300 mb-2">
                        {result.content}
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {result.tags.map((tag) => (
                          <span
                            key={tag}
                            className="px-2 py-1 bg-orange-100 dark:bg-orange-900 text-orange-800 dark:text-orange-200 text-xs rounded-full"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-600 dark:text-gray-400 italic">
                  No results found for "{searchQuery}". Try different keywords or browse by parts below.
                </p>
              )}
            </div>
          )}
        </div>

        {/* Part Navigation */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 mb-8">
          <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-4">
            📚 Browse by Parts
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            {CATECHISM_STRUCTURE.map((part) => (
              <button
                key={part.part}
                onClick={() => {
                  setSelectedPart(part.part);
                  setShowSearch(false);
                }}
                className={`p-4 rounded-lg text-left transition-colors ${
                  selectedPart === part.part
                    ? 'bg-orange-600 text-white'
                    : 'bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-white hover:bg-orange-100 dark:hover:bg-orange-900'
                }`}
              >
                <div className="font-semibold mb-2">Part {part.part}</div>
                <div className="text-sm">{part.title}</div>
              </button>
            ))}
          </div>

          {/* Current Part Details */}
          {currentPart && !showSearch && (
            <div>
              <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">
                Part {currentPart.part}: {currentPart.title}
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {currentPart.sections.map((section, index) => (
                  <div
                    key={section.id}
                    className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg cursor-pointer hover:bg-orange-50 dark:hover:bg-orange-900 transition-colors"
                    onClick={() => setSelectedSection(section.id)}
                  >
                    <h4 className="font-semibold text-orange-600 dark:text-orange-400 mb-2">
                      Section {index + 1}: {section.title}
                    </h4>
                    <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                      {section.articles.map((article, articleIndex) => (
                        <li key={articleIndex} className="flex items-start">
                          <span className="mr-2">•</span>
                          <span>{article}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Quick Access Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
            <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-4 flex items-center">
              ✝️ The Creed
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              What the Church believes and teaches about God, Jesus Christ, and the Holy Spirit.
            </p>
            <button
              onClick={() => {
                setSelectedPart(1);
                setShowSearch(false);
              }}
              className="text-orange-600 dark:text-orange-400 hover:underline"
            >
              Explore Part 1 →
            </button>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
            <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-4 flex items-center">
              ⛪ The Sacraments
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              The seven sacraments and the liturgical life of the Church.
            </p>
            <button
              onClick={() => {
                setSelectedPart(2);
                setShowSearch(false);
              }}
              className="text-orange-600 dark:text-orange-400 hover:underline"
            >
              Explore Part 2 →
            </button>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
            <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-4 flex items-center">
              🙏 Prayer
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              The meaning and importance of prayer in the Christian life.
            </p>
            <button
              onClick={() => {
                setSelectedPart(4);
                setShowSearch(false);
              }}
              className="text-orange-600 dark:text-orange-400 hover:underline"
            >
              Explore Part 4 →
            </button>
          </div>
        </div>

        {/* Footer Info */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
          <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-4">
            📖 About the Catechism
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm text-gray-600 dark:text-gray-400">
            <div>
              <h4 className="font-semibold text-orange-600 dark:text-orange-400 mb-2">
                Structure
              </h4>
              <p>
                The Catechism is organized into four parts: the Creed (faith), the Sacraments (celebration), 
                the Commandments (life), and Prayer. It contains 2,865 numbered paragraphs.
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-orange-600 dark:text-orange-400 mb-2">
                Authority
              </h4>
              <p>
                Published in 1992 by Pope John Paul II, the Catechism is the official teaching of the 
                Catholic Church and serves as a reference for all Catholics worldwide.
              </p>
            </div>
          </div>
          <div className="mt-4 p-4 bg-orange-50 dark:bg-orange-900 rounded-lg">
            <p className="text-sm text-orange-800 dark:text-orange-200">
              <strong>🔗 Integration Note:</strong> This is a framework for the complete Catechism. 
              Full integration would include all 2,865 paragraphs with cross-references, 
              search functionality, and connections to related Bible passages and Church documents.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

