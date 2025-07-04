// Bible API Integration with Catholic Bible Support
// Supports API.Bible (primary) and Bible-API.com (fallback)

interface BibleVerse {
  reference: string;
  text: string;
  translation: string;
  book: string;
  chapter: number;
  verse: number;
}

interface BiblePassage {
  reference: string;
  verses: BibleVerse[];
  translation: string;
}

interface BibleBook {
  id: string;
  name: string;
  testament: 'Old' | 'New';
  chapters: number;
}

// Catholic Bible Books (73 books including Deuterocanonical)
export const CATHOLIC_BIBLE_BOOKS: BibleBook[] = [
  // Old Testament (46 books)
  { id: 'GEN', name: 'Genesis', testament: 'Old', chapters: 50 },
  { id: 'EXO', name: 'Exodus', testament: 'Old', chapters: 40 },
  { id: 'LEV', name: 'Leviticus', testament: 'Old', chapters: 27 },
  { id: 'NUM', name: 'Numbers', testament: 'Old', chapters: 36 },
  { id: 'DEU', name: 'Deuteronomy', testament: 'Old', chapters: 34 },
  { id: 'JOS', name: 'Joshua', testament: 'Old', chapters: 24 },
  { id: 'JDG', name: 'Judges', testament: 'Old', chapters: 21 },
  { id: 'RUT', name: 'Ruth', testament: 'Old', chapters: 4 },
  { id: '1SA', name: '1 Samuel', testament: 'Old', chapters: 31 },
  { id: '2SA', name: '2 Samuel', testament: 'Old', chapters: 24 },
  { id: '1KI', name: '1 Kings', testament: 'Old', chapters: 22 },
  { id: '2KI', name: '2 Kings', testament: 'Old', chapters: 25 },
  { id: '1CH', name: '1 Chronicles', testament: 'Old', chapters: 29 },
  { id: '2CH', name: '2 Chronicles', testament: 'Old', chapters: 36 },
  { id: 'EZR', name: 'Ezra', testament: 'Old', chapters: 10 },
  { id: 'NEH', name: 'Nehemiah', testament: 'Old', chapters: 13 },
  { id: 'TOB', name: 'Tobit', testament: 'Old', chapters: 14 },
  { id: 'JDT', name: 'Judith', testament: 'Old', chapters: 16 },
  { id: 'EST', name: 'Esther', testament: 'Old', chapters: 16 },
  { id: 'JOB', name: 'Job', testament: 'Old', chapters: 42 },
  { id: 'PSA', name: 'Psalms', testament: 'Old', chapters: 150 },
  { id: 'PRO', name: 'Proverbs', testament: 'Old', chapters: 31 },
  { id: 'ECC', name: 'Ecclesiastes', testament: 'Old', chapters: 12 },
  { id: 'SNG', name: 'Song of Songs', testament: 'Old', chapters: 8 },
  { id: 'WIS', name: 'Wisdom', testament: 'Old', chapters: 19 },
  { id: 'SIR', name: 'Sirach', testament: 'Old', chapters: 51 },
  { id: 'ISA', name: 'Isaiah', testament: 'Old', chapters: 66 },
  { id: 'JER', name: 'Jeremiah', testament: 'Old', chapters: 52 },
  { id: 'LAM', name: 'Lamentations', testament: 'Old', chapters: 5 },
  { id: 'BAR', name: 'Baruch', testament: 'Old', chapters: 6 },
  { id: 'EZK', name: 'Ezekiel', testament: 'Old', chapters: 48 },
  { id: 'DAN', name: 'Daniel', testament: 'Old', chapters: 14 },
  { id: 'HOS', name: 'Hosea', testament: 'Old', chapters: 14 },
  { id: 'JOL', name: 'Joel', testament: 'Old', chapters: 3 },
  { id: 'AMO', name: 'Amos', testament: 'Old', chapters: 9 },
  { id: 'OBA', name: 'Obadiah', testament: 'Old', chapters: 1 },
  { id: 'JON', name: 'Jonah', testament: 'Old', chapters: 4 },
  { id: 'MIC', name: 'Micah', testament: 'Old', chapters: 7 },
  { id: 'NAM', name: 'Nahum', testament: 'Old', chapters: 3 },
  { id: 'HAB', name: 'Habakkuk', testament: 'Old', chapters: 3 },
  { id: 'ZEP', name: 'Zephaniah', testament: 'Old', chapters: 3 },
  { id: 'HAG', name: 'Haggai', testament: 'Old', chapters: 2 },
  { id: 'ZEC', name: 'Zechariah', testament: 'Old', chapters: 14 },
  { id: 'MAL', name: 'Malachi', testament: 'Old', chapters: 4 },
  { id: '1MA', name: '1 Maccabees', testament: 'Old', chapters: 16 },
  { id: '2MA', name: '2 Maccabees', testament: 'Old', chapters: 15 },

  // New Testament (27 books)
  { id: 'MAT', name: 'Matthew', testament: 'New', chapters: 28 },
  { id: 'MRK', name: 'Mark', testament: 'New', chapters: 16 },
  { id: 'LUK', name: 'Luke', testament: 'New', chapters: 24 },
  { id: 'JHN', name: 'John', testament: 'New', chapters: 21 },
  { id: 'ACT', name: 'Acts', testament: 'New', chapters: 28 },
  { id: 'ROM', name: 'Romans', testament: 'New', chapters: 16 },
  { id: '1CO', name: '1 Corinthians', testament: 'New', chapters: 16 },
  { id: '2CO', name: '2 Corinthians', testament: 'New', chapters: 13 },
  { id: 'GAL', name: 'Galatians', testament: 'New', chapters: 6 },
  { id: 'EPH', name: 'Ephesians', testament: 'New', chapters: 6 },
  { id: 'PHP', name: 'Philippians', testament: 'New', chapters: 4 },
  { id: 'COL', name: 'Colossians', testament: 'New', chapters: 4 },
  { id: '1TH', name: '1 Thessalonians', testament: 'New', chapters: 5 },
  { id: '2TH', name: '2 Thessalonians', testament: 'New', chapters: 3 },
  { id: '1TI', name: '1 Timothy', testament: 'New', chapters: 6 },
  { id: '2TI', name: '2 Timothy', testament: 'New', chapters: 4 },
  { id: 'TIT', name: 'Titus', testament: 'New', chapters: 3 },
  { id: 'PHM', name: 'Philemon', testament: 'New', chapters: 1 },
  { id: 'HEB', name: 'Hebrews', testament: 'New', chapters: 13 },
  { id: 'JAS', name: 'James', testament: 'New', chapters: 5 },
  { id: '1PE', name: '1 Peter', testament: 'New', chapters: 5 },
  { id: '2PE', name: '2 Peter', testament: 'New', chapters: 3 },
  { id: '1JN', name: '1 John', testament: 'New', chapters: 5 },
  { id: '2JN', name: '2 John', testament: 'New', chapters: 1 },
  { id: '3JN', name: '3 John', testament: 'New', chapters: 1 },
  { id: 'JUD', name: 'Jude', testament: 'New', chapters: 1 },
  { id: 'REV', name: 'Revelation', testament: 'New', chapters: 22 },
];

