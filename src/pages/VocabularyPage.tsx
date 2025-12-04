import { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Heart, Star, BookOpen, Play, Edit, Trash2, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';
import type { VocabularyItem } from '@/types';

// Mock vocabulary data
const mockVocabulary: VocabularyItem[] = [
  {
    id: '1',
    userId: '1',
    arabicText: 'كتاب',
    translation: 'Book',
    root: 'ك-ت-ب',
    partOfSpeech: 'noun',
    exampleSentence: 'هذا كتاب جميل',
    exampleTranslation: 'This is a beautiful book',
    category: 'Education',
    difficulty: 2,
    isFavorite: true,
    reviewCount: 5,
    createdAt: new Date('2024-01-15'),
    updatedAt: new Date('2024-01-15'),
  },
  {
    id: '2',
    userId: '1',
    arabicText: 'مرحبا',
    translation: 'Hello',
    partOfSpeech: 'interjection',
    exampleSentence: 'مرحبا، كيف حالك؟',
    exampleTranslation: 'Hello, how are you?',
    category: 'Greetings',
    difficulty: 1,
    isFavorite: false,
    reviewCount: 10,
    createdAt: new Date('2024-01-10'),
    updatedAt: new Date('2024-01-10'),
  },
  {
    id: '3',
    userId: '1',
    arabicText: 'شكرا',
    translation: 'Thank you',
    partOfSpeech: 'interjection',
    exampleSentence: 'شكرا جزيلا',
    exampleTranslation: 'Thank you very much',
    category: 'Greetings',
    difficulty: 1,
    isFavorite: true,
    reviewCount: 15,
    createdAt: new Date('2024-01-08'),
    updatedAt: new Date('2024-01-08'),
  },
  {
    id: '4',
    userId: '1',
    arabicText: 'ماء',
    translation: 'Water',
    root: 'م-و-ه',
    partOfSpeech: 'noun',
    exampleSentence: 'أريد كوب ماء',
    exampleTranslation: 'I want a glass of water',
    category: 'Food & Drink',
    difficulty: 2,
    isFavorite: false,
    reviewCount: 3,
    createdAt: new Date('2024-01-05'),
    updatedAt: new Date('2024-01-05'),
  },
  {
    id: '5',
    userId: '1',
    arabicText: 'يكتب',
    translation: 'He writes',
    root: 'ك-ت-ب',
    partOfSpeech: 'verb',
    exampleSentence: 'هو يكتب رسالة',
    exampleTranslation: 'He writes a letter',
    category: 'Actions',
    difficulty: 3,
    isFavorite: false,
    reviewCount: 2,
    createdAt: new Date('2024-01-03'),
    updatedAt: new Date('2024-01-03'),
  },
];

type FilterType = 'all' | 'favorites' | string;

export default function VocabularyPage() {
  const { toast } = useToast();
  const [vocabulary, setVocabulary] = useState(mockVocabulary);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState<FilterType>('all');
  const [selectedItem, setSelectedItem] = useState<VocabularyItem | null>(null);

  // Get unique categories
  const categories = [...new Set(vocabulary.map((v) => v.category).filter(Boolean))];

  // Filter vocabulary
  const filteredVocabulary = vocabulary.filter((item) => {
    const matchesSearch =
      item.arabicText.includes(searchQuery) ||
      item.translation.toLowerCase().includes(searchQuery.toLowerCase());
    
    if (activeFilter === 'all') return matchesSearch;
    if (activeFilter === 'favorites') return matchesSearch && item.isFavorite;
    return matchesSearch && item.category === activeFilter;
  });

  const toggleFavorite = (id: string) => {
    setVocabulary((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, isFavorite: !item.isFavorite } : item
      )
    );
    toast({
      title: 'Updated',
      description: 'Vocabulary item updated.',
    });
  };

  const deleteItem = (id: string) => {
    setVocabulary((prev) => prev.filter((item) => item.id !== id));
    setSelectedItem(null);
    toast({
      title: 'Deleted',
      description: 'Vocabulary item removed.',
    });
  };

  return (
    <div className="min-h-screen bg-background pb-24 md:pb-8">
      <div className="container mx-auto px-4 py-6 max-w-4xl">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
              <BookOpen className="w-5 h-5 text-primary" />
            </div>
            <div>
              <h1 className="text-xl font-semibold">My Vocabulary</h1>
              <p className="text-sm text-muted-foreground">
                {vocabulary.length} words saved
              </p>
            </div>
          </div>
        </div>

        {/* Search */}
        <div className="relative mb-4">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Search vocabulary..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>

        {/* Filters */}
        <div className="flex gap-2 overflow-x-auto pb-2 mb-6 scrollbar-hide">
          <FilterChip
            label="All"
            active={activeFilter === 'all'}
            onClick={() => setActiveFilter('all')}
          />
          <FilterChip
            label="Favorites"
            icon={<Heart className="w-3 h-3" />}
            active={activeFilter === 'favorites'}
            onClick={() => setActiveFilter('favorites')}
          />
          {categories.map((cat) => (
            <FilterChip
              key={cat}
              label={cat!}
              active={activeFilter === cat}
              onClick={() => setActiveFilter(cat!)}
            />
          ))}
        </div>

        {/* Vocabulary Grid */}
        {filteredVocabulary.length > 0 ? (
          <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
            {filteredVocabulary.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                <VocabularyCard
                  item={item}
                  onClick={() => setSelectedItem(item)}
                  onToggleFavorite={() => toggleFavorite(item.id)}
                />
              </motion.div>
            ))}
          </div>
        ) : (
          <EmptyState hasVocabulary={vocabulary.length > 0} />
        )}

        {/* FAB for Quiz */}
        <Button
          variant="accent"
          size="lg"
          className="fixed bottom-20 right-4 md:bottom-8 md:right-8 rounded-full shadow-lg h-14 px-6"
          onClick={() => toast({ title: 'Starting Quiz', description: 'Quiz mode coming soon!' })}
        >
          <Play className="w-5 h-5 mr-2" />
          Start Quiz
        </Button>

        {/* Detail Modal */}
        <Dialog open={!!selectedItem} onOpenChange={() => setSelectedItem(null)}>
          <DialogContent className="max-w-md">
            {selectedItem && (
              <>
                <DialogHeader>
                  <DialogTitle className="sr-only">Vocabulary Detail</DialogTitle>
                </DialogHeader>
                <div className="text-center py-4">
                  <p className="font-arabic text-4xl mb-2" dir="rtl">
                    {selectedItem.arabicText}
                  </p>
                  <p className="text-2xl font-medium text-muted-foreground">
                    {selectedItem.translation}
                  </p>
                </div>

                <div className="space-y-4">
                  {selectedItem.partOfSpeech && (
                    <div className="flex justify-center">
                      <span className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm capitalize">
                        {selectedItem.partOfSpeech}
                      </span>
                    </div>
                  )}

                  {selectedItem.root && (
                    <div className="text-center">
                      <p className="text-sm text-muted-foreground">Root</p>
                      <p className="font-arabic text-lg">{selectedItem.root}</p>
                    </div>
                  )}

                  {selectedItem.exampleSentence && (
                    <div className="bg-muted/30 rounded-xl p-4">
                      <p className="text-sm text-muted-foreground mb-2">Example</p>
                      <p className="font-arabic text-lg mb-1" dir="rtl">
                        {selectedItem.exampleSentence}
                      </p>
                      <p className="text-muted-foreground text-sm">
                        {selectedItem.exampleTranslation}
                      </p>
                    </div>
                  )}

                  <div className="flex items-center justify-between pt-2">
                    <div className="flex gap-1">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star
                          key={star}
                          className={cn(
                            'w-4 h-4',
                            star <= selectedItem.difficulty
                              ? 'text-accent fill-accent'
                              : 'text-muted'
                          )}
                        />
                      ))}
                    </div>
                    <p className="text-xs text-muted-foreground">
                      {selectedItem.reviewCount} reviews
                    </p>
                  </div>
                </div>

                <div className="flex gap-2 pt-4">
                  <Button
                    variant="outline"
                    className="flex-1"
                    onClick={() => toggleFavorite(selectedItem.id)}
                  >
                    <Heart
                      className={cn(
                        'w-4 h-4 mr-2',
                        selectedItem.isFavorite && 'fill-destructive text-destructive'
                      )}
                    />
                    {selectedItem.isFavorite ? 'Unfavorite' : 'Favorite'}
                  </Button>
                  <Button
                    variant="destructive"
                    size="icon"
                    onClick={() => deleteItem(selectedItem.id)}
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}

