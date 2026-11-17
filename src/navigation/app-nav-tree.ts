import type { LucideIcon } from 'lucide-react';
import { Boxes, Briefcase, FolderKanban, Gauge, Layers, Palette } from 'lucide-react';
import { urls } from '@/routes/urls';

export interface NavNode {
  id: string;
  labelKey: string;
  fallback: string;
  icon?: LucideIcon;
  to?: string;
  children?: NavNode[];
  end?: boolean;
  /** Numeric badge on branches. */
  badge?: number;
}

export interface FlatNavLeaf {
  id: string;
  labelKey: string;
  fallback: string;
  to: string;
  end?: boolean;
  icon?: LucideIcon;
}

/** Included sample verticals (Lite / Free-scope). */
export const PAGES_TREE: NavNode[] = [
  {
    id: 'saas',
    labelKey: 'nav.themes.saas',
    fallback: 'SaaS',
    icon: Briefcase,
    children: [
      {
        id: 'saas.analytics',
        labelKey: 'nav.saas.analytics',
        fallback: 'Analytics',
        to: urls.app.pages.saas.analytics,
      },
      {
        id: 'saas.members',
        labelKey: 'nav.saas.members',
        fallback: 'Members',
        to: urls.app.pages.saas.members,
      },
      {
        id: 'saas.calendar',
        labelKey: 'nav.saas.calendar',
        fallback: 'Calendar',
        to: urls.app.pages.saas.calendar,
      },
    ],
  },
  {
    id: 'project',
    labelKey: 'nav.themes.project',
    fallback: 'Project',
    icon: FolderKanban,
    children: [
      {
        id: 'project.kanban',
        labelKey: 'nav.project.kanban',
        fallback: 'Kanban',
        to: urls.app.pages.project.kanban,
      },
      {
        id: 'project.projects',
        labelKey: 'nav.project.projects',
        fallback: 'Projects',
        to: urls.app.pages.project.projects,
      },
      {
        id: 'project.tasks',
        labelKey: 'nav.project.tasks',
        fallback: 'Tasks',
        to: urls.app.pages.project.tasks,
      },
    ],
  },
];

export const UI_TREE: NavNode[] = [
  {
    id: 'tokens',
    labelKey: 'nav.ui.tokens',
    fallback: 'Styling tokens',
    icon: Palette,
    children: [
      {
        id: 'tk.colors',
        labelKey: 'nav.ui.tk.colors',
        fallback: 'Colors',
        to: urls.app.ui.tokens.colors,
      },
      {
        id: 'tk.presets',
        labelKey: 'nav.ui.tk.presets',
        fallback: 'Theme presets',
        to: urls.app.ui.tokens.presets,
      },
    ],
  },
  {
    id: 'components',
    labelKey: 'nav.ui.components',
    fallback: 'Core components',
    icon: Boxes,
    children: [
      {
        id: 'c.button',
        labelKey: 'nav.ui.c.button',
        fallback: 'Button',
        to: urls.app.ui.components.button,
      },
      {
        id: 'c.input',
        labelKey: 'nav.ui.c.input',
        fallback: 'Input & Textarea',
        to: urls.app.ui.components.input,
      },
      {
        id: 'c.form',
        labelKey: 'nav.ui.c.form',
        fallback: 'Form',
        to: urls.app.ui.components.form,
      },
      {
        id: 'c.card',
        labelKey: 'nav.ui.c.card',
        fallback: 'Card',
        to: urls.app.ui.components.card,
      },
      {
        id: 'c.badge',
        labelKey: 'nav.ui.c.badge',
        fallback: 'Badge & Avatar',
        to: urls.app.ui.components.badge,
      },
      {
        id: 'c.dialog',
        labelKey: 'nav.ui.c.dialog',
        fallback: 'Dialog / Drawer',
        to: urls.app.ui.components.dialog,
      },
      {
        id: 'c.tabs',
        labelKey: 'nav.ui.c.tabs',
        fallback: 'Tabs & Accordion',
        to: urls.app.ui.components.tabs,
      },
      {
        id: 'c.toast',
        labelKey: 'nav.ui.c.toast',
        fallback: 'Toast & Alert',
        to: urls.app.ui.components.toast,
      },
      {
        id: 'c.table',
        labelKey: 'nav.ui.c.table',
        fallback: 'Table',
        to: urls.app.ui.components.table,
      },
      {
        id: 'c.dropdown',
        labelKey: 'nav.ui.c.dropdown',
        fallback: 'Dropdown menu',
        to: urls.app.ui.components.dropdownMenu,
      },
      {
        id: 'c.tooltip',
        labelKey: 'nav.ui.c.tooltip',
        fallback: 'Tooltip',
        to: urls.app.ui.components.tooltip,
      },
    ],
  },
  {
    id: 'examples',
    labelKey: 'nav.ui.examples',
    fallback: 'Example components',
    icon: Layers,
    children: [
      {
        id: 'ex.feedback',
        labelKey: 'nav.ui.ex.feedback',
        fallback: 'Feedback',
        to: urls.app.ui.examples.feedback,
      },
      {
        id: 'ex.layout',
        labelKey: 'nav.ui.ex.layout',
        fallback: 'Layout',
        to: urls.app.ui.examples.layout,
      },
    ],
  },
];

export const TOP_TREE: NavNode[] = [
  {
    id: 'dashboards',
    labelKey: 'nav.dashboards.group',
    fallback: 'Dashboards',
    icon: Gauge,
    children: [
      {
        id: 'dashboards.overview',
        labelKey: 'nav.dashboards.overview',
        fallback: 'Overview',
        to: urls.app.dashboard,
        end: true,
      },
      {
        id: 'dashboards.saas',
        labelKey: 'nav.dashboards.saas',
        fallback: 'SaaS',
        to: urls.app.dashboards.saas,
      },
      {
        id: 'dashboards.project',
        labelKey: 'nav.dashboards.project',
        fallback: 'Project',
        to: urls.app.dashboards.project,
      },
    ],
  },
];

export function flattenNavLeaves(tree: NavNode[], parentIcon?: LucideIcon): FlatNavLeaf[] {
  return tree.flatMap((node) => {
    const icon = node.icon ?? parentIcon;
    if (node.children?.length) {
      return flattenNavLeaves(node.children, icon);
    }
    if (node.to) {
      return [
        {
          id: node.id,
          labelKey: node.labelKey,
          fallback: node.fallback,
          to: node.to,
          end: node.end,
          icon,
        },
      ];
    }
    return [];
  });
}

export function nodeMatchesPath(node: NavNode, pathname: string): boolean {
  if (node.to) {
    if (node.end) return pathname === node.to;
    return pathname === node.to || pathname.startsWith(`${node.to}/`);
  }
  return (node.children ?? []).some((child) => nodeMatchesPath(child, pathname));
}
