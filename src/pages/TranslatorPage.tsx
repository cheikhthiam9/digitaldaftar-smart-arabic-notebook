import { useState } from 'react';
import { motion } from 'framer-motion';
import { Languages, Camera, X, Loader2, BookmarkPlus, ChevronDown, ChevronUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';
import type { TranslationResult, WordBreakdown } from '@/types';

type TranslationDirection = 'ar-fr' | 'ar-en' | 'other-ar';

const mockTranslation: TranslationResult = {
  sourceText: 'كتاب',
  sourceLanguage: 'ar',
  targetLanguage: 'en',
  translation: 'Book',
  wordBreakdown: [
    { arabic: 'كتاب', root: 'ك-ت-ب', partOfSpeech: 'noun', translation: 'book' },
  ],
  exampleSentence: 'هذا كتاب جميل',
  exampleTranslation: 'This is a beautiful book',
};

const mockArabicSentenceTranslation: TranslationResult = {
  sourceText: 'أنا أحب القراءة كل يوم',
  sourceLanguage: 'ar',
  targetLanguage: 'en',
  translation: 'I love reading every day',
  wordBreakdown: [
    { arabic: 'أنا', partOfSpeech: 'pronoun', translation: 'I' },
    { arabic: 'أحب', root: 'ح-ب-ب', partOfSpeech: 'verb', translation: 'love' },
    { arabic: 'القراءة', root: 'ق-ر-أ', partOfSpeech: 'noun', translation: 'reading' },
    { arabic: 'كل', partOfSpeech: 'adjective', translation: 'every' },
    { arabic: 'يوم', root: 'ي-و-م', partOfSpeech: 'noun', translation: 'day' },
  ],
  exampleSentence: 'القراءة تفتح العقول',
  exampleTranslation: 'Reading opens minds',
};

export default function TranslatorPage() {
  const { toast } = useToast();
  const [inputText, setInputText] = useState('');
  const [direction, setDirection] = useState<TranslationDirection>('ar-en');
  const [isTranslating, setIsTranslating] = useState(false);
  const [result, setResult] = useState<TranslationResult | null>(null);
  const [showBreakdown, setShowBreakdown] = useState(true);

  const handleTranslate = async () => {
    if (!inputText.trim()) {
      toast({
        variant: 'destructive',
        title: 'Empty input',
        description: 'Please enter some text to translate.',
      });
      return;
    }

    setIsTranslating(true);
    
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));
    
    // Use mock data based on input length
    const mockResult = inputText.length > 10 ? mockArabicSentenceTranslation : mockTranslation;
    setResult({
      ...mockResult,
      sourceText: inputText,
    });
    
    setIsTranslating(false);
  };

  const handleClear = () => {
    setInputText('');
    setResult(null);
  };

  const handleSaveToVocabulary = () => {
    toast({
      title: 'Saved to vocabulary!',
      description: 'The word has been added to your vocabulary list.',
    });
  };

  const handleCameraClick = () => {
    toast({
      title: 'OCR Feature',
      description: 'Camera text extraction will be available after backend integration.',
    });
  };

  const getDirectionLabel = () => {
    switch (direction) {
      case 'ar-fr': return 'Arabic → French';
      case 'ar-en': return 'Arabic → English';
      case 'other-ar': return 'English/French → Arabic';
    }
  };

  return (
    <div className="min-h-screen bg-background pb-24">
      <div className="container mx-auto px-4 py-6 max-w-2xl">
        {/* Header */}
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
            <Languages className="w-5 h-5 text-primary" />
          </div>
          <div>
            <h1 className="text-xl font-semibold">Translator</h1>
            <p className="text-sm text-muted-foreground">Instant Arabic translation</p>
          </div>
        </div>

        {/* Input Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-card rounded-2xl border border-border shadow-sm overflow-hidden"
        >
          <div className="relative">
            <Textarea
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="Enter Arabic, French, or English text..."
              className="min-h-[150px] md:min-h-[180px] border-0 rounded-none resize-none text-lg focus-visible:ring-0 p-4"
              dir="auto"
            />
            {inputText && (
              <Button
                variant="ghost"
                size="icon"
                className="absolute top-2 right-2"
                onClick={handleClear}
              >
                <X className="w-4 h-4" />
              </Button>
            )}
            <div className="absolute bottom-2 right-2 text-xs text-muted-foreground">
              {inputText.length} characters
            </div>
          </div>

          {/* Language selector */}
          <div className="border-t border-border p-3 bg-muted/30">
            <div className="flex items-center gap-2 flex-wrap">
              {(['ar-en', 'ar-fr', 'other-ar'] as TranslationDirection[]).map((dir) => (
                <button
                  key={dir}
                  onClick={() => setDirection(dir)}
                  className={cn(
                    'px-3 py-1.5 rounded-full text-sm font-medium transition-all',
                    direction === dir
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-background border border-border hover:border-primary/50'
                  )}
                >
                  {dir === 'ar-en' && 'AR → EN'}
                  {dir === 'ar-fr' && 'AR → FR'}
                  {dir === 'other-ar' && 'EN/FR → AR'}
                </button>
              ))}
            </div>
          </div>

          {/* Action buttons */}
          <div className="border-t border-border p-3 flex gap-2">
            <Button
              variant="outline"
              size="icon"
              onClick={handleCameraClick}
              className="shrink-0"
            >
              <Camera className="w-4 h-4" />
            </Button>
            <Button
              variant="hero"
              className="flex-1"
              onClick={handleTranslate}
              disabled={isTranslating || !inputText.trim()}
            >
              {isTranslating ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Translating...
                </>
              ) : (
                'Translate'
              )}
            </Button>
          </div>
        </motion.div>

        {/* Translation Result */}
        {result && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-6 space-y-4"
          >
            {/* Main translation */}
            <div className="bg-card rounded-2xl border border-border shadow-sm p-5">
              <p className="text-sm text-muted-foreground mb-2">Translation</p>
              <p 
                className={cn(
                  "text-2xl font-medium",
                  result.targetLanguage === 'ar' && "font-arabic text-3xl"
                )}
                dir={result.targetLanguage === 'ar' ? 'rtl' : 'ltr'}
              >
                {result.translation}
              </p>
            </div>

            {/* Word breakdown */}
            {result.wordBreakdown && result.wordBreakdown.length > 0 && (
              <div className="bg-card rounded-2xl border border-border shadow-sm overflow-hidden">
                <button
                  onClick={() => setShowBreakdown(!showBreakdown)}
                  className="w-full p-4 flex items-center justify-between hover:bg-muted/30 transition-colors"
                >
                  <span className="font-medium">Word Breakdown</span>
                  {showBreakdown ? (
                    <ChevronUp className="w-5 h-5 text-muted-foreground" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-muted-foreground" />
                  )}
                </button>
                
                {showBreakdown && (
                  <div className="border-t border-border p-4 space-y-3">
                    {result.wordBreakdown.map((word, index) => (
                      <WordBreakdownCard key={index} word={word} />
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* Example sentence */}
            {result.exampleSentence && (
              <div className="bg-primary/5 rounded-2xl p-5 border border-primary/10">
                <p className="text-sm text-muted-foreground mb-2">Example</p>
                <p className="font-arabic text-xl mb-1" dir="rtl">
                  {result.exampleSentence}
                </p>
                <p className="text-muted-foreground">
                  {result.exampleTranslation}
                </p>
              </div>
            )}

            {/* Save button */}
            <Button
              variant="accent"
              className="w-full"
              size="lg"
              onClick={handleSaveToVocabulary}
            >
              <BookmarkPlus className="w-5 h-5" />
              Save to Vocabulary
            </Button>
          </motion.div>
        )}

        {/* Empty state */}
        {!result && !isTranslating && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="mt-12 text-center"
          >
            <div className="w-16 h-16 rounded-2xl bg-muted flex items-center justify-center mx-auto mb-4">
              <Languages className="w-8 h-8 text-muted-foreground" />
            </div>
            <p className="text-muted-foreground mb-2">
              Enter text above and click Translate
            </p>
            <p className="text-sm text-muted-foreground/70">
              Pro tip: Tap the camera icon to extract text from images
            </p>
          </motion.div>
        )}
      </div>
    </div>
  );
}

function WordBreakdownCard({ word }: { word: WordBreakdown }) {
  return (
    <div className="flex items-center gap-4 p-3 bg-muted/30 rounded-xl">
      <div className="text-center min-w-[60px]">
        <p className="font-arabic text-xl" dir="rtl">{word.arabic}</p>
      </div>
      <div className="h-8 w-px bg-border" />
      <div className="flex-1 grid grid-cols-2 gap-2 text-sm">
        {word.root && (
          <div>
            <span className="text-muted-foreground">Root: </span>
            <span className="font-arabic">{word.root}</span>
          </div>
        )}
        {word.partOfSpeech && (
          <div>
            <span className="text-muted-foreground">Type: </span>
            <span className="capitalize">{word.partOfSpeech}</span>
          </div>
        )}
        <div className="col-span-2">
          <span className="text-muted-foreground">Meaning: </span>
          <span className="font-medium">{word.translation}</span>
        </div>
      </div>
    </div>
  );
}
