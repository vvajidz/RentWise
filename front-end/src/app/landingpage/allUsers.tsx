import RentWiseFooter from "@/components/common/about";
import SupportSection from "@/components/common/benifits";
import FloatingIcons from "@/components/common/floatings";
import RentWiseHeader from "@/components/common/header";
import ReviewsSection from "@/components/common/reviews";
import HowItWorks from "@/components/common/working";

export default function LandingPage() {
  return (
    <div className="relative bg-[#fdfcf9] overflow-hidden">
      <FloatingIcons />

      <RentWiseHeader />

      <HowItWorks />
      <ReviewsSection />
      <SupportSection />
      {/* About section wrapper hides icons */}
      <div className="relative overflow-hidden z-10">
        <RentWiseFooter/>
      </div>
    </div>
  );
}
