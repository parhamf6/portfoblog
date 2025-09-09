// features/blog/components/share-buttons.tsx
'use client';

import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { 
  Share2, 
  Twitter, 
  Linkedin, 
  Mail, 
  Instagram, 
  Send, 
  Link, 
  Check,
  X
} from "lucide-react";
import { useState } from "react";
import { motion } from "framer-motion";

interface ShareButtonsProps {
  title: string;
  url: string;
}

interface ShareOption {
  name: string;
  icon: React.ComponentType<any>;
  color: string;
  action: () => void;
}

export function ShareButtons({ title, url }: ShareButtonsProps) {
  const [copied, setCopied] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  
  const shareOptions: ShareOption[] = [
    {
      name: 'Twitter',
      icon: Twitter,
      color: 'text-[#1DA1F2]',
      action: () => window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(url)}`, '_blank')
    },
    {
      name: 'LinkedIn',
      icon: Linkedin,
      color: 'text-[#0077B5]',
      action: () => window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`, '_blank')
    },
    {
      name: 'Email',
      icon: Mail,
      color: 'text-[#EA4335]',
      action: () => window.open(`mailto:?subject=${encodeURIComponent(title)}&body=${encodeURIComponent(`Check out this article: ${url}`)}`)
    },
    {
      name: 'Telegram',
      icon: Send,
      color: 'text-[#0088CC]',
      action: () => window.open(`https://t.me/share/url?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`, '_blank')
    },
    {
      name: 'Instagram',
      icon: Instagram,
      color: 'text-[#E1306C]',
      action: () => {
        navigator.clipboard.writeText(url);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
        setTimeout(() => setIsOpen(false), 500);
      }
    },
    {
      name: 'Copy Link',
      icon: copied ? Check : Link,
      color: copied ? 'text-green-500' : 'text-muted-foreground',
      action: () => {
        navigator.clipboard.writeText(url);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
        setTimeout(() => setIsOpen(false), 500);
      }
    }
  ];
  
  const toggleShareMenu = () => {
    setIsOpen(!isOpen);
  };
  
  return (
    <div className="relative">
      <Popover open={isOpen} onOpenChange={setIsOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            className="gap-2 rounded-xl border-border bg-card hover:bg-muted hover:text-secondary transition-all duration-200"
            onClick={toggleShareMenu}
          >
            {isOpen ? (
              <X className="h-4 w-4" />
            ) : (
              <Share2 className="h-4 w-4" />
            )}
            Share
          </Button>
        </PopoverTrigger>
        <PopoverContent 
          className="w-80 p-0 ml-2 bg-card border-border rounded-xl shadow-lg overflow-hidden"
          align="end"
          sideOffset={8}
        >
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
          >
            <div className="p-4 border-b border-border">
              <h3 className="font-medium ">Share this article</h3>
              <p className="text-sm text-muted-foreground mt-1">Choose your platform</p>
            </div>
            <div className="grid grid-cols-3 gap-2 p-4">
              {shareOptions.map((option) => (
                <motion.div
                  key={option.name}
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                >
                  <Button
                    variant="ghost"
                    className="flex flex-col items-center justify-center gap-1 h-20 w-full rounded-lg hover:bg-muted transition-colors"
                    onClick={() => {
                      option.action();
                      setIsOpen(false);
                    }}
                  >
                    <div className={`p-2 rounded-lg bg-muted ${option.color}`}>
                      <option.icon className="h-5 w-5" />
                    </div>
                    <span className="text-xs font-medium text-foreground">{option.name}</span>
                  </Button>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </PopoverContent>
      </Popover>
      
      {copied && (
        <motion.div
          className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 bg-card border border-border rounded-lg px-3 py-2 shadow-md"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 10 }}
          transition={{ duration: 0.2 }}
        >
          <p className="text-sm font-medium text-foreground">Link copied!</p>
        </motion.div>
      )}
    </div>
  );
}