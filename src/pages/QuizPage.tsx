import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Brain, Play, RotateCcw, Check, X, Trophy, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { cn } from '@/lib/utils';
import type { VocabularyItem, QuizResult } from '@/types';

// Mock vocabulary for quiz
const quizVocabulary: VocabularyItem[] = [
  { id: '1', userId: '1', arabicText: 'كتاب', translation: 'Book', difficulty: 2, isFavorite: true, reviewCount: 5, createdAt: new Date(), updatedAt: new Date() },
  { id: '2', userId: '1', arabicText: 'مرحبا', translation: 'Hello', difficulty: 1, isFavorite: false, reviewCount: 10, createdAt: new Date(), updatedAt: new Date() },
  { id: '3', userId: '1', arabicText: 'شكرا', translation: 'Thank you', difficulty: 1, isFavorite: true, reviewCount: 15, createdAt: new Date(), updatedAt: new Date() },
  { id: '4', userId: '1', arabicText: 'ماء', translation: 'Water', difficulty: 2, isFavorite: false, reviewCount: 3, createdAt: new Date(), updatedAt: new Date() },
  { id: '5', userId: '1', arabicText: 'يكتب', translation: 'He writes', difficulty: 3, isFavorite: false, reviewCount: 2, createdAt: new Date(), updatedAt: new Date() },
];

type QuizState = 'config' | 'playing' | 'results';
type QuizMode = 'arabic-to-translation' | 'translation-to-arabic';

