import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { AlertCircle, Bell, CheckCircle2, Info, TriangleAlert } from 'lucide-react';
import { Badge, Button, Popover, PopoverContent, PopoverTrigger } from '@/components/ui';
import {
  formatRelative,
  sampleNotifications,
  type NotificationItem,
  type NotificationKind,
} from '@/mocks/fixtures/notifications';
import { cn } from '@/lib/cn';
import {
  headerFloatingPanelWidthClassName,
  useHeaderFloatingPanel,
} from '@/lib/header-floating-panel';
import { MotionList, MotionListItem } from '@/components/motion';

const NOTIFICATIONS_COLLAPSED_COUNT = 3;
/** Collapsed: cap list height (~3 rows) so expanded state can grow the panel. */
const NOTIFICATIONS_COLLAPSED_LIST_CLASS = 'max-h-[19.5rem] overflow-hidden';
/** Expanded: ~6 rows visible, then scroll (8 items in mock data). */
const NOTIFICATIONS_EXPANDED_LIST_CLASS =
  'h-[calc(6*5.5rem)] min-h-[calc(6*5.5rem)] overflow-y-auto';

const KIND_ICON: Record<NotificationKind, React.ComponentType<{ className?: string }>> = {
  info: Info,
  success: CheckCircle2,
  warning: TriangleAlert,
  error: AlertCircle,
};

const KIND_TONE: Record<NotificationKind, string> = {
  info: 'text-info',
  success: 'text-success-text',
  warning: 'text-amber-600 dark:text-amber-400',
  error: 'text-danger-text',
};

function NotificationRows({
  items,
  onMarkRead,
}: {
  items: NotificationItem[];
  onMarkRead: (id: string) => void;
}) {
  return (
    <MotionList stagger="tight" className="divide-y divide-input">
      {items.map((n) => {
        const Icon = KIND_ICON[n.kind];
        return (
          <MotionListItem key={n.id}>
            <button
              type="button"
              onClick={() => onMarkRead(n.id)}
              className="flex w-full items-start gap-3 px-4 py-3.5 text-left transition-colors hover:bg-muted/60"
            >
              <span
                className={cn(
                  'mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-input bg-muted/40',
                  KIND_TONE[n.kind],
                )}
              >
                <Icon className="h-4 w-4" />
              </span>
              <div className="min-w-0 flex-1 space-y-1">
                <div className="flex items-center gap-2">
                  <span
                    className={cn(
                      'truncate text-sm',
                      n.read ? 'font-normal text-foreground' : 'font-semibold text-foreground',
                    )}
                  >
                    {n.title}
                  </span>
                  {!n.read ? <span className="h-2 w-2 shrink-0 rounded-full bg-primary" /> : null}
                </div>
                <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                  {n.description}
                </p>
                <p className="text-xs text-muted-foreground">{formatRelative(n.createdAt)}</p>
              </div>
            </button>
          </MotionListItem>
        );
      })}
    </MotionList>
  );
}

/**
 * Header popover listing recent notifications with read/unread state.
 * Uses `src/mocks/fixtures/notifications.ts` as the seed data.
 */
export function NotificationsPopover() {
  const { t } = useTranslation();
  const { align, sideOffset, collisionPadding, isMobile } = useHeaderFloatingPanel();
  const [items, setItems] = useState<NotificationItem[]>(sampleNotifications);
  const [expanded, setExpanded] = useState(false);
  const unreadCount = items.filter((n) => !n.read).length;
  const hasMore = items.length > NOTIFICATIONS_COLLAPSED_COUNT;
  const visibleItems = expanded ? items : items.slice(0, NOTIFICATIONS_COLLAPSED_COUNT);

  const markAllRead = () => setItems((list) => list.map((n) => ({ ...n, read: true })));
  const markOneRead = (id: string) =>
    setItems((list) => list.map((n) => (n.id === id ? { ...n, read: true } : n)));

  const listContent =
    items.length === 0 ? (
      <div className="px-4 py-10 text-center text-sm text-muted-foreground">
        {t('notifications.empty', 'You are all caught up.')}
      </div>
    ) : (
      <NotificationRows items={visibleItems} onMarkRead={markOneRead} />
    );

  return (
    <Popover
      onOpenChange={(open) => {
        if (!open) setExpanded(false);
      }}
    >
      <PopoverTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="relative h-9 w-9 hover:bg-muted"
          aria-label={t('notifications.title', 'Notifications')}
        >
          <Bell className="h-4 w-4" />
          {unreadCount > 0 ? (
            <span className="absolute right-1 top-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-destructive px-1 text-[10px] font-semibold text-destructive-foreground">
              {unreadCount}
            </span>
          ) : null}
        </Button>
      </PopoverTrigger>
      <PopoverContent
        align={align}
        sideOffset={sideOffset}
        collisionPadding={collisionPadding}
        className={cn(
          'flex flex-col overflow-hidden p-0',
          expanded ? 'max-h-[min(40rem,calc(100vh-4rem))]' : 'max-h-[min(32rem,calc(100vh-5rem))]',
          headerFloatingPanelWidthClassName(isMobile, 'w-[22rem] sm:w-96'),
        )}
      >
        <div className="flex shrink-0 items-center justify-between gap-3 border-b border-input px-4 py-3.5">
          <div className="flex min-w-0 items-center gap-2.5">
            <span className="text-sm font-semibold text-foreground">
              {t('notifications.title', 'Notifications')}
            </span>
            {unreadCount > 0 ? (
              <Badge variant="secondary" className="h-6 px-2 text-xs">
                {unreadCount} {t('notifications.new', 'new')}
              </Badge>
            ) : null}
          </div>
          <Button
            variant="outline"
            size="sm"
            className="h-8 shrink-0 px-3 text-xs"
            onClick={markAllRead}
            disabled={unreadCount === 0}
          >
            {t('notifications.markAllRead', 'Mark all read')}
          </Button>
        </div>
        <div
          className={cn(
            'min-h-0 shrink-0 overscroll-y-contain',
            expanded ? NOTIFICATIONS_EXPANDED_LIST_CLASS : NOTIFICATIONS_COLLAPSED_LIST_CLASS,
          )}
          onWheel={expanded ? (e) => e.stopPropagation() : undefined}
        >
          {listContent}
        </div>
        {hasMore && !expanded ? (
          <Button
            type="button"
            variant="ghost"
            className="h-10 w-full shrink-0 rounded-none border-t border-input text-sm font-medium text-foreground hover:bg-muted/60"
            onClick={() => setExpanded(true)}
          >
            {t('notifications.seeMore', 'See more')}
          </Button>
        ) : null}
      </PopoverContent>
    </Popover>
  );
}
