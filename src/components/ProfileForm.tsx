import { useState } from "react";
import { format } from "date-fns";
import { zhCN } from "date-fns/locale";
import { CalendarIcon, MapPin, User, Clock, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
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

const locations = [
  { value: "Asia/Hong_Kong", label: "香港" },
  { value: "Asia/Shanghai", label: "上海" },
  { value: "Asia/Taipei", label: "台北" },
  { value: "Asia/Singapore", label: "新加坡" },
  { value: "Asia/Tokyo", label: "東京" },
  { value: "America/New_York", label: "紐約" },
  { value: "America/Los_Angeles", label: "洛杉磯" },
  { value: "Europe/London", label: "倫敦" },
];

const hours = Array.from({ length: 24 }, (_, i) => ({
  value: i.toString().padStart(2, "0"),
  label: `${i.toString().padStart(2, "0")}:00`,
}));

export const ProfileForm = () => {
  const [date, setDate] = useState<Date>();
  const [hour, setHour] = useState<string>("");
  const [location, setLocation] = useState<string>("");
  const [gender, setGender] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async () => {
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

    // Simulate save - in real app would call API
    await new Promise((resolve) => setTimeout(resolve, 1500));

    localStorage.setItem("flowmind_profile", JSON.stringify(profile));

    toast({
      title: "命理資料已建立 ✨",
      description: "正在為你解讀星盤...",
    });

    setIsSubmitting(false);
  };

  return (
    <div className="w-full max-w-md mx-auto space-y-8">
      {/* Date Selection */}
      <div className="space-y-3 opacity-0 animate-fade-in" style={{ animationDelay: "0.1s" }}>
        <Label className="text-sm font-medium text-muted-foreground flex items-center gap-2">
          <CalendarIcon className="w-4 h-4 text-primary" />
          出生日期 <span className="text-primary">*</span>
        </Label>
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="cosmic"
              className={cn(
                "w-full justify-start text-left font-normal h-12",
                !date && "text-muted-foreground"
              )}
            >
              <CalendarIcon className="mr-2 h-4 w-4" />
              {date ? format(date, "yyyy年MM月dd日", { locale: zhCN }) : "選擇你的出生日期"}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0 bg-popover border-border" align="start">
            <Calendar
              mode="single"
              selected={date}
              onSelect={setDate}
              disabled={(date) =>
                date > new Date() || date < new Date("1900-01-01")
              }
              initialFocus
              className="p-3 pointer-events-auto"
              captionLayout="dropdown-buttons"
              fromYear={1920}
              toYear={new Date().getFullYear()}
            />
          </PopoverContent>
        </Popover>
      </div>

      {/* Time Selection */}
      <div className="space-y-3 opacity-0 animate-fade-in" style={{ animationDelay: "0.2s" }}>
        <Label className="text-sm font-medium text-muted-foreground flex items-center gap-2">
          <Clock className="w-4 h-4 text-primary" />
          出生時辰 <span className="text-muted-foreground text-xs">(可選)</span>
        </Label>
        <Select value={hour} onValueChange={setHour}>
          <SelectTrigger className="w-full h-12 bg-secondary/50 border-border hover:border-primary/50 transition-colors">
            <SelectValue placeholder="選擇出生時辰" />
          </SelectTrigger>
          <SelectContent className="bg-popover border-border max-h-60">
            {hours.map((h) => (
              <SelectItem key={h.value} value={h.value}>
                {h.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Location Selection */}
      <div className="space-y-3 opacity-0 animate-fade-in" style={{ animationDelay: "0.3s" }}>
        <Label className="text-sm font-medium text-muted-foreground flex items-center gap-2">
          <MapPin className="w-4 h-4 text-primary" />
          出生地點 <span className="text-muted-foreground text-xs">(可選)</span>
        </Label>
        <Select value={location} onValueChange={setLocation}>
          <SelectTrigger className="w-full h-12 bg-secondary/50 border-border hover:border-primary/50 transition-colors">
            <SelectValue placeholder="選擇出生地點" />
          </SelectTrigger>
          <SelectContent className="bg-popover border-border">
            {locations.map((loc) => (
              <SelectItem key={loc.value} value={loc.value}>
                {loc.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Gender Selection */}
      <div className="space-y-4 opacity-0 animate-fade-in" style={{ animationDelay: "0.4s" }}>
        <Label className="text-sm font-medium text-muted-foreground flex items-center gap-2">
          <User className="w-4 h-4 text-primary" />
          性別 <span className="text-primary">*</span>
        </Label>
        <RadioGroup
          value={gender}
          onValueChange={setGender}
          className="flex gap-4"
        >
          <div className="flex-1">
            <RadioGroupItem
              value="男"
              id="male"
              className="peer sr-only"
            />
            <Label
              htmlFor="male"
              className={cn(
                "flex items-center justify-center h-12 rounded-lg border-2 cursor-pointer transition-all duration-300",
                "border-border bg-secondary/30 hover:border-primary/50",
                "peer-checked:border-primary peer-checked:bg-primary/10 peer-checked:shadow-[0_0_20px_hsl(38_75%_55%/0.2)]",
                gender === "男" && "border-primary bg-primary/10 shadow-[0_0_20px_hsl(38_75%_55%/0.2)]"
              )}
            >
              <span className="font-medium">男</span>
            </Label>
          </div>
          <div className="flex-1">
            <RadioGroupItem
              value="女"
              id="female"
              className="peer sr-only"
            />
            <Label
              htmlFor="female"
              className={cn(
                "flex items-center justify-center h-12 rounded-lg border-2 cursor-pointer transition-all duration-300",
                "border-border bg-secondary/30 hover:border-primary/50",
                "peer-checked:border-primary peer-checked:bg-primary/10 peer-checked:shadow-[0_0_20px_hsl(38_75%_55%/0.2)]",
                gender === "女" && "border-primary bg-primary/10 shadow-[0_0_20px_hsl(38_75%_55%/0.2)]"
              )}
            >
              <span className="font-medium">女</span>
            </Label>
          </div>
        </RadioGroup>
      </div>

      {/* Submit Button */}
      <div className="pt-4 opacity-0 animate-fade-in" style={{ animationDelay: "0.5s" }}>
        <Button
          variant="golden"
          size="xl"
          className="w-full"
          onClick={handleSubmit}
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <span className="flex items-center gap-2">
              <span className="w-5 h-5 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
              解讀命盤中...
            </span>
          ) : (
            <span className="flex items-center gap-2">
              <Sparkles className="w-5 h-5" />
              開啟命理之旅
            </span>
          )}
        </Button>
      </div>
    </div>
  );
};
