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
    const [fortuneData, setFortuneData] = useState<any>(null); // store entire JSON

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

            const profileKey = createProfileKey(parsedProfile);
            const needsFetch = !cached || cached.profileKey !== profileKey;

            if (!needsFetch) {
                setFortuneData(cached);
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

            const apiURL = `${import.meta.env.VITE_API_BASE}/bazi`;

            const res = await fetch(apiURL, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload),
            });

            if (!res.ok) throw new Error(`Status ${res.status}`);
            const data = await res.json();

            // Attach profileKey for caching
            const fullData = { ...data, profileKey };
            setFortuneData(fullData);

            localStorage.setItem(todayKey, JSON.stringify(fullData));
        } catch (err) {
            console.error("loadFortune error:", err);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        loadFortune();
    }, [loadFortune, refreshKey]);

    // convenience fields for old API compatibility
    const bazi = fortuneData?.bazi_basic || null;
    const fourPillars = fortuneData?.four_pillars || null;
    const fiveElementsStrength = fortuneData?.five_elements_strength || null;
    const fiveElementsAnalysis = fortuneData?.five_elements_analysis || null;
    const tenGodsAnalysis = fortuneData?.ten_gods_analysis || null;
    const personalityAndCareerLogic = fortuneData?.personality_and_career_logic || null;
    const careerFavorable = fortuneData?.career_favorable || null;
    const careerUnfavorable = fortuneData?.career_unfavorable || null;
    const agePhaseJudgement = fortuneData?.age_phase_judgement || null;
    const auspiciousElements = fortuneData?.auspicious_elements || null;
    const year2026Analysis = fortuneData?.year_2026_analysis || null;
    const investmentStrategy2026 = fortuneData?.investment_strategy_2026 || null;
    const amulet = fortuneData?.amulet?.item || null;
    const amuletReason = fortuneData?.amulet?.reason || null;
    const finalAdvice = fortuneData?.final_advice || null;

    return {
        loading,
        profile,
        bazi,
        fourPillars,
        fiveElementsStrength,
        fiveElementsAnalysis,
        tenGodsAnalysis,
        personalityAndCareerLogic,
        careerFavorable,
        careerUnfavorable,
        agePhaseJudgement,
        auspiciousElements,
        year2026Analysis,
        investmentStrategy2026,
        amulet,
        amuletReason,
        finalAdvice
    };
}