// API Configuration
const API_BIBLE_BASE_URL = 'https://api.scripture.api.bible/v1';
const BIBLE_API_BASE_URL = 'https://bible-api.com';

// Catholic Bible Translation IDs
const DOUAY_RHEIMS_API_BIBLE = '179568874c45066f-01'; // API.Bible
const DOUAY_RHEIMS_BIBLE_API = 'dra'; // Bible-API.com

class BibleAPIService {
  private apiKey: string | null = null;

  constructor() {
    this.apiKey = process.env.NEXT_PUBLIC_API_BIBLE_KEY || null;
  }

  // Primary API: API.Bible (Douay-Rheims)
  private async fetchFromAPIBible(reference: string): Promise<BiblePassage | null> {
    if (!this.apiKey) {
      console.log('API.Bible key not available, falling back to Bible-API.com');
      return null;
    }

    try {
      const response = await fetch(
        `${API_BIBLE_BASE_URL}/bibles/${DOUAY_RHEIMS_API_BIBLE}/passages/${reference}?content-type=text&include-notes=false&include-titles=true&include-chapter-numbers=false&include-verse-numbers=true&include-verse-spans=false`,
        {
          headers: {
            'api-key': this.apiKey,
          },
        }
      );

      if (!response.ok) {
        throw new Error(`API.Bible error: ${response.status}`);
      }

      const data = await response.json();
      
      if (data.data && data.data.content) {
        return {
          reference: data.data.reference,
          verses: this.parseAPIBibleContent(data.data.content, reference),
          translation: 'Douay-Rheims American 1899',
        };
      }

      return null;
    } catch (error) {
      console.error('API.Bible fetch error:', error);
      return null;
    }
  }

  // Fallback API: Bible-API.com (Douay-Rheims)
  private async fetchFromBibleAPI(reference: string): Promise<BiblePassage | null> {
    try {
      const response = await fetch(
        `${BIBLE_API_BASE_URL}/${reference}?translation=${DOUAY_RHEIMS_BIBLE_API}`
      );

      if (!response.ok) {
        throw new Error(`Bible-API.com error: ${response.status}`);
      }

      const data = await response.json();
      
      if (data.verses && data.verses.length > 0) {
        return {
          reference: data.reference,
          verses: data.verses.map((verse: any) => ({
            reference: `${verse.book_name} ${verse.chapter}:${verse.verse}`,
            text: verse.text,
            translation: 'Douay-Rheims 1899 American Edition',
            book: verse.book_name,
            chapter: verse.chapter,
            verse: verse.verse,
          })),
          translation: 'Douay-Rheims 1899 American Edition',
        };
      }

      return null;
    } catch (error) {
      console.error('Bible-API.com fetch error:', error);
      return null;
    }
  }

