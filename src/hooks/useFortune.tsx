import { useCallback, useEffect, useState } from "react";

function createProfileKey(profile: any) {
    return [
        profile.dob,
        profile.tob || "12:00",
        profile.pob || "Asia/Hong_Kong",
        profile.gender,
    ].join("|");
}

export function useFortune(refreshKey?: number) {
    const [loading, setLoading] = useState(true);
    const [profile, setProfile] = useState<any>(null);
    const [bazi, setBazi] = useState<any>(null);
    const [yearOutlook, setYearOutlook] = useState<any>(null);
    const [lucky, setLucky] = useState<any>(null);
    const [regional, setRegional] = useState<any>(null);
    const [amulet, setAmulet] = useState<string | null>(null);

    const todayKey = `flowmind_fortune_${new Date().toISOString().slice(0, 10)}`;

    const loadFortune = useCallback(async () => {
        try {
            setLoading(true);

            const stored = localStorage.getItem("flowmind_profile");
            if (!stored) {
                setProfile(null);
                setLoading(false);
                return;
            }

            const parsedProfile = JSON.parse(stored);
            setProfile(parsedProfile);

            const cachedRaw = localStorage.getItem(todayKey);
            const cached = cachedRaw ? JSON.parse(cachedRaw) : null;

            // ✅ Deterministic profile key
            const profileKey = createProfileKey(parsedProfile);
            const needsFetch = !cached || cached.profileKey !== profileKey;

            if (!needsFetch) {
                setBazi(cached.bazi_basic);
                setYearOutlook(cached.year_2026_outlook);
                setLucky(cached.lucky_colors_numbers);
                setRegional(cached.regional_advice);
                setAmulet(cached.amulet);
                setLoading(false);
                return;
            }

            const payload = {
                date: parsedProfile.dob,
                time: parsedProfile.tob || "12:00",
                location: parsedProfile.pob || "Asia/Hong_Kong",
                gender: parsedProfile.gender === "男" ? "Male" : "Female",
                year: "2026",
                lang: "cn",
                llm: "qianwen",
            };

            const res = await fetch(
                "https://memorykeeper.duckdns.org:8000/bazi",
                {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(payload),
                }
            );

            if (!res.ok) throw new Error(`Status ${res.status}`);
            const data = await res.json();

            setBazi(data.bazi_basic);
            setYearOutlook(data.year_2026_outlook);
            setLucky(data.lucky_colors_numbers);
            setRegional(data.regional_advice);
            setAmulet(data.amulet);

            localStorage.setItem(
                todayKey,
                JSON.stringify({ ...data, ...parsedProfile, profileKey })
            );
        } catch (err) {
            console.error("loadFortune error:", err);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        loadFortune();
    }, [loadFortune, refreshKey]);

    return {
        loading,
        profile,
        bazi,
        yearOutlook,
        lucky,
        regional,
        amulet,
        reload: loadFortune,
    };
}
