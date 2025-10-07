// User preferences
export interface UserPreferences {
  theme: 'light' | 'dark' | 'auto';
  defaultView: 'grid' | 'list';
  autosaveInterval: number; // in seconds
  showHints: boolean;
  emailNotifications: boolean;
  collaborationNotifications: boolean;
}

// User interface
export interface User {
  id: string;
  email: string;
  name: string;
  organization: string;
  role: string;
  canvases: string[]; // Canvas IDs
  sharedCanvases: string[];
  templates: string[];
  preferences: UserPreferences;
  createdAt: Date;
  updatedAt: Date;
}

// User role types
export type UserRole =
  | 'ai-product-manager'
  | 'data-scientist'
  | 'business-stakeholder'
  | 'project-manager'
  | 'executive'
  | 'compliance-officer'
  | 'end-user';

// Collaboration types
export interface Collaborator {
  userId: string;
  name: string;
  email: string;
  role: UserRole;
  permissions: CollaborationPermissions;
  addedAt: Date;
}

export interface CollaborationPermissions {
  canEdit: boolean;
  canComment: boolean;
  canShare: boolean;
  canExport: boolean;
  canDelete: boolean;
}

// Activity log
export interface ActivityLog {
  id: string;
  canvasId: string;
  userId: string;
  userName: string;
  action: ActivityAction;
  details: string;
  timestamp: Date;
}

export type ActivityAction =
  | 'created'
  | 'updated'
  | 'deleted'
  | 'shared'
  | 'exported'
  | 'commented'
  | 'phase-changed'
  | 'readiness-updated';
