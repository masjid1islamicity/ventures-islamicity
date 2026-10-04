import { OfflineActionQueueItem } from '../types';

const QUEUE_STORAGE_KEY = 'kaffah_offline_action_queue';
const CACHE_METADATA_KEY = 'kaffah_cache_meta';

export const getOfflineQueue = (): OfflineActionQueueItem[] => {
  try {
    const raw = localStorage.getItem(QUEUE_STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
};

export const saveOfflineQueue = (queue: OfflineActionQueueItem[]): void => {
  try {
    localStorage.setItem(QUEUE_STORAGE_KEY, JSON.stringify(queue));
  } catch (err) {
    console.error('Failed to save offline queue', err);
  }
};

export const enqueueOfflineAction = (actionType: 'DONATION' | 'INVESTMENT' | 'PITCH_DRAFT', payload: any): OfflineActionQueueItem => {
  const queue = getOfflineQueue();
  const newItem: OfflineActionQueueItem = {
    id: `queue_${Date.now()}_${Math.random().toString(36).substr(2, 6)}`,
    actionType,
    payload,
    createdAt: new Date().toISOString(),
    synced: false,
  };
  queue.push(newItem);
  saveOfflineQueue(queue);
  return newItem;
};

export const clearSyncedOfflineQueue = (): void => {
  saveOfflineQueue([]);
};

export const getCacheStatus = () => {
  return {
    investorsCount: 8240,
    projectsCount: 14,
    lastCachedAt: new Date().toLocaleDateString('id-ID', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    }),
    isIndexedDBReady: true,
    totalStorageEstimateKb: 1480,
  };
};
