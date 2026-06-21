/**
 * One-time migration of localStorage keys from the legacy `dya-studio-*`
 * namespace (upstream DYA Studio) to this fork's `sofle-studio-*` namespace.
 *
 * Safe to call repeatedly and on every read: it acts only when the legacy
 * key exists and the new key is absent, then removes the legacy key. This
 * preserves the user's stored state (theme, connection consent, trusted
 * subsystem URLs) across the rename instead of silently resetting it.
 */
export function migrateLegacyKey(oldKey: string, newKey: string): void {
  try {
    if (localStorage.getItem(newKey) !== null) return;
    const legacy = localStorage.getItem(oldKey);
    if (legacy === null) return;
    localStorage.setItem(newKey, legacy);
    localStorage.removeItem(oldKey);
  } catch {
    // Ignore storage errors (e.g. disabled/unavailable localStorage).
  }
}
