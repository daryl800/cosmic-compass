import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useFortune } from "@/hooks/useFortune";

/* -----------------------------
   Helpers
------------------------------*/
const renderDots = (count: number) => "●".repeat(count || 0);

const fiveElementCN: Record<string, string> = {
    Wood: "木",
    Fire: "火",
    Earth: "土",
    Metal: "金",
    Water: "水",
};

const getFiveElementSummary = (strength: Record<string, number>) => {
    const sorted = Object.entries(strength).sort((a, b) => b[1] - a[1]);
    const strongest = sorted[0];
    const weakest = sorted[sorted.length - 1];
    let summary = "";
    if (strongest) summary += `偏${fiveElementCN[strongest[0]]}`;
    if (sorted[1]) summary += fiveElementCN[sorted[1][0]];
    if (weakest && weakest[1] === 0) summary += `，${fiveElementCN[weakest[0]]}不足`;
    return summary;
};

/* -----------------------------
   Fortune Page
------------------------------*/
export default function FortunePage() {
    const navigate = useNavigate();

    const {
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
    } = useFortune();

    /* -----------------------------
       Guard: no profile → back
    ------------------------------*/
    useEffect(() => {
        if (!loading && !profile) {
            navigate("/");
        }
    }, [loading, profile, navigate]);

    /* -----------------------------
       Loading
    ------------------------------*/
    if (loading || !profile) {
        return (
            // <div className="min-h-screen flex flex-col items-center justify-center bg-[#121212] text-white">
            //     <div className="animate-float text-6xl mb-4">🔮</div>
            //     <p className="text-lg">正在推演你的命盤 …</p>
            //     <p className="text-sm text-gray-400 mt-2">
            //         為你整理八字、流年與開運建議
            //     </p>
            // </div>
            <div className="min-h-screen flex flex-col items-center justify-center bg-[#121212] text-white">
                {/* Original floating emoji line */}
                <div className="text-4xl animate-bounce">🔮</div>

                {/* Animated text line */}
                <p className="text-sm text-gray-400 flex flex-wrap justify-center gap-1">
                    {Array.from("正在努力你整理八字、流年與開運建議，比啲耐性 ... ... ...").map((char, idx) => (
                        <span
                            key={idx}
                            className="inline-block opacity-0 animate-fade-in"
                            style={{ animationDelay: `${idx * 0.5}s` }}
                        >
                            {char}
                        </span>
                    ))}
                    {/* Optional: add emoji at the end */}
                    <span className="inline-block opacity-0 animate-fade-in" style={{ animationDelay: `${"為你整理八字、流年與開運建議".length * 0.1}s` }}>
                    </span>
                </p>
            </div>

        );
    }

    /* -----------------------------
       Main Content
    ------------------------------*/
    return (
        <div className="min-h-screen bg-[#121212] text-white px-6 py-10 flex justify-center">
            <div className="w-full max-w-md space-y-6">

                <h1 className="text-3xl font-bold text-center mb-4">知行順勢</h1>

                <Card title="👤 基本資料">
                    <p>性別：{profile?.gender}</p>
                    <p>出生：{profile?.dob}</p>
                    {profile?.tob && <p>時間：{profile.tob}</p>}
                    {profile?.pob && <p>地點：{profile.pob}</p>}
                </Card>

                {bazi?.pillars && bazi?.five_elements_strength && (
                    <div className="grid grid-cols-2 gap-4">
                        <Card title="八字四柱">
                            <p>年柱：{bazi.pillars.year.gan_local}{bazi.pillars.year.zhi_local}</p>
                            <p>月柱：{bazi.pillars.month.gan_local}{bazi.pillars.month.zhi_local}</p>
                            <p>日柱：{bazi.pillars.day.gan_local}{bazi.pillars.day.zhi_local}（日主）</p>
                            <p>時柱：{bazi.pillars.hour.gan_local}{bazi.pillars.hour.zhi_local}</p>
                        </Card>

                        <Card title="五行分佈">
                            {Object.entries(bazi.five_elements_strength).map(([k, v]) => (
                                <p key={k}>{fiveElementCN[k]}：{renderDots(v)}</p>
                            ))}
                            <p className="text-gray-400 italic mt-2">
                                {getFiveElementSummary(bazi.five_elements_strength)}
                            </p>
                        </Card>
                    </div>
                )}

                {tenGodsAnalysis && (
                    <Card title="十神分析">
                        {Object.entries(tenGodsAnalysis).map(([k, v]) => (
                            <p key={k}><strong>{k}</strong>：{v}</p>
                        ))}
                    </Card>
                )}

                {personalityAndCareerLogic && (
                    <Card title="性格與職業邏輯">
                        <p>{personalityAndCareerLogic}</p>
                    </Card>
                )}

                <Card title="適合 / 避免行業">
                    <p>適合：{careerFavorable?.join("、")}</p>
                    <p>避免：{careerUnfavorable?.join("、")}</p>
                </Card>

                {agePhaseJudgement && (
                    <Card title="大運評估">
                        <p>{agePhaseJudgement}</p>
                    </Card>
                )}

                {auspiciousElements && (
                    <Card title="開運元素">
                        <p>🎨 顏色：{auspiciousElements.colors.join("、")}</p>
                        <p>🔢 數字：{auspiciousElements.numbers.join("、")}</p>
                        <p>🧭 方位：{auspiciousElements.directions.join("、")}</p>
                        <p>🌏 地區：{auspiciousElements.regions.join("、")}</p>
                        <p>🌦 氣候：{auspiciousElements.climate.join("、")}</p>
                        <p>🏞 地形：{auspiciousElements.terrain.join("、")}</p>
                        {auspiciousElements.avoid?.length > 0 && (
                            <p className="text-gray-400 italic">
                                避免：{auspiciousElements.avoid.join("、")}
                            </p>
                        )}
                        <p className="text-gray-400 italic mt-2">
                            {auspiciousElements.usage_tips}
                        </p>
                    </Card>
                )}

                {amulet && (
                    <Card title="🧧 開運物品推薦">
                        <p>{amulet}</p>
                        <p className="text-gray-400 italic">{amuletReason}</p>
                    </Card>
                )}

                {year2026Analysis && (
                    <Card title="🔮 2026 流年分析">
                        <p>{year2026Analysis}</p>
                        <p className="mt-2">投資策略：{investmentStrategy2026}</p>
                        <p className="italic text-gray-400 mt-2">{finalAdvice}</p>
                    </Card>
                )}

                <button
                    onClick={() => navigate("/")}
                    className="w-full mt-4 py-3 rounded-xl bg-orange-500 hover:bg-orange-600 transition"
                >
                    修改個人資料
                </button>
            </div>
        </div>
    );
}

/* -----------------------------
   Card Component
------------------------------*/
function Card({
    title,
    children,
}: {
    title: string;
    children: React.ReactNode;
}) {
    return (
        <div className="rounded-2xl border border-white/10 bg-white/5 p-5 space-y-2">
            <h2 className="text-lg font-semibold text-yellow-400">{title}</h2>
            <div className="text-sm leading-relaxed">{children}</div>
        </div>
    );
}
