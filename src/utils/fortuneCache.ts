// utils/fortuneCache.ts
import { CachedFortune } from "@/types/fortune";

const CACHE_KEY = "flowmind_fortune";

export function loadCachedFortune(): CachedFortune | null {
    const raw = localStorage.getItem(CACHE_KEY);
    if (!raw) return null;

    try {
        return JSON.parse(raw) as CachedFortune;
    } catch {
        return null;
    }
}

export function saveCachedFortune(data: CachedFortune) {
    localStorage.setItem(CACHE_KEY, JSON.stringify(data));
}
