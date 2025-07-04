"use client";
import { createClient } from "@/lib/supabase/client";
import React, { useCallback, useEffect, useState } from "react";

interface SaintRecommendation {
  name: string;
  feast: string;
  patronage: string[];
  description: string;
  relevance: string;
  prayer: string;
}

interface AISaintRecommendationsProps {
  userMessage?: string;
  spiritualNeeds?: string[];
  lifeCircumstance?: string;
  onSaintSelected?: (saint: SaintRecommendation) => void;
}

export default function AISaintRecommendations({
  userMessage,
  spiritualNeeds = [],
  lifeCircumstance,
  onSaintSelected,
}: AISaintRecommendationsProps) {
  const [recommendations, setRecommendations] = useState<SaintRecommendation[]>(
    [],
  );
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedSaint, setSelectedSaint] =
    useState<SaintRecommendation | null>(null);
  const [showDetails, setShowDetails] = useState(false);

  const supabase = createClient();

  const generateRecommendations = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      // For now, use a simplified recommendation system
      // In a full implementation, this would call an AI endpoint
      const contextualRecommendations = getContextualSaintRecommendations({
        userMessage,
        spiritualNeeds,
        lifeCircumstance,
      });

      setRecommendations(contextualRecommendations);
    } catch (error) {
      console.error("Error generating saint recommendations:", error);
      setError("Failed to generate saint recommendations");
    } finally {
      setLoading(false);
    }
  }, [userMessage, spiritualNeeds, lifeCircumstance]);

  useEffect(() => {
    if (userMessage || spiritualNeeds.length > 0 || lifeCircumstance) {
      generateRecommendations();
    }
  }, [userMessage, spiritualNeeds, lifeCircumstance, generateRecommendations]);

  const handleSaintSelect = (saint: SaintRecommendation) => {
    setSelectedSaint(saint);
    if (onSaintSelected) {
      onSaintSelected(saint);
    }
  };

  const handleLearnMore = (saint: SaintRecommendation) => {
    setSelectedSaint(saint);
    setShowDetails(true);
  };

  if (loading) {
    return (
      <div className="bg-blue-50 p-4 rounded-lg border">
        <div className="animate-pulse">
          <div className="h-4 bg-gray-200 rounded w-3/4 mb-3"></div>
          <div className="space-y-2">
            <div className="h-3 bg-gray-200 rounded w-full"></div>
            <div className="h-3 bg-gray-200 rounded w-5/6"></div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 p-4 rounded-lg">
        <p className="text-red-700 text-sm">{error}</p>
      </div>
    );
  }

  if (recommendations.length === 0) {
    return null;
  }

  return (
    <div className="bg-blue-50 p-4 rounded-lg border">
      <div className="flex items-center space-x-2 mb-3">
        <span className="text-xl">👼</span>
        <h3 className="text-lg font-semibold text-blue-800">
          Saint Recommendations
        </h3>
      </div>

      <p className="text-blue-700 text-sm mb-4">
        These saints may offer special intercession for your current needs:
      </p>

      <div className="space-y-3">
        {recommendations.map((saint, index) => (
          <div
            key={`saint-rec-${index}-${saint.name.slice(0, 15).replace(/\s+/g, '-')}`}
            className="bg-white p-3 rounded border border-blue-200"
          >
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <h4 className="font-medium text-gray-900">{saint.name}</h4>
                <p className="text-sm text-gray-600 mt-1">{saint.relevance}</p>

                {saint.patronage.length > 0 && (
                  <div className="mt-2">
                    <div className="flex flex-wrap gap-1">
                      {saint.patronage.slice(0, 3).map((patron, pIndex) => (
                        <span
                          key={pIndex}
                          className="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full"
                        >
                          {patron}
                        </span>
                      ))}
                      {saint.patronage.length > 3 && (
                        <span className="text-xs text-gray-500">
                          +{saint.patronage.length - 3} more
                        </span>
                      )}
                    </div>
                  </div>
                )}
              </div>

              <div className="flex space-x-2 ml-3">
                <button
                  onClick={() => handleLearnMore(saint)}
                  className="text-blue-600 hover:text-blue-800 text-sm"
                >
                  Learn More
                </button>
                <button
                  onClick={() => handleSaintSelect(saint)}
                  className="bg-blue-600 text-white px-3 py-1 rounded text-sm hover:bg-blue-700"
                >
                  Choose
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Saint Details Modal */}
      {showDetails && selectedSaint && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-2xl w-full max-w-lg max-h-[80vh] overflow-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-semibold text-gray-900">
                  {selectedSaint.name}
                </h3>
                <button
                  onClick={() => setShowDetails(false)}
                  className="text-gray-500 hover:text-gray-700 text-xl"
                >
                  ×
                </button>
              </div>

              <div className="space-y-4">
                <div>
                  <h4 className="font-medium text-gray-800 mb-2">Feast Day</h4>
                  <p className="text-gray-700">{selectedSaint.feast}</p>
                </div>

                <div>
                  <h4 className="font-medium text-gray-800 mb-2">Patronage</h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedSaint.patronage.map((patron, index) => (
                      <span
                        key={`patron-${selectedSaint.name}-${index}-${patron.slice(0, 10)}`}
                        className="bg-blue-100 text-blue-800 text-sm px-2 py-1 rounded-full"
                      >
                        {patron}
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="font-medium text-gray-800 mb-2">About</h4>
                  <p className="text-gray-700">{selectedSaint.description}</p>
                </div>

                <div>
                  <h4 className="font-medium text-gray-800 mb-2">
                    Why This Saint
                  </h4>
                  <p className="text-gray-700">{selectedSaint.relevance}</p>
                </div>

                {selectedSaint.prayer && (
                  <div>
                    <h4 className="font-medium text-gray-800 mb-2">Prayer</h4>
                    <div className="bg-gray-50 p-3 rounded border italic">
                      <p className="text-gray-800">{selectedSaint.prayer}</p>
                    </div>
                  </div>
                )}

                <div className="flex space-x-3 pt-4">
                  <button
                    onClick={() => {
                      handleSaintSelect(selectedSaint);
                      setShowDetails(false);
                    }}
                    className="flex-1 bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
                  >
                    Choose This Saint
                  </button>
                  <button
                    onClick={() => setShowDetails(false)}
                    className="px-6 py-2 border border-gray-300 text-gray-700 rounded hover:bg-gray-50"
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// Simplified saint recommendation logic
function getContextualSaintRecommendations({
  userMessage,
  spiritualNeeds,
  lifeCircumstance,
}: {
  userMessage?: string;
  spiritualNeeds: string[];
  lifeCircumstance?: string;
}): SaintRecommendation[] {
  const saintDatabase: SaintRecommendation[] = [
    {
      name: "St. Dymphna",
      feast: "May 15",
      patronage: [
        "Mental Health",
        "Anxiety",
        "Depression",
        "Emotional Healing",
      ],
      description:
        "An Irish princess who fled to Belgium to escape her father's advances. She was martyred for her faith and purity, and is now the patron saint of those suffering from mental and nervous disorders.",
      relevance:
        "Perfect for those struggling with anxiety, stress, or mental health challenges.",
      prayer:
        "St. Dymphna, martyr of purity, patroness of those who suffer with nervous and mental afflictions, beloved child of Jesus and Mary, pray to Them for me and obtain my request. Amen.",
    },
    {
      name: "St. Joseph the Worker",
      feast: "May 1",
      patronage: ["Workers", "Employment", "Career", "Fathers", "Families"],
      description:
        "The foster father of Jesus and husband of Mary, St. Joseph was a carpenter who provided for the Holy Family through his honest work.",
      relevance:
        "Ideal for career guidance, job searches, and work-related challenges.",
      prayer:
        "St. Joseph, guardian of Jesus and chaste spouse of Mary, you passed your life in loving fulfillment of duty. Help me to work as you did, with conscience and skill, in whatever job I have to do. Amen.",
    },
    {
      name: "St. Anthony of Padua",
      feast: "June 13",
      patronage: ["Lost Things", "Lost People", "Lost Souls", "Students"],
      description:
        'Known as the "Hammer of Heretics" and "Wonder Worker," St. Anthony was a brilliant preacher and teacher who is famous for finding lost things.',
      relevance:
        "Call upon him when you've lost something physical or spiritual, or need help with studies.",
      prayer:
        "St. Anthony, perfect imitator of Jesus, who received from God the special power of restoring lost things, grant that I may find what I have lost. Amen.",
    },
    {
      name: "St. Thérèse of Lisieux",
      feast: "October 1",
      patronage: ["Missions", "Simple Trust", "Spiritual Childhood", "Roses"],
      description:
        'Known as "The Little Flower," she taught the "Little Way" of spiritual childhood, trusting completely in God\'s mercy and love.',
      relevance:
        "Perfect for those seeking simple trust in God and growth in spiritual life.",
      prayer:
        "St. Thérèse of the Child Jesus, pray for me that I may simplify my life and trust in God with the heart of a child. Amen.",
    },
    {
      name: "St. Raphael the Archangel",
      feast: "September 29",
      patronage: ["Healing", "Travelers", "Young People", "Happy Meetings"],
      description:
        'One of the three archangels mentioned by name in Scripture, Raphael means "God heals" and is known for bringing healing and protection.',
      relevance: "Invoke him for physical, emotional, or spiritual healing.",
      prayer:
        "St. Raphael the Archangel, pray for us and guide us in our journey toward healing and wholeness. Amen.",
    },
    {
      name: "St. Rita of Cascia",
      feast: "May 22",
      patronage: ["Impossible Causes", "Difficult Marriages", "Abuse Victims"],
      description:
        'Known as the "Saint of the Impossible," St. Rita endured an abusive marriage and later became an Augustinian nun, performing many miracles.',
      relevance:
        "Turn to her when facing seemingly impossible situations or difficult relationships.",
      prayer:
        "St. Rita, advocate of the impossible, pray for me in my time of need and help me trust in God's plan. Amen.",
    },
  ];

  const contextMatches: { saint: SaintRecommendation; score: number }[] = [];

  saintDatabase.forEach((saint) => {
    let score = 0;

    // Check spiritual needs
    spiritualNeeds.forEach((need) => {
      saint.patronage.forEach((patron) => {
        if (
          patron.toLowerCase().includes(need.toLowerCase()) ||
          need.toLowerCase().includes(patron.toLowerCase())
        ) {
          score += 3;
        }
      });
    });

    // Check user message content
    if (userMessage) {
      const message = userMessage.toLowerCase();
      saint.patronage.forEach((patron) => {
        if (message.includes(patron.toLowerCase())) {
          score += 2;
        }
      });

      // Keyword matching
      if (
        message.includes("anxiety") ||
        message.includes("worry") ||
        message.includes("stress")
      ) {
        if (saint.name.includes("Dymphna")) score += 5;
      }
      if (
        message.includes("work") ||
        message.includes("job") ||
        message.includes("career")
      ) {
        if (saint.name.includes("Joseph")) score += 5;
      }
      if (
        message.includes("lost") ||
        message.includes("find") ||
        message.includes("missing")
      ) {
        if (saint.name.includes("Anthony")) score += 5;
      }
      if (
        message.includes("healing") ||
        message.includes("sick") ||
        message.includes("health")
      ) {
        if (saint.name.includes("Raphael")) score += 5;
      }
      if (
        message.includes("impossible") ||
        message.includes("difficult") ||
        message.includes("hopeless")
      ) {
        if (saint.name.includes("Rita")) score += 5;
      }
    }

    // Check life circumstances
    if (lifeCircumstance) {
      const circumstance = lifeCircumstance.toLowerCase();
      saint.patronage.forEach((patron) => {
        if (circumstance.includes(patron.toLowerCase())) {
          score += 2;
        }
      });
    }

    if (score > 0) {
      contextMatches.push({ saint, score });
    }
  });

  // Sort by relevance score and return top 3
  contextMatches.sort((a, b) => b.score - a.score);

  // If no matches, return some default popular saints
  if (contextMatches.length === 0) {
    return [saintDatabase[1], saintDatabase[2], saintDatabase[3]]; // Joseph, Anthony, Thérèse
  }

  return contextMatches.slice(0, 3).map((match) => match.saint);
}
