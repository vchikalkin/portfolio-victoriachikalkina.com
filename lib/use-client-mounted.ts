import { useSyncExternalStore } from 'react';

function noopUnsubscribe() {
  // useSyncExternalStore requires a cleanup function even when unused.
}

function subscribeToClientMount() {
  return noopUnsubscribe;
}

function getClientMountedSnapshot() {
  return true;
}

function getServerMountedSnapshot() {
  return false;
}

export function useIsClientMounted() {
  return useSyncExternalStore(
    subscribeToClientMount,
    getClientMountedSnapshot,
    getServerMountedSnapshot,
  );
}
