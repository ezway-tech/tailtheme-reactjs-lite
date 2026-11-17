/**
 * TailTheme Lite — static configuration (Free-scope OSS).
 */

import type { Theme } from '@/hooks/use-theme';
import type { PageTransitionPresetId } from '@/lib/motion/page-transition-presets';

/** Product name: shell, auth, splash, landing footer, and `document.title`. */
export const APP_TITLE = 'TailTheme';

export const PREFERENCES_STORAGE_KEY = 'tailtheme-prefs';
export const COLOR_MODE_STORAGE_KEY = 'tailtheme-theme';
export const COMMAND_PALETTE_RECENTS_STORAGE_KEY = 'tailtheme-cmdk-recents';

export const DEFAULT_COLOR_MODE: Theme = 'system';
export const APP_PAGE_TRANSITIONS_ENABLED = true;
export const APP_PAGE_DEFAULT_TRANSITION: PageTransitionPresetId = 'none';

export const DEFAULT_PREFERENCES_VALUES = {
  layout: 'sidebar',
  radius: 0.75,
  fontFamily: 'inter',
  uiScale: 100,
  primaryHsl: '205 70% 37%',
  accentHsl: '16 86% 54%',
  successHsl: '142 70% 38%',
  warningHsl: '38 92% 50%',
  infoHsl: '200 84% 50%',
  sidebarPrimaryHsl: '205 70% 37%',
  chart1Hsl: '205 70% 37%',
  chart2Hsl: '173 70% 45%',
  rtl: false,
  sidebarState: 'expanded',
} as const;

export const UI_SCALE_STEPS: { value: number; label: string }[] = [
  { value: 90, label: 'S' },
  { value: 100, label: 'M' },
  { value: 110, label: 'L' },
  { value: 125, label: 'XL' },
];

export interface PresetPalette {
  id: string;
  name: string;
  primaryHsl: string;
  accentHsl: string;
  successHsl: string;
  warningHsl: string;
  infoHsl: string;
  sidebarPrimaryHsl: string;
  chart1Hsl: string;
  chart2Hsl: string;
}

/** Lite ships four presets; Full includes more. */
export const PRESET_PALETTES: PresetPalette[] = [
  {
    id: 'tailtheme',
    name: 'TailTheme Blue',
    primaryHsl: '205 70% 37%',
    accentHsl: '16 86% 54%',
    successHsl: '142 70% 38%',
    warningHsl: '38 92% 50%',
    infoHsl: '200 84% 50%',
    sidebarPrimaryHsl: '205 70% 37%',
    chart1Hsl: '205 70% 37%',
    chart2Hsl: '173 70% 45%',
  },
  {
    id: 'slate',
    name: 'Slate',
    primaryHsl: '215 20% 35%',
    accentHsl: '173 58% 39%',
    successHsl: '142 70% 38%',
    warningHsl: '38 92% 50%',
    infoHsl: '200 84% 50%',
    sidebarPrimaryHsl: '215 20% 35%',
    chart1Hsl: '215 20% 35%',
    chart2Hsl: '173 58% 39%',
  },
  {
    id: 'rose',
    name: 'Rose',
    primaryHsl: '346 77% 50%',
    accentHsl: '24 95% 53%',
    successHsl: '142 70% 38%',
    warningHsl: '38 92% 50%',
    infoHsl: '200 84% 50%',
    sidebarPrimaryHsl: '346 77% 50%',
    chart1Hsl: '346 77% 50%',
    chart2Hsl: '24 95% 53%',
  },
  {
    id: 'violet',
    name: 'Violet',
    primaryHsl: '262 83% 58%',
    accentHsl: '190 90% 40%',
    successHsl: '142 70% 38%',
    warningHsl: '38 92% 50%',
    infoHsl: '200 84% 50%',
    sidebarPrimaryHsl: '262 83% 58%',
    chart1Hsl: '262 83% 58%',
    chart2Hsl: '190 90% 40%',
  },
];
