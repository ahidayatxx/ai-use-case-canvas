import { format, formatDistanceToNow, isToday, isYesterday, differenceInDays } from 'date-fns';

/**
 * Date formatting utilities
 */

export function formatDate(date: Date): string {
  return format(date, 'MMM d, yyyy');
}

export function formatDateTime(date: Date): string {
  return format(date, 'MMM d, yyyy h:mm a');
}

export function formatTime(date: Date): string {
  return format(date, 'h:mm a');
}

export function formatRelativeTime(date: Date): string {
  if (isToday(date)) {
    return `Today at ${formatTime(date)}`;
  }

  if (isYesterday(date)) {
    return `Yesterday at ${formatTime(date)}`;
  }

  const daysDiff = differenceInDays(new Date(), date);

  if (daysDiff <= 7) {
    return `${daysDiff} days ago`;
  }

  return formatDate(date);
}

export function formatTimeAgo(date: Date): string {
  return formatDistanceToNow(date, { addSuffix: true });
}

/**
 * Text formatting utilities
 */

export function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength).trim() + '...';
}

export function capitalizeFirstLetter(text: string): string {
  if (!text) return '';
  return text.charAt(0).toUpperCase() + text.slice(1);
}

export function capitalizeWords(text: string): string {
  return text
    .split(' ')
    .map(word => capitalizeFirstLetter(word))
    .join(' ');
}

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

/**
 * Number formatting utilities
 */

export function formatPercentage(value: number, decimals: number = 0): string {
  return `${value.toFixed(decimals)}%`;
}

export function formatNumber(value: number): string {
  return new Intl.NumberFormat('en-US').format(value);
}

export function formatCurrency(value: number, currency: string = 'USD'): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
  }).format(value);
}

export function formatFileSize(bytes: number): string {
  if (bytes === 0) return '0 Bytes';

  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(2))} ${sizes[i]}`;
}

/**
 * Phase formatting
 */

export function formatPhase(phase: string): string {
  const phaseMap: Record<string, string> = {
    ideation: 'Ideation',
    poc: 'Proof of Concept',
    pilot: 'Pilot',
    production: 'Production',
    optimization: 'Optimization',
  };

  return phaseMap[phase] || capitalizeFirstLetter(phase);
}

/**
 * Status formatting
 */

export function formatStatus(status: string): string {
  const statusMap: Record<string, string> = {
    draft: 'Draft',
    'in-progress': 'In Progress',
    completed: 'Completed',
    archived: 'Archived',
  };

  return statusMap[status] || capitalizeWords(status.replace(/-/g, ' '));
}

/**
 * Readiness level formatting
 */

export function formatReadiness(level: string): string {
  const readinessMap: Record<string, string> = {
    red: 'Not Ready',
    yellow: 'In Progress',
    green: 'Ready',
  };

  return readinessMap[level] || capitalizeFirstLetter(level);
}

/**
 * Pluralization
 */

export function pluralize(count: number, singular: string, plural?: string): string {
  if (count === 1) return singular;
  return plural || `${singular}s`;
}

export function formatCount(count: number, singular: string, plural?: string): string {
  return `${count} ${pluralize(count, singular, plural)}`;
}

/**
 * Text sanitization
 */

export function sanitizeFilename(filename: string): string {
  return filename
    .replace(/[^a-z0-9]/gi, '_')
    .replace(/_{2,}/g, '_')
    .toLowerCase();
}

/**
 * Initials generation
 */

export function getInitials(name: string): string {
  return name
    .split(' ')
    .map(word => word.charAt(0).toUpperCase())
    .slice(0, 2)
    .join('');
}

/**
 * Color utilities for readiness
 */

export function getReadinessColor(level: string): string {
  const colorMap: Record<string, string> = {
    red: 'text-red-600 bg-red-100',
    yellow: 'text-yellow-600 bg-yellow-100',
    green: 'text-green-600 bg-green-100',
  };

  return colorMap[level] || 'text-gray-600 bg-gray-100';
}

export function getStatusColor(status: string): string {
  const colorMap: Record<string, string> = {
    draft: 'text-gray-600 bg-gray-100',
    'in-progress': 'text-blue-600 bg-blue-100',
    completed: 'text-green-600 bg-green-100',
    archived: 'text-gray-500 bg-gray-200',
  };

  return colorMap[status] || 'text-gray-600 bg-gray-100';
}
