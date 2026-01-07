# FlowMind Starter Template

Complete guide to recreate this project from scratch.

## 1. Create Project

```bash
npm create vite@latest flowmind-fe -- --template react-ts
cd flowmind-fe
npm install
```

## 2. Install Dependencies

```bash
# Tailwind CSS
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p

# Shadcn UI
npx shadcn-ui@latest init
# Choose: TypeScript, Default style, CSS variables, tailwind.config.ts

# Add Shadcn components
npx shadcn-ui@latest add button calendar form input label popover radio-group select toast tooltip

# Additional dependencies
npm install react-router-dom lucide-react date-fns @tanstack/react-query sonner
```

## 3. File Structure

```
src/
├── components/
│   ├── ui/          # Shadcn components (auto-generated)
│   ├── ProfileForm.tsx
│   └── StarField.tsx
├── hooks/
│   └── use-toast.ts # Shadcn toast hook
├── lib/
│   └── utils.ts     # Shadcn cn utility
├── pages/
│   ├── Index.tsx
│   └── NotFound.tsx
├── App.tsx
├── main.tsx
└── index.css
```

---

## 4. Copy These Files

### `src/index.css`

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

@import url('https://fonts.googleapis.com/css2?family=Noto+Serif+SC:wght@400;500;600;700&family=Inter:wght@300;400;500;600&display=swap');

@layer base {
  :root {
    --background: 222 47% 6%;
    --foreground: 45 30% 94%;

    --card: 222 40% 10%;
    --card-foreground: 45 30% 94%;

    --popover: 222 40% 12%;
    --popover-foreground: 45 30% 94%;

    --primary: 38 75% 55%;
    --primary-foreground: 222 47% 6%;

    --secondary: 222 30% 18%;
    --secondary-foreground: 45 30% 90%;

    --muted: 222 25% 15%;
    --muted-foreground: 220 15% 55%;

    --accent: 38 60% 45%;
    --accent-foreground: 45 30% 96%;

    --destructive: 0 72% 51%;
    --destructive-foreground: 45 30% 96%;

    --border: 222 25% 20%;
    --input: 222 30% 15%;
    --ring: 38 75% 55%;

    --radius: 0.75rem;

    /* Custom tokens */
    --gold-glow: 38 80% 50%;
    --cosmic-blue: 222 60% 8%;
    --star-white: 45 30% 96%;
    
    /* Gradients */
    --gradient-cosmic: linear-gradient(135deg, hsl(222 47% 6%) 0%, hsl(222 50% 12%) 50%, hsl(240 40% 10%) 100%);
    --gradient-gold: linear-gradient(135deg, hsl(38 75% 55%) 0%, hsl(45 80% 65%) 100%);
    --gradient-card: linear-gradient(145deg, hsl(222 40% 12%) 0%, hsl(222 45% 8%) 100%);
    
    /* Shadows */
    --shadow-glow: 0 0 40px hsl(38 75% 55% / 0.15);
    --shadow-card: 0 8px 32px hsl(222 50% 3% / 0.4);
    
    /* Fonts */
    --font-serif: 'Noto Serif SC', serif;
    --font-sans: 'Inter', system-ui, sans-serif;

    --sidebar-background: 222 40% 10%;
    --sidebar-foreground: 45 30% 94%;
    --sidebar-primary: 38 75% 55%;
    --sidebar-primary-foreground: 222 47% 6%;
    --sidebar-accent: 222 30% 18%;
    --sidebar-accent-foreground: 45 30% 90%;
    --sidebar-border: 222 25% 20%;
    --sidebar-ring: 38 75% 55%;
  }

  .dark {
    --background: 222 47% 6%;
    --foreground: 45 30% 94%;
    --card: 222 40% 10%;
    --card-foreground: 45 30% 94%;
    --popover: 222 40% 12%;
    --popover-foreground: 45 30% 94%;
    --primary: 38 75% 55%;
    --primary-foreground: 222 47% 6%;
    --secondary: 222 30% 18%;
    --secondary-foreground: 45 30% 90%;
    --muted: 222 25% 15%;
    --muted-foreground: 220 15% 55%;
    --accent: 38 60% 45%;
    --accent-foreground: 45 30% 96%;
    --destructive: 0 72% 51%;
    --destructive-foreground: 45 30% 96%;
    --border: 222 25% 20%;
    --input: 222 30% 15%;
    --ring: 38 75% 55%;
  }
}

@layer base {
  * {
    @apply border-border;
  }

  body {
    @apply bg-background text-foreground font-sans antialiased;
    font-family: var(--font-sans);
    background: var(--gradient-cosmic);
    min-height: 100vh;
  }

  h1, h2, h3 {
    font-family: var(--font-serif);
  }
}

@layer utilities {
  .font-serif {
    font-family: var(--font-serif);
  }
  
  .text-gold {
    color: hsl(var(--primary));
  }
  
  .bg-cosmic {
    background: var(--gradient-cosmic);
  }
  
  .glow-gold {
    box-shadow: var(--shadow-glow);
  }
  
  .card-gradient {
    background: var(--gradient-card);
  }
}

/* Star animation */
@keyframes twinkle {
  0%, 100% { opacity: 0.3; }
  50% { opacity: 1; }
}

@keyframes float {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-10px); }
}

@keyframes pulse-glow {
  0%, 100% { box-shadow: 0 0 20px hsl(38 75% 55% / 0.2); }
  50% { box-shadow: 0 0 40px hsl(38 75% 55% / 0.4); }
}

.animate-twinkle {
  animation: twinkle 3s ease-in-out infinite;
}

