import { Cinzel_Decorative, Raleway } from "next/font/google";

export const cinzel = Cinzel_Decorative({
    subsets: ["latin"],
    weight: ["400", "700"],
    variable: "--font-cinzel",
    display: "swap",
});


export const raleway = Raleway({
    subsets: ["latin"],
    display: "swap",
    weight: ["400", "500", "600", "700"],
    variable: "--font-raleway",
});
