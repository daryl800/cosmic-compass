// types/profile.ts
export type Profile = {
    dob: string;      // yyyy-MM-dd
    tob?: string;     // HH:mm (optional)
    pob: string;      // timezone
    gender: "男" | "女";
};