function FilterChip({
  label,
  icon,
  active,
  onClick,
}: {
  label: string;
  icon?: React.ReactNode;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={cn(
        'flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all',
        active
          ? 'bg-primary text-primary-foreground'
          : 'bg-muted text-muted-foreground hover:bg-muted/80'
      )}
    >
      {icon}
      {label}
    </button>
  );
}

function VocabularyCard({
  item,
  onClick,
  onToggleFavorite,
}: {
  item: VocabularyItem;
  onClick: () => void;
  onToggleFavorite: () => void;
}) {
  return (
    <div
      onClick={onClick}
      className="bg-card border border-border rounded-xl p-4 hover:shadow-md hover:border-primary/20 transition-all cursor-pointer"
    >
      <div className="flex items-start justify-between mb-2">
        <p className="font-arabic text-2xl" dir="rtl">
          {item.arabicText}
        </p>
        <button
          onClick={(e) => {
            e.stopPropagation();
            onToggleFavorite();
          }}
          className="p-1 hover:bg-muted rounded-lg transition-colors"
        >
          <Heart
            className={cn(
              'w-5 h-5',
              item.isFavorite ? 'fill-destructive text-destructive' : 'text-muted-foreground'
            )}
          />
        </button>
      </div>
      <p className="text-lg text-muted-foreground mb-3">{item.translation}</p>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          {item.category && (
            <span className="text-xs px-2 py-0.5 bg-muted rounded-full">
              {item.category}
            </span>
          )}
          <div className="flex gap-0.5">
            {[1, 2, 3, 4, 5].map((star) => (
              <Star
                key={star}
                className={cn(
                  'w-3 h-3',
                  star <= item.difficulty ? 'text-accent fill-accent' : 'text-muted'
                )}
              />
            ))}
          </div>
        </div>
        <p className="text-xs text-muted-foreground">
          {item.createdAt.toLocaleDateString()}
        </p>
      </div>
    </div>
  );
}

function EmptyState({ hasVocabulary }: { hasVocabulary: boolean }) {
  return (
    <div className="text-center py-16">
      <div className="w-16 h-16 rounded-2xl bg-muted flex items-center justify-center mx-auto mb-4">
        <BookOpen className="w-8 h-8 text-muted-foreground" />
      </div>
      <p className="text-muted-foreground mb-2">
        {hasVocabulary
          ? 'No vocabulary matches your search'
          : 'No vocabulary saved yet'}
      </p>
      <p className="text-sm text-muted-foreground/70">
        {hasVocabulary
          ? 'Try a different search term or filter'
          : 'Start by translating words and saving them!'}
      </p>
    </div>
  );
}
