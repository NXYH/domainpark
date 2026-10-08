import { OfferButtons } from "@/components/offer-buttons";
import { Card, CardContent } from "@/components/ui/card";
import { cacheLife } from "next/cache";

const DOMAIN = "litmus7.si";
const EMAIL = "nickel-paste.2z@icloud.com";
const MIN_BID_INR = 10_000_000; // 1 crore
const FALLBACK_INR_PER_USD = 96.83; // rate on 2026-10-08, used if the API is down

async function inrPerUsd() {
  "use cache";
  cacheLife("days"); // refresh the exchange rate daily
  try {
    const res = await fetch("https://open.er-api.com/v6/latest/USD");
    const rate = (await res.json())?.rates?.INR;
    return typeof rate === "number" && rate > 0 ? rate : FALLBACK_INR_PER_USD;
  } catch {
    return FALLBACK_INR_PER_USD;
  }
}

const SUBJECT = `Offer for ${DOMAIN}`;
const BODY = `Hello,\n\nI'd like to make an offer for ${DOMAIN}.\n\nOffer: \nName: \n`;

export default async function Home() {
  const usd = Math.round(MIN_BID_INR / (await inrPerUsd()));

  return (
    <main className="flex flex-1 items-center justify-center px-4 py-16">
      <div className="flex w-full max-w-xl flex-col items-center gap-8 text-center">
        <p className="text-sm font-medium tracking-[0.2em] text-muted-foreground uppercase">This domain is for sale</p>

        <div className="flex flex-col items-center gap-4">
          <h1 className="text-6xl font-semibold tracking-tight sm:text-8xl">
            <span className="litmus-text">litmus7</span>
            <span className="text-muted-foreground">.si</span>
          </h1>
          <div aria-hidden className="litmus-bar h-1 w-24 rounded-full" />
        </div>

        <Card className="w-full max-w-sm">
          <CardContent className="flex flex-col items-center gap-1">
            <p className="text-xs tracking-[0.2em] text-muted-foreground uppercase">Minimum bid</p>
            <p className="text-4xl font-semibold tabular-nums">₹1 Crore</p>
            <p className="text-sm text-muted-foreground tabular-nums">
              ≈ ${usd.toLocaleString("en-US")} USD
            </p>
          </CardContent>
        </Card>

        <OfferButtons email={EMAIL} subject={SUBJECT} body={BODY} />
      </div>
    </main>
  );
}
