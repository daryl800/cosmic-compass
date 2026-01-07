import { useEffect, useMemo, useState } from "react";
import { format } from "date-fns";
import {
    CalendarIcon,
    Clock,
    MapPin,
    User,
} from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { toast } from "@/hooks/use-toast";
import { needsFetch } from "@/utils/needsFetch";
import { saveCachedFortune } from "@/utils/fortuneCache";
import { Profile } from "@/types/profile";

/* -----------------------------
   Constants
------------------------------ */

const CURRENT_YEAR = new Date().getFullYear();

const years = Array.from(
    { length: CURRENT_YEAR - 1919 },
    (_, i) => CURRENT_YEAR - i
);

const months = Array.from({ length: 12 }, (_, i) => i + 1);

const hours = Array.from({ length: 24 }, (_, i) => ({
    value: i.toString().padStart(2, "0"),
    label: `${i.toString().padStart(2, "0")}:00`,
}));

const locations = [
    { value: "Asia/Hong_Kong", label: "香港" },
    { value: "Asia/Shanghai", label: "上海" },
    { value: "Asia/Taipei", label: "台北" },
    { value: "Asia/Singapore", label: "新加坡" },
    { value: "Asia/Tokyo", label: "東京" },
];

/* -----------------------------
   Component
------------------------------ */

export const ProfileForm = ({
    onProfileSaved,
}: {
    onProfileSaved?: () => void;
}) => {
    /* -----------------------------
       State
    ------------------------------ */

    const [year, setYear] = useState<number | null>(null);
    const [month, setMonth] = useState<number | null>(null);
    const [day, setDay] = useState<number | null>(null);

    const [hour, setHour] = useState("");
    const [location, setLocation] = useState("");
    const [gender, setGender] = useState<"男" | "女" | "">("");
    const [isSubmitting, setIsSubmitting] = useState(false);

    /* -----------------------------
       Derived Date
    ------------------------------ */

    const date = useMemo(() => {
        if (!year || !month || !day) return null;
        return new Date(year, month - 1, day);
    }, [year, month, day]);

    const daysInMonth = useMemo(() => {
        if (!year || !month) return [];
        const lastDay = new Date(year, month, 0).getDate();
        return Array.from({ length: lastDay }, (_, i) => i + 1);
    }, [year, month]);

    /* -----------------------------
       Load saved profile
    ------------------------------ */

    const [fortune, setFortune] = useState<any>(null);

    useEffect(() => {
        const saved = localStorage.getItem("flowmind_profile");
        if (!saved) return;

        try {
            const p = JSON.parse(saved);
            if (p.dob) {
                const d = new Date(p.dob);
                setYear(d.getFullYear());
                setMonth(d.getMonth() + 1);
                setDay(d.getDate());
            }
            if (p.tob) setHour(p.tob.slice(0, 2));
            if (p.pob) setLocation(p.pob);
            if (p.gender) setGender(p.gender);
        } catch {
            console.warn("Invalid profile data");
        }
    }, []);

    /* -----------------------------
       Submit
    ------------------------------ */

    const handleSubmit = () => {
        if (!date || !gender) {
            toast({
                title: "請填寫必填欄位",
                description: "出生日期和性別為必填項目",
                variant: "destructive",
            });
            return;
        }

        setIsSubmitting(true);

        const profile = {
            dob: format(date, "yyyy-MM-dd"),
            tob: hour ? `${hour}:00` : "12:00",
            pob: location || "Asia/Hong_Kong",
            gender,
            createdAt: Date.now(),
        };

        // ✅ create deterministic key
        const profileKey = [
            profile.dob,
            profile.tob,
            profile.pob,
            profile.gender,
        ].join("|");

        // ✅ save profile + profileKey
        localStorage.setItem(
            "flowmind_profile",
            JSON.stringify({ ...profile, profileKey })
        );

        toast({
            title: "命理資料已建立 ✨",
            description: "正在為你解讀命盤 ... ",
        });

        onProfileSaved?.();
        setIsSubmitting(false);
    };


    /* -----------------------------
       Render
    ------------------------------ */

    return (
        <div className="w-full max-w-md mx-auto space-y-8">
            {/* Birth Date */}
            <div className="space-y-3">
                <Label className="flex items-center gap-2">
                    <CalendarIcon className="w-4 h-4 text-primary" />
                    出生日期 *
                </Label>

                {/* Year */}
                <Select
                    value={year?.toString()}
                    onValueChange={(v) => {
                        setYear(Number(v));
                        setDay(null);
                    }}
                >
                    <SelectTrigger className="h-12">
                        <SelectValue placeholder="出生年份" />
                    </SelectTrigger>
                    <SelectContent>
                        {years.map((y) => (
                            <SelectItem key={y} value={y.toString()}>
                                {y} 年
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>

                {/* Month + Day */}
                <div className="grid grid-cols-2 gap-4">
                    <Select
                        value={month?.toString()}
                        onValueChange={(v) => {
                            setMonth(Number(v));
                            setDay(null);
                        }}
                        disabled={!year}
                    >
                        <SelectTrigger className="h-12">
                            <SelectValue placeholder="月份" />
                        </SelectTrigger>
                        <SelectContent>
                            {months.map((m) => (
                                <SelectItem key={m} value={m.toString()}>
                                    {m} 月
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>

                    <Select
                        value={day?.toString()}
                        onValueChange={(v) => setDay(Number(v))}
                        disabled={!month}
                    >
                        <SelectTrigger className="h-12">
                            <SelectValue placeholder="日期" />
                        </SelectTrigger>
                        <SelectContent>
                            {daysInMonth.map((d) => (
                                <SelectItem key={d} value={d.toString()}>
                                    {d} 日
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>
            </div>

            {/* Time */}
            <Select value={hour} onValueChange={setHour}>
                <SelectTrigger className="h-12">
                    <SelectValue placeholder="出生時辰（可選）" />
                </SelectTrigger>
                <SelectContent>
                    {hours.map((h) => (
                        <SelectItem key={h.value} value={h.value}>
                            {h.label}
                        </SelectItem>
                    ))}
                </SelectContent>
            </Select>

            {/* Location */}
            <Select value={location} onValueChange={setLocation}>
                <SelectTrigger className="h-12">
                    <SelectValue placeholder="出生地點（可選）" />
                </SelectTrigger>
                <SelectContent>
                    {locations.map((l) => (
                        <SelectItem key={l.value} value={l.value}>
                            {l.label}
                        </SelectItem>
                    ))}
                </SelectContent>
            </Select>

            {/* Gender */}
            <RadioGroup
                value={gender}
                onValueChange={(v) => setGender(v as any)}
                className="flex gap-4"
            >
                {["男", "女"].map((g) => (
                    <Label
                        key={g}
                        className={cn(
                            "flex-1 h-12 flex items-center justify-center border rounded",
                            gender === g && "border-primary bg-primary/10"
                        )}
                    >
                        <RadioGroupItem value={g} className="sr-only" />
                        {g}
                    </Label>
                ))}
            </RadioGroup>

            {/* Submit */}
            <Button
                variant="golden"
                size="xl"
                className="w-full"
                onClick={handleSubmit}
                disabled={isSubmitting}
            >
                {isSubmitting ? "解讀命盤中…" : "開啟命理之旅"}
            </Button>
        </div>
    );
};
