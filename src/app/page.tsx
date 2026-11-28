import { HomeHero } from "@/components/home-hero";
import { TextLink } from "@/components/ui";

/**
 * Home — hero fidelity pass only.
 * Below-fold case/about modules intentionally minimal (no Placeholder wireframes)
 * until Section 2 / Featured work is approved.
 */
export default function HomePage() {
  return (
    <div data-page="home" data-scroll-mode="vertical">
      <HomeHero />

      {/* Soft handoff after fly-in — text only, no grey placeholder panels */}
      <section
        id="work"
        className="relative z-10 border-t border-border-default bg-background px-5 py-20 tablet:px-8 tablet:py-28"
      >
        <p className="type-label text-text-secondary">Selected work</p>
        <h2 className="type-h2 mt-3 max-w-2xl text-text-primary">
          Case studies live on the work index.
        </h2>
        <p className="type-body mt-4 max-w-xl text-text-secondary">
          Jio, PayU, CN, and more — pinned on the scene above, listed in full on
          /work.
        </p>
        <TextLink href="/work" className="mt-8 inline-flex">
          See all work →
        </TextLink>
      </section>
    </div>
  );
}
