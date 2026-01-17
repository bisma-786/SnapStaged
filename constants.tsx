
import React from 'react';
import { 
  Home, 
  Camera, 
  Layout, 
  Layers, 
  Maximize, 
  CheckCircle, 
  AlertCircle,
  Download,
  Trash2,
  RefreshCw
} from 'lucide-react';

export const ICONS = {
  Home: <Home className="w-5 h-5" />,
  Camera: <Camera className="w-5 h-5" />,
  Layout: <Layout className="w-5 h-5" />,
  Layers: <Layers className="w-5 h-5" />,
  Maximize: <Maximize className="w-5 h-5" />,
  Check: <CheckCircle className="w-5 h-5 text-green-500" />,
  Error: <AlertCircle className="w-5 h-5 text-red-500" />,
  Download: <Download className="w-5 h-5" />,
  Delete: <Trash2 className="w-4 h-4 text-red-500" />,
  Process: <RefreshCw className="w-5 h-5 animate-spin" />,
};

export const STYLING_PROMPTS: Record<string, string> = {
  'Modern Minimal': 'Apply a sleek, modern minimalist aesthetic. Focus on clean lines, a monochromatic or neutral color palette with subtle accents, and high-quality functional furniture. Remove clutter but strictly keep all walls and windows.',
  'Luxury Neutral': 'Transform the space into a high-end luxury interior using soft creams, beiges, and rich textures like marble or velvet. Enhance lighting to feel like a five-star hotel. Do not alter architecture.',
  'Warm Family Home': 'Create a cozy, inviting atmosphere with warm wood tones, soft textiles, and approachable yet stylish furniture. Ensure lighting is bright and natural.',
  'High-End Realtor Listing': 'Standard high-end real estate photography style. Maximize brightness, correct white balance, sharpen details, and ensure the furniture is perfectly arranged and modern.',
  'Empty → Virtually Staged': 'Fill this empty room with high-quality, professional furniture and decor that matches the existing architectural style. Ensure shadows and reflections look realistic on floors and walls.'
};
