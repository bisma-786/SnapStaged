
export enum RoomType {
  LIVING_ROOM = 'Living Room',
  BEDROOM = 'Bedroom',
  KITCHEN = 'Kitchen',
  DINING_ROOM = 'Dining Room',
  BATHROOM = 'Bathroom',
  EXTERIOR = 'Exterior',
  OFFICE = 'Home Office'
}

export enum StagingStyle {
  MODERN_MINIMAL = 'Modern Minimal',
  LUXURY_NEUTRAL = 'Luxury Neutral',
  WARM_FAMILY = 'Warm Family Home',
  HIGH_END_REALTOR = 'High-End Realtor Listing',
  VIRTUAL_STAGING = 'Empty → Virtually Staged'
}

export interface StagingJob {
  id: string;
  originalImage: string; // base64
  enhancedImage?: string; // base64
  roomType: RoomType;
  style: StagingStyle;
  preserveFurniture: boolean;
  customInstructions?: string; // Added for the Pro Assistant
  status: 'pending' | 'processing' | 'completed' | 'failed';
  error?: string;
  createdAt: number;
}

export enum AppView {
  LANDING = 'landing',
  AUTH = 'auth',
  DASHBOARD = 'dashboard',
  STUDIO = 'studio',
  PRICING = 'pricing',
  ADMIN = 'admin'
}

export interface Listing {
  id: string;
  address: string;
  thumbnail: string;
  jobCount: number;
  status: 'active' | 'archived';
}

export interface User {
  id: string;
  email: string;
  name: string;
  company?: string;
  role: 'user' | 'admin';
  signupDate: number;
  lastActivity: number;
  processedCount: number;
}
