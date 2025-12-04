import { useState } from 'react';
import { motion } from 'framer-motion';
import { Settings, User, Globe, Bell, Crown, LogOut, HelpCircle, Shield, FileText, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { Slider } from '@/components/ui/slider';
import { useToast } from '@/hooks/use-toast';
import { useAuthStore } from '@/stores/authStore';
import { useNavigate } from 'react-router-dom';
import { cn } from '@/lib/utils';

export default function SettingsPage() {
  const { user, logout } = useAuthStore();
  const { toast } = useToast();
  const navigate = useNavigate();
  
  const [language, setLanguage] = useState<'en' | 'fr'>('en');
  const [dailyReminder, setDailyReminder] = useState(true);
  const [quizStreak, setQuizStreak] = useState(false);
  const [fontSize, setFontSize] = useState([16]);
  const [showUpgradeModal, setShowUpgradeModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const handleUpgrade = () => {
    toast({
      title: 'Upgrade to Premium',
      description: 'Payment integration will be available after Supabase setup.',
    });
    setShowUpgradeModal(false);
  };

  return (
    <div className="min-h-screen bg-background pb-24 md:pb-8">
      <div className="container mx-auto px-4 py-6 max-w-2xl">
        {/* Header */}
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
            <Settings className="w-5 h-5 text-primary" />
          </div>
          <div>
            <h1 className="text-xl font-semibold">Settings</h1>
            <p className="text-sm text-muted-foreground">Manage your preferences</p>
          </div>
        </div>

        <div className="space-y-6">
          {/* Profile Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-card rounded-2xl border border-border shadow-sm p-5"
          >
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
                <span className="text-primary text-2xl font-semibold">
                  {user?.name?.charAt(0) || 'U'}
                </span>
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-lg">{user?.name || 'User'}</h3>
                <p className="text-sm text-muted-foreground">{user?.email}</p>
              </div>
              <Button variant="outline" size="sm">
                <User className="w-4 h-4 mr-2" />
                Edit
              </Button>
            </div>
          </motion.div>

          {/* Subscription Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-gradient-to-br from-accent/10 to-primary/10 rounded-2xl border border-accent/20 shadow-sm p-5"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-accent/20 flex items-center justify-center">
                <Crown className="w-5 h-5 text-accent" />
              </div>
              <div>
                <h3 className="font-semibold">Free Plan</h3>
                <p className="text-sm text-muted-foreground">Upgrade for unlimited access</p>
              </div>
            </div>

            <div className="space-y-2 mb-4">
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Daily translations</span>
                <span>3 / 10 remaining</span>
              </div>
              <div className="h-2 bg-background rounded-full overflow-hidden">
                <div className="h-full bg-accent w-[30%] rounded-full" />
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Vocabulary limit</span>
                <span>75 / 100 words</span>
              </div>
              <div className="h-2 bg-background rounded-full overflow-hidden">
                <div className="h-full bg-primary w-[75%] rounded-full" />
              </div>
            </div>

            <Button variant="accent" className="w-full" onClick={() => setShowUpgradeModal(true)}>
              <Crown className="w-4 h-4 mr-2" />
              Upgrade to Premium
            </Button>
          </motion.div>

          {/* Preferences */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-card rounded-2xl border border-border shadow-sm overflow-hidden"
          >
            <div className="p-4 border-b border-border">
              <h3 className="font-semibold">Preferences</h3>
            </div>

            <div className="divide-y divide-border">
              {/* Translation Language */}
              <div className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Globe className="w-5 h-5 text-muted-foreground" />
                    <div>
                      <p className="font-medium">Translation Language</p>
                      <p className="text-sm text-muted-foreground">Choose your target language</p>
                    </div>
                  </div>
                </div>
                <div className="flex gap-2 mt-3 ml-8">
                  <button
                    onClick={() => setLanguage('en')}
                    className={cn(
                      'px-4 py-2 rounded-lg text-sm font-medium transition-all',
                      language === 'en'
                        ? 'bg-primary text-primary-foreground'
                        : 'bg-muted text-muted-foreground'
                    )}
                  >
                    English
                  </button>
                  <button
                    onClick={() => setLanguage('fr')}
                    className={cn(
                      'px-4 py-2 rounded-lg text-sm font-medium transition-all',
                      language === 'fr'
                        ? 'bg-primary text-primary-foreground'
                        : 'bg-muted text-muted-foreground'
                    )}
                  >
                    French
                  </button>
                </div>
              </div>

              {/* Daily Reminder */}
              <div className="p-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Bell className="w-5 h-5 text-muted-foreground" />
                  <div>
                    <p className="font-medium">Daily Vocabulary Reminder</p>
                    <p className="text-sm text-muted-foreground">Get reminded to practice</p>
                  </div>
                </div>
                <Switch checked={dailyReminder} onCheckedChange={setDailyReminder} />
              </div>

              {/* Quiz Streak */}
              <div className="p-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Bell className="w-5 h-5 text-muted-foreground" />
                  <div>
                    <p className="font-medium">Quiz Streak Reminder</p>
                    <p className="text-sm text-muted-foreground">Don't break your streak</p>
                  </div>
                </div>
                <Switch checked={quizStreak} onCheckedChange={setQuizStreak} />
              </div>

              {/* Font Size */}
              <div className="p-4">
                <div className="flex items-center gap-3 mb-3">
                  <Settings className="w-5 h-5 text-muted-foreground" />
                  <div>
                    <p className="font-medium">Arabic Font Size</p>
                    <p className="text-sm text-muted-foreground">Adjust text size for readability</p>
                  </div>
                </div>
                <div className="ml-8 flex items-center gap-4">
                  <span className="text-sm text-muted-foreground">A</span>
                  <Slider
                    value={fontSize}
                    onValueChange={setFontSize}
                    min={14}
                    max={24}
                    step={2}
                    className="flex-1"
                  />
                  <span className="text-lg font-bold">A</span>
                  <span className="text-sm text-muted-foreground w-8">{fontSize}px</span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* About & Support */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-card rounded-2xl border border-border shadow-sm overflow-hidden"
          >
            <div className="p-4 border-b border-border">
              <h3 className="font-semibold">About & Support</h3>
            </div>

            <div className="divide-y divide-border">
              <button className="w-full p-4 flex items-center gap-3 hover:bg-muted/30 transition-colors text-left">
                <HelpCircle className="w-5 h-5 text-muted-foreground" />
                <span className="font-medium">Help Center</span>
              </button>
              <button className="w-full p-4 flex items-center gap-3 hover:bg-muted/30 transition-colors text-left">
                <Shield className="w-5 h-5 text-muted-foreground" />
                <span className="font-medium">Privacy Policy</span>
              </button>
              <button className="w-full p-4 flex items-center gap-3 hover:bg-muted/30 transition-colors text-left">
                <FileText className="w-5 h-5 text-muted-foreground" />
                <span className="font-medium">Terms of Service</span>
              </button>
              <div className="p-4 flex items-center justify-between">
                <span className="text-muted-foreground">App Version</span>
                <span className="text-sm">1.0.0</span>
              </div>
            </div>
          </motion.div>

          {/* Danger Zone */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="space-y-3"
          >
            <Button variant="outline" className="w-full" onClick={handleLogout}>
              <LogOut className="w-4 h-4 mr-2" />
              Logout
            </Button>
            <Button
              variant="outline"
              className="w-full text-destructive border-destructive/50 hover:bg-destructive hover:text-destructive-foreground"
              onClick={() => setShowDeleteModal(true)}
            >
              <Trash2 className="w-4 h-4 mr-2" />
              Delete Account
            </Button>
          </motion.div>
        </div>
      </div>

      {/* Upgrade Modal */}
      <Dialog open={showUpgradeModal} onOpenChange={setShowUpgradeModal}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Crown className="w-5 h-5 text-accent" />
              Upgrade to Premium
            </DialogTitle>
            <DialogDescription>
              Unlock the full potential of DigitalDaftar
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-3 py-4">
            {[
              'Unlimited translations',
              'Unlimited vocabulary storage',
              'OCR from images',
              'Advanced quiz features',
              'Priority support',
            ].map((benefit) => (
              <div key={benefit} className="flex items-center gap-2">
                <div className="w-5 h-5 rounded-full bg-success/10 flex items-center justify-center">
                  <span className="text-success text-xs">✓</span>
                </div>
                <span>{benefit}</span>
              </div>
            ))}
          </div>

          <div className="space-y-3">
            <button className="w-full p-4 rounded-xl border-2 border-primary bg-primary/5 text-left">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Yearly</p>
                  <p className="text-sm text-muted-foreground">$39.99/year</p>
                </div>
                <span className="px-2 py-1 bg-accent text-accent-foreground text-xs rounded-full font-medium">
                  Save 33%
                </span>
              </div>
            </button>
            <button className="w-full p-4 rounded-xl border-2 border-border hover:border-primary/50 text-left transition-colors">
              <p className="font-medium">Monthly</p>
              <p className="text-sm text-muted-foreground">$4.99/month</p>
            </button>
          </div>

          <DialogFooter>
            <Button variant="accent" className="w-full" onClick={handleUpgrade}>
              Subscribe Now
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Account Modal */}
      <Dialog open={showDeleteModal} onOpenChange={setShowDeleteModal}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Account</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete your account? This action cannot be undone and all your vocabulary will be lost.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowDeleteModal(false)}>
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={() => {
                toast({ title: 'Account deletion', description: 'This feature will be available after backend integration.' });
                setShowDeleteModal(false);
              }}
            >
              Delete Account
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
