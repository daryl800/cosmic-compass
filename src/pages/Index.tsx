import { useState } from "react";
import { StarField } from "@/components/StarField";
import { ProfileForm } from "@/components/ProfileForm";
import { useFortune } from "@/hooks/useFortune";
import { useNavigate } from "react-router-dom";

const Index = () => {
  const [refreshKey, setRefreshKey] = useState(0);

  // 🔑 This is where fetching logic lives
  const fortune = useFortune(refreshKey);

  const navigate = useNavigate();

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
          <h1 className="text-4xl md:text-5xl font-serif font-bold">
            Flow<span className="text-primary">Mind</span>
          </h1>
          <p className="text-lg text-muted-foreground">
            輸入你的出生資料<br />
            <span className="text-primary/80">開啟專屬於你的命理旅程</span>
          </p>
        </div>

        {/* Form */}
        <div className="w-full max-w-lg">
          <div className="card-gradient rounded-2xl p-8">
            <ProfileForm
              onProfileSaved={() => {
                console.log("Index: profile saved → refresh fortune");
                setRefreshKey((k) => k + 1);
                navigate("/fortune-page");
              }}
            />
          </div>

          {/* Debug / status */}
          {fortune.loading && (
            <p className="text-center text-sm mt-4">命盤解讀中…</p>
          )}
        </div>
      </main>
    </div>
  );
};

export default Index;
