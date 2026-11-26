import { Globe, Instagram, Mail, MessageCircle, Share2, Youtube } from 'lucide-react';
import type { SocialIconKey } from '../data/foundationData';

interface SocialIconProps {
  name: SocialIconKey;
  className?: string;
}

export function SocialIcon({ name, className = 'h-4 w-4' }: SocialIconProps) {
  switch (name) {
    case 'instagram':
      return <Instagram className={className} />;
    case 'whatsapp':
      return <MessageCircle className={className} />;
    case 'youtube':
      return <Youtube className={className} />;
    case 'facebook':
      return <Share2 className={className} />;
    case 'mail':
      return <Mail className={className} />;
    case 'globe':
      return <Globe className={className} />;
  }
}
