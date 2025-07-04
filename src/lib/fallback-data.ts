// Fallback data for when database is not available
export const FALLBACK_FAITH_TRADITIONS = [
  { id: '1', name: 'Roman Catholic', description: 'Traditional Roman Catholic faith', created_at: null },
  { id: '2', name: 'Eastern Catholic', description: 'Eastern Catholic traditions', created_at: null },
  { id: '3', name: 'Orthodox Christian', description: 'Eastern Orthodox Christianity', created_at: null },
  { id: '4', name: 'Protestant Christian', description: 'Protestant Christian denominations', created_at: null },
  { id: '5', name: 'Anglican', description: 'Anglican/Episcopal tradition', created_at: null },
  { id: '6', name: 'Other Christian', description: 'Other Christian traditions', created_at: null },
  { id: '7', name: 'Exploring Faith', description: 'Currently exploring Catholic faith', created_at: null }
];

export const FALLBACK_SPIRITUAL_GUIDANCE = {
  guidance: "Peace be with you, dear soul. While our AI spiritual guidance is temporarily unavailable, know that God's love surrounds you always. In times of uncertainty, turn to prayer, scripture, and the wisdom of the saints. Remember the words of Jesus: 'Come to me, all you who are weary and burdened, and I will give you rest.' (Matthew 11:28)",
  saint: "St. Teresa of Avila",
  prayer: "Lord, grant me the serenity to accept the things I cannot change, the courage to change the things I can, and the wisdom to know the difference. Amen.",
  scripture: "Cast all your anxiety on him because he cares for you. - 1 Peter 5:7"
};

export const FALLBACK_SAINT_RECOMMENDATIONS = [
  {
    name: "St. Thérèse of Lisieux",
    feast_day: "October 1",
    patronage: "Missions, florists, loss of parents",
    short_bio: "Known as the 'Little Flower,' she taught the 'little way' of spiritual childhood.",
    why_recommended: "For those seeking simplicity and trust in God's love"
  },
  {
    name: "St. Francis of Assisi",
    feast_day: "October 4", 
    patronage: "Animals, environment, peace",
    short_bio: "Founded the Franciscan order and lived in radical poverty and joy.",
    why_recommended: "For those seeking peace and connection with creation"
  },
  {
    name: "St. Teresa of Avila",
    feast_day: "October 15",
    patronage: "Headache sufferers, people in religious orders",
    short_bio: "Mystic and Doctor of the Church who reformed the Carmelite order.",
    why_recommended: "For those seeking deeper prayer and mystical union with God"
  }
];