.animate-float {
  animation: float 6s ease-in-out infinite;
}

.animate-pulse-glow {
  animation: pulse-glow 3s ease-in-out infinite;
}
```

---

### `tailwind.config.ts`

```typescript
import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: ["./pages/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./app/**/*.{ts,tsx}", "./src/**/*.{ts,tsx}"],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        serif: ['Noto Serif SC', 'serif'],
      },
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        gold: {
          DEFAULT: "hsl(var(--gold-glow))",
        },
        sidebar: {
          DEFAULT: "hsl(var(--sidebar-background))",
          foreground: "hsl(var(--sidebar-foreground))",
          primary: "hsl(var(--sidebar-primary))",
          "primary-foreground": "hsl(var(--sidebar-primary-foreground))",
          accent: "hsl(var(--sidebar-accent))",
          "accent-foreground": "hsl(var(--sidebar-accent-foreground))",
          border: "hsl(var(--sidebar-border))",
          ring: "hsl(var(--sidebar-ring))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        "fade-in": {
          from: { opacity: "0", transform: "translateY(10px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        "scale-in": {
          from: { opacity: "0", transform: "scale(0.95)" },
          to: { opacity: "1", transform: "scale(1)" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "fade-in": "fade-in 0.5s ease-out forwards",
        "scale-in": "scale-in 0.3s ease-out forwards",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
```

---

### `src/main.tsx`

```tsx
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

createRoot(document.getElementById("root")!).render(<App />);
```

---

### `src/App.tsx`

```tsx
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
```

---

### `src/pages/Index.tsx`

```tsx
import { StarField } from "@/components/StarField";
import { ProfileForm } from "@/components/ProfileForm";

const Index = () => {
  return (
    <div className="min-h-screen relative overflow-hidden">
      <StarField />
      
      {/* Decorative gradient orbs */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-primary/10 rounded-full blur-3xl" />
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
      
      <main className="relative z-10 flex flex-col items-center justify-center min-h-screen px-6 py-12">
        {/* Header */}
        <div className="text-center mb-12 space-y-4">
          <div className="inline-block mb-4">
            <span className="text-6xl animate-float inline-block">☯</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-foreground tracking-tight">
            Flow<span className="text-primary">Mind</span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-md mx-auto leading-relaxed">
            輸入你的出生資料<br />
            <span className="text-primary/80">開啟專屬於你的命理旅程</span>
          </p>
        </div>

        {/* Form Card */}
        <div className="w-full max-w-lg">
          <div className="card-gradient rounded-2xl border border-border/50 p-8 backdrop-blur-sm shadow-2xl">
            <ProfileForm />
          </div>
          
          {/* Footer note */}
          <p className="text-center text-xs text-muted-foreground/60 mt-6">
            我們尊重您的隱私，資料僅用於命理分析
          </p>
        </div>
      </main>
    </div>
  );
};

export default Index;
```

---

### `src/pages/NotFound.tsx`

```tsx
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const NotFound = () => {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-serif font-bold">404</h1>
        <p className="text-muted-foreground">頁面不存在</p>
        <Button asChild variant="golden">
          <Link to="/">返回首頁</Link>
        </Button>
      </div>
    </div>
  );
};

export default NotFound;
```

---

### `src/components/StarField.tsx`

```tsx
import { useEffect, useState } from "react";

interface Star {
  id: number;
  x: number;
  y: number;
  size: number;
  delay: number;
}

export const StarField = () => {
  const [stars, setStars] = useState<Star[]>([]);

  useEffect(() => {
    const generateStars = () => {
      const newStars: Star[] = [];
      for (let i = 0; i < 50; i++) {
        newStars.push({
          id: i,
          x: Math.random() * 100,
          y: Math.random() * 100,
          size: Math.random() * 2 + 1,
          delay: Math.random() * 3,
        });
      }
      setStars(newStars);
    };
    generateStars();
  }, []);

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none">
      {stars.map((star) => (
        <div
          key={star.id}
          className="absolute rounded-full bg-foreground/40 animate-twinkle"
          style={{
            left: `${star.x}%`,
            top: `${star.y}%`,
            width: `${star.size}px`,
            height: `${star.size}px`,
            animationDelay: `${star.delay}s`,
          }}
        />
      ))}
    </div>
  );
};
```

---

### `src/components/ProfileForm.tsx`

```tsx
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
```

---

### `src/components/ui/button.tsx` (Custom Variants)

Add these variants to the generated button.tsx:

```tsx
const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90",
        destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        outline: "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
        secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
        golden: "bg-gradient-to-r from-primary to-[hsl(45,80%,65%)] text-primary-foreground hover:opacity-90 shadow-lg shadow-primary/25 transition-all duration-300 hover:shadow-xl hover:shadow-primary/30",
        cosmic: "bg-secondary/50 border border-border text-foreground hover:border-primary/50 hover:bg-secondary/70 transition-all duration-300",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
        xl: "h-14 rounded-xl px-8 text-base font-semibold",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);
```

---

## 5. Run

```bash
npm run dev
```

Open http://localhost:5173

---

## Notes

- **Vite alias**: Make sure `tsconfig.json` has path alias for `@/`:
  ```json
  {
    "compilerOptions": {
      "baseUrl": ".",
      "paths": { "@/*": ["./src/*"] }
    }
  }
  ```

- **tailwindcss-animate**: Required for animations:
  ```bash
  npm install tailwindcss-animate
  ```

- The `golden` and `cosmic` button variants are custom additions to shadcn's button component.
