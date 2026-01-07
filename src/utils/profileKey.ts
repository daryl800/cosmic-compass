// utils/profileKey.ts
import { Profile } from "@/types/profile";

export function createProfileKey(profile: Profile): string {
    return [
        profile.dob,
        profile.tob ?? "12:00",   // default time MUST be normalized
        profile.pob,
        profile.gender,
    ].join("|");
}