  // Parse API.Bible content into verses
  private parseAPIBibleContent(content: string, reference: string): BibleVerse[] {
    // Simple parsing - in production, you'd want more sophisticated parsing
    const verses: BibleVerse[] = [];
    const lines = content.split('\n').filter(line => line.trim());
    
    lines.forEach((line, index) => {
      if (line.trim()) {
        verses.push({
          reference: `${reference}:${index + 1}`,
          text: line.trim(),
          translation: 'Douay-Rheims American 1899',
          book: reference.split(' ')[0],
          chapter: parseInt(reference.split(' ')[1]) || 1,
          verse: index + 1,
        });
      }
    });

    return verses;
  }

  // Main public method with fallback chain
  public async getPassage(reference: string): Promise<BiblePassage | null> {
    // Try API.Bible first
    let result = await this.fetchFromAPIBible(reference);
    
    if (result) {
      return result;
    }

    // Fallback to Bible-API.com
    result = await this.fetchFromBibleAPI(reference);
    
    if (result) {
      return result;
    }

    // Ultimate fallback: return a spiritual message
    return {
      reference: reference,
      verses: [{
        reference: reference,
        text: "The Lord is my shepherd; I shall not want. He maketh me to lie down in green pastures: he leadeth me beside the still waters. He restoreth my soul.",
        translation: 'Psalm 23:1-3 (Douay-Rheims)',
        book: 'Psalms',
        chapter: 23,
        verse: 1,
      }],
      translation: 'Fallback Scripture',
    };
  }

  // Get random verse for daily inspiration
  public async getRandomVerse(): Promise<BibleVerse | null> {
    try {
      // Try Bible-API.com random endpoint first (simpler)
      const response = await fetch(`${BIBLE_API_BASE_URL}/data/${DOUAY_RHEIMS_BIBLE_API}/random`);
      
      if (response.ok) {
        const data = await response.json();
        return {
          reference: data.reference,
          text: data.text,
          translation: 'Douay-Rheims 1899 American Edition',
          book: data.book_name || 'Scripture',
          chapter: data.chapter || 1,
          verse: data.verse || 1,
        };
      }
    } catch (error) {
      console.error('Random verse fetch error:', error);
    }

    // Fallback to predefined inspirational verses
    const inspirationalVerses = [
      {
        reference: 'John 3:16',
        text: 'For God so loved the world, as to give his only begotten Son; that whosoever believeth in him, may not perish, but may have life everlasting.',
        translation: 'Douay-Rheims',
        book: 'John',
        chapter: 3,
        verse: 16,
      },
      {
        reference: 'Psalm 23:1',
        text: 'The Lord ruleth me: and I shall want nothing.',
        translation: 'Douay-Rheims',
        book: 'Psalms',
        chapter: 23,
        verse: 1,
      },
      {
        reference: 'Matthew 11:28',
        text: 'Come to me, all you that labour, and are burdened, and I will refresh you.',
        translation: 'Douay-Rheims',
        book: 'Matthew',
        chapter: 11,
        verse: 28,
      },
    ];

    return inspirationalVerses[Math.floor(Math.random() * inspirationalVerses.length)];
  }

  // Search for verses containing specific text
  public async searchVerses(query: string): Promise<BibleVerse[]> {
    // This would require a more sophisticated search API
    // For now, return a simple implementation
    const commonSearches: { [key: string]: BibleVerse } = {
      'love': {
        reference: '1 Corinthians 13:4',
        text: 'Charity is patient, is kind: charity envieth not, dealeth not perversely; is not puffed up;',
        translation: 'Douay-Rheims',
        book: '1 Corinthians',
        chapter: 13,
        verse: 4,
      },
      'peace': {
        reference: 'John 14:27',
        text: 'Peace I leave with you, my peace I give unto you: not as the world giveth, do I give unto you. Let not your heart be troubled, nor let it be afraid.',
        translation: 'Douay-Rheims',
        book: 'John',
        chapter: 14,
        verse: 27,
      },
      'hope': {
        reference: 'Romans 15:13',
        text: 'Now the God of hope fill you with all joy and peace in believing; that you may abound in hope, and in the power of the Holy Ghost.',
        translation: 'Douay-Rheims',
        book: 'Romans',
        chapter: 15,
        verse: 13,
      },
    };

    const lowerQuery = query.toLowerCase();
    const matches = Object.keys(commonSearches).filter(key => 
      lowerQuery.includes(key) || key.includes(lowerQuery)
    );

    return matches.map(key => commonSearches[key]);
  }

  // Get book information
  public getBook(bookId: string): BibleBook | null {
    return CATHOLIC_BIBLE_BOOKS.find(book => 
      book.id.toLowerCase() === bookId.toLowerCase() ||
      book.name.toLowerCase() === bookId.toLowerCase()
    ) || null;
  }

  // Get all books by testament
  public getBooksByTestament(testament: 'Old' | 'New'): BibleBook[] {
    return CATHOLIC_BIBLE_BOOKS.filter(book => book.testament === testament);
  }
}

// Export singleton instance
export const bibleAPI = new BibleAPIService();

// Export types
export type { BibleVerse, BiblePassage, BibleBook };

