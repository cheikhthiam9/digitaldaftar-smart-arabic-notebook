// User types
export interface User {
  id: string;
  email: string;
  name: string;
  avatarUrl?: string;
  preferredLanguage: 'fr' | 'en';
  subscription: SubscriptionPlan;
  createdAt: Date;
}

export type SubscriptionPlan = 'free' | 'premium';

// Vocabulary types
export interface VocabularyItem {
  id: string;
  userId: string;
  arabicText: string;
  translation: string;
  transliteration?: string;
  partOfSpeech?: PartOfSpeech;
  root?: string;
  exampleSentence?: string;
  exampleTranslation?: string;
  notes?: string;
  category?: string;
  difficulty: number; // 1-5
  isFavorite: boolean;
  reviewCount: number;
  lastReviewedAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}

export type PartOfSpeech = 
  | 'noun' 
  | 'verb' 
  | 'adjective' 
  | 'adverb' 
  | 'preposition' 
  | 'pronoun' 
  | 'conjunction' 
  | 'interjection'
  | 'particle';

// Translation types
export interface TranslationResult {
  sourceText: string;
  sourceLanguage: 'ar' | 'fr' | 'en';
  targetLanguage: 'ar' | 'fr' | 'en';
  translation: string;
  wordBreakdown?: WordBreakdown[];
  exampleSentence?: string;
  exampleTranslation?: string;
}

export interface WordBreakdown {
  arabic: string;
  root?: string;
  partOfSpeech?: PartOfSpeech;
  translation: string;
}

// Quiz types
export interface QuizConfig {
  wordCount: 10 | 20 | 50 | 'all';
  filters: QuizFilter[];
  mode: 'arabic-to-translation' | 'translation-to-arabic';
}

export type QuizFilter = 'recent' | 'favorites' | 'category' | 'difficulty';

export interface QuizResult {
  totalWords: number;
  correctCount: number;
  incorrectCount: number;
  timeTaken: number; // in seconds
  incorrectWords: VocabularyItem[];
  date: Date;
}

// Auth types
export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface SignupCredentials {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}
