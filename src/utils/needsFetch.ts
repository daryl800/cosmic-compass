// utils/needsFetch.ts
import { Profile } from "@/types/profile";
import { createProfileKey } from "@/utils/profileKey";
import { loadCachedFortune } from "@/utils/fortuneCache";

export function needsFetch(profile: Profile): {
    needsFetch: boolean;
    profileKey: string;
} {
    const profileKey = createProfileKey(profile);
    const cached = loadCachedFortune();

    if (!cached) {
        return { needsFetch: true, profileKey };
    }

    return {
        needsFetch: cached.profileKey !== profileKey,
        profileKey,
    };
}