export default function QuizPage() {
  const [quizState, setQuizState] = useState<QuizState>('config');
  const [quizMode, setQuizMode] = useState<QuizMode>('arabic-to-translation');
  const [wordCount, setWordCount] = useState<number>(5);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [results, setResults] = useState<{ correct: boolean; word: VocabularyItem }[]>([]);
  const [startTime, setStartTime] = useState<Date | null>(null);

  const quizWords = quizVocabulary.slice(0, wordCount);
  const currentWord = quizWords[currentIndex];
  const progress = ((currentIndex + 1) / quizWords.length) * 100;

  const startQuiz = () => {
    setQuizState('playing');
    setCurrentIndex(0);
    setIsFlipped(false);
    setResults([]);
    setStartTime(new Date());
  };

  const handleAnswer = (correct: boolean) => {
    setResults((prev) => [...prev, { correct, word: currentWord }]);
    
    if (currentIndex < quizWords.length - 1) {
      setCurrentIndex((prev) => prev + 1);
      setIsFlipped(false);
    } else {
      setQuizState('results');
    }
  };

  const resetQuiz = () => {
    setQuizState('config');
    setCurrentIndex(0);
    setIsFlipped(false);
    setResults([]);
  };

  const correctCount = results.filter((r) => r.correct).length;
  const incorrectCount = results.filter((r) => !r.correct).length;
  const accuracy = results.length > 0 ? Math.round((correctCount / results.length) * 100) : 0;
  const timeTaken = startTime ? Math.round((new Date().getTime() - startTime.getTime()) / 1000) : 0;

  return (
    <div className="min-h-screen bg-background pb-24 md:pb-8">
      <div className="container mx-auto px-4 py-6 max-w-2xl">
        {/* Header */}
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
            <Brain className="w-5 h-5 text-primary" />
          </div>
          <div>
            <h1 className="text-xl font-semibold">Quiz</h1>
            <p className="text-sm text-muted-foreground">Practice your vocabulary</p>
          </div>
        </div>

        {/* Quiz Config */}
        {quizState === 'config' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-card rounded-2xl border border-border shadow-sm p-6"
          >
            <h2 className="text-lg font-semibold mb-6 text-center">Configure Your Quiz</h2>

            {/* Word count */}
            <div className="mb-6">
              <p className="text-sm font-medium mb-3">Number of Words</p>
              <div className="flex gap-2">
                {[5, 10, 20].map((count) => (
                  <button
                    key={count}
                    onClick={() => setWordCount(Math.min(count, quizVocabulary.length))}
                    className={cn(
                      'flex-1 py-3 rounded-xl font-medium transition-all',
                      wordCount === count
                        ? 'bg-primary text-primary-foreground'
                        : 'bg-muted text-muted-foreground hover:bg-muted/80'
                    )}
                  >
                    {count}
                  </button>
                ))}
              </div>
            </div>

            {/* Quiz mode */}
            <div className="mb-8">
              <p className="text-sm font-medium mb-3">Quiz Mode</p>
              <div className="space-y-2">
                <button
                  onClick={() => setQuizMode('arabic-to-translation')}
                  className={cn(
                    'w-full p-4 rounded-xl border-2 text-left transition-all',
                    quizMode === 'arabic-to-translation'
                      ? 'border-primary bg-primary/5'
                      : 'border-border hover:border-primary/50'
                  )}
                >
                  <p className="font-medium">Arabic → Translation</p>
                  <p className="text-sm text-muted-foreground">See Arabic, guess the meaning</p>
                </button>
                <button
                  onClick={() => setQuizMode('translation-to-arabic')}
                  className={cn(
                    'w-full p-4 rounded-xl border-2 text-left transition-all',
                    quizMode === 'translation-to-arabic'
                      ? 'border-primary bg-primary/5'
                      : 'border-border hover:border-primary/50'
                  )}
                >
                  <p className="font-medium">Translation → Arabic</p>
                  <p className="text-sm text-muted-foreground">See meaning, recall the Arabic</p>
                </button>
              </div>
            </div>

            <Button variant="hero" size="lg" className="w-full" onClick={startQuiz}>
              <Play className="w-5 h-5 mr-2" />
              Start Quiz
            </Button>
          </motion.div>
        )}

        {/* Quiz Playing */}
        {quizState === 'playing' && currentWord && (
          <div>
            {/* Progress */}
            <div className="mb-6">
              <div className="flex items-center justify-between mb-2">
                <Button variant="ghost" size="sm" onClick={resetQuiz}>
                  <ArrowLeft className="w-4 h-4 mr-1" />
                  Quit
                </Button>
                <span className="text-sm font-medium">
                  {currentIndex + 1} / {quizWords.length}
                </span>
              </div>
              <Progress value={progress} className="h-2" />
            </div>

            {/* Flashcard */}
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="perspective-1000"
            >
              <div
                onClick={() => setIsFlipped(!isFlipped)}
                className={cn(
                  'relative w-full aspect-[3/4] max-h-[400px] cursor-pointer',
                  'transform-style-3d transition-transform duration-500',
                  isFlipped && 'rotate-y-180'
                )}
                style={{
                  transformStyle: 'preserve-3d',
                  transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)',
                }}
              >
                {/* Front */}
                <div
                  className="absolute inset-0 bg-card rounded-3xl border border-border shadow-lg flex flex-col items-center justify-center p-8 backface-hidden"
                  style={{ backfaceVisibility: 'hidden' }}
                >
                  <p className="text-sm text-muted-foreground mb-4">
                    {quizMode === 'arabic-to-translation' ? 'What does this mean?' : 'How do you say...'}
                  </p>
                  <p
                    className={cn(
                      'text-center',
                      quizMode === 'arabic-to-translation'
                        ? 'font-arabic text-5xl'
                        : 'text-4xl font-medium'
                    )}
                    dir={quizMode === 'arabic-to-translation' ? 'rtl' : 'ltr'}
                  >
                    {quizMode === 'arabic-to-translation'
                      ? currentWord.arabicText
                      : currentWord.translation}
                  </p>
                  <p className="text-sm text-muted-foreground mt-8">Tap to reveal</p>
                </div>

                {/* Back */}
                <div
                  className="absolute inset-0 bg-primary/5 rounded-3xl border border-primary/20 shadow-lg flex flex-col items-center justify-center p-8 rotate-y-180 backface-hidden"
                  style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}
                >
                  <p className="text-sm text-primary mb-4">Answer</p>
                  <p
                    className={cn(
                      'text-center',
                      quizMode === 'translation-to-arabic'
                        ? 'font-arabic text-5xl'
                        : 'text-4xl font-medium'
                    )}
                    dir={quizMode === 'translation-to-arabic' ? 'rtl' : 'ltr'}
                  >
                    {quizMode === 'translation-to-arabic'
                      ? currentWord.arabicText
                      : currentWord.translation}
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Answer buttons */}
            <AnimatePresence>
              {isFlipped && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 20 }}
                  className="flex gap-4 mt-6"
                >
                  <Button
                    variant="outline"
                    size="lg"
                    className="flex-1 border-destructive text-destructive hover:bg-destructive hover:text-destructive-foreground"
                    onClick={() => handleAnswer(false)}
                  >
                    <X className="w-5 h-5 mr-2" />
                    Wrong
                  </Button>
                  <Button
                    variant="success"
                    size="lg"
                    className="flex-1 bg-success text-success-foreground hover:bg-success/90"
                    onClick={() => handleAnswer(true)}
                  >
                    <Check className="w-5 h-5 mr-2" />
                    Correct
                  </Button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        )}

        {/* Quiz Results */}
        {quizState === 'results' && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center"
          >
            <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-6">
              <Trophy className="w-10 h-10 text-primary" />
            </div>

            <h2 className="text-2xl font-bold mb-2">Quiz Complete!</h2>
            <p className="text-muted-foreground mb-8">Great job practicing your vocabulary</p>

            {/* Stats */}
            <div className="bg-card rounded-2xl border border-border shadow-sm p-6 mb-6">
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="text-center">
                  <p className="text-3xl font-bold text-primary">{accuracy}%</p>
                  <p className="text-sm text-muted-foreground">Accuracy</p>
                </div>
                <div className="text-center">
                  <p className="text-3xl font-bold">{formatTime(timeTaken)}</p>
                  <p className="text-sm text-muted-foreground">Time</p>
                </div>
              </div>

              <div className="flex justify-center gap-8">
                <div className="text-center">
                  <p className="text-2xl font-bold text-success">{correctCount}</p>
                  <p className="text-sm text-muted-foreground">Correct</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-destructive">{incorrectCount}</p>
                  <p className="text-sm text-muted-foreground">Incorrect</p>
                </div>
              </div>
            </div>

            {/* Incorrect words */}
            {incorrectCount > 0 && (
              <div className="bg-muted/30 rounded-xl p-4 mb-6 text-left">
                <p className="font-medium mb-3">Words to Review</p>
                <div className="space-y-2">
                  {results
                    .filter((r) => !r.correct)
                    .map((r) => (
                      <div
                        key={r.word.id}
                        className="flex items-center justify-between bg-background rounded-lg p-3"
                      >
                        <span className="font-arabic text-lg" dir="rtl">
                          {r.word.arabicText}
                        </span>
                        <span className="text-muted-foreground">{r.word.translation}</span>
                      </div>
                    ))}
                </div>
              </div>
            )}

            {/* Actions */}
            <div className="flex gap-3">
              <Button variant="outline" className="flex-1" onClick={resetQuiz}>
                <RotateCcw className="w-4 h-4 mr-2" />
                New Quiz
              </Button>
              <Button variant="hero" className="flex-1" onClick={startQuiz}>
                <Play className="w-4 h-4 mr-2" />
                Retry
              </Button>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}

function formatTime(seconds: number): string {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins}:${secs.toString().padStart(2, '0')}`;
}
