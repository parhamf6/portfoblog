import { IconCloudDemo } from "./components/icon-cloud-demo";
import Introduction from "./components/introduction";
import React from "react";
import { Spotlight } from "@/components/spotlight";
import { AuroraBackground } from "@/components/aurora-background";

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
        <section className="min-h-screen flex flex-col md:flex-row items-center justify-center px-4 sm:px-6 md:px-12 lg:px-16 py-16 md:py-0">
            <Spotlight
            className="-top-40 left-0 md:-top-20 md:left-60"
            fill="white"
        />
        
        <div className="w-full md:w-1/2 flex flex-col justify-center space-y-6 p-4 md:p-8">
            <Introduction />
        </div>
        {/* <div className="w-full md:w-1/2 flex items-center justify-center p-4 md:p-8 mt-8 md:mt-0">
            <IconCloudDemo />
        </div> */}
        </section>
    );
}