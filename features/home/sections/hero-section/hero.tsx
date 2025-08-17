"use client"
import { IconCloudDemo } from "./components/icon-cloud-demo";
import Introduction from "./components/introduction";
import React from "react";
import { Spotlight } from "@/components/spotlight";
import { ScrollHint } from "@/components/scroll-hint";
import Interactive3DNetwork from "../../components/hero-network";
// export default function HeroSection() {
//     return (
//         <section className="min-h-screen flex flex-col md:flex-row items-center justify-center px-4 sm:px-6 md:px-12 lg:px-16 py-16 md:py-0">
//         <div className="w-full md:w-1/2 flex flex-col justify-center space-y-6 p-4 md:p-8">
//             <Introduction />
//         </div>
//         <div className="w-full md:w-1/2 flex items-center justify-center p-4 md:p-8 mt-8 md:mt-0">
//             <IconCloudDemo />
//         </div>
//         </section>
//     );
// }


export default function HeroSection() {
    return (
        <section className="mt-16 sm:mt-48 flex flex-col md:flex-row items-center justify-center px-4 sm:px-6 md:px-12 lg:px-16">
            {/* <Interactive3DNetwork /> */}
            <Spotlight
            className="-top-20 left-10 md:-top-20 md:left-60"
            fill="white"
        />
        <div className="w-full md:w-1/2 flex flex-col justify-center space-y-4 p-4 md:p-8">
            <Introduction />
            <ScrollHint 
                text="Explore my work"
                hideDelay={5}
                className="text-muted-foreground"
                />
        </div>
        </section>
    );
}