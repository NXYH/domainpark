"use client";

import { useState } from "react";
import { Check, Copy, Mail } from "lucide-react";
import { Button, buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function OfferButtons({ email, subject, body }: { email: string; subject: string; body: string }) {
  const [copied, setCopied] = useState(false);
  const q = (s: string) => encodeURIComponent(s);
  const links = [
    { label: "Outlook", href: `https://outlook.live.com/mail/0/deeplink/compose?to=${q(email)}&subject=${q(subject)}&body=${q(body)}` },
    { label: "Mail app", href: `mailto:${email}?subject=${q(subject)}&body=${q(body)}` },
  ];

  async function copy() {
    await navigator.clipboard.writeText(email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <div className="flex flex-col items-center gap-3">
      <a
        href={`https://mail.google.com/mail/?view=cm&to=${q(email)}&su=${q(subject)}&body=${q(body)}`}
        target="_blank"
        rel="noopener noreferrer"
        className={cn(buttonVariants({ size: "lg" }), "h-11 px-6 text-base")}
      >
        <Mail /> Make an offer via Gmail
      </a>
      <div className="flex flex-wrap justify-center gap-2">
        {links.map((l) => (
          <a
            key={l.label}
            href={l.href}
            target={l.href.startsWith("http") ? "_blank" : undefined}
            rel="noopener noreferrer"
            className={cn(buttonVariants({ variant: "outline" }))}
          >
            {l.label}
          </a>
        ))}
        <Button variant="outline" onClick={copy}>
          {copied ? <Check /> : <Copy />} {copied ? "Copied" : "Copy email"}
        </Button>
      </div>
      <p className="text-sm text-muted-foreground select-all">{email}</p>
    </div>
  );
}
