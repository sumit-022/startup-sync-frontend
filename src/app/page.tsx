import styles from "./page.module.css";
import LandingTemplate from "@/components/templates/Landing";

export default function Home() {
  return (
    <div className="relative">
      <LandingTemplate.Navbar />
      <LandingTemplate.Hero />
      <LandingTemplate.Hightlights />
      <LandingTemplate.Features />
    </div>
  );
}
