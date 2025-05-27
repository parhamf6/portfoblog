import Navbar from "./components/ui/global/navbar";
import { BackgroundPaths } from "@/components/404-page/21stdev/background-path";

export default function App(){
    return(
        <div>
            <div>
                <Navbar/>
            </div>
            <div>
                <BackgroundPaths title="404 , Theres is nothing here friend" />
            </div>
        </div>
    );
}