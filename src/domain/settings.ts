export interface AppSettings {
  anchorDelay: number;
  unanchorDelay: number;
}

export const DEFAULT_SETTINGS: AppSettings = {
  anchorDelay: 500,
  unanchorDelay: 200,
};

const STORAGE_KEY = "recetario-settings";

export function loadSettings(): AppSettings {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) return { ...DEFAULT_SETTINGS, ...JSON.parse(raw) };
  } catch {}
  return { ...DEFAULT_SETTINGS };
}

export function saveSettings(settings: AppSettings): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(settings));
}
