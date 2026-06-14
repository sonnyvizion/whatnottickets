"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { GoogleAnalytics } from "@next/third-parties/google";

const STORAGE_KEY = "wt-cookie-consent"; // "accepted" | "declined"

export default function CookieConsent({ gaId }: { gaId?: string }) {
  const [consent, setConsent] = useState<"accepted" | "declined" | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored === "accepted" || stored === "declined") {
      setConsent(stored);
    } else {
      setVisible(true);
    }
  }, []);

  const choose = (value: "accepted" | "declined") => {
    localStorage.setItem(STORAGE_KEY, value);
    setConsent(value);
    setVisible(false);
  };

  return (
    <>
      {/* GA ne se charge qu'après consentement explicite */}
      {gaId && consent === "accepted" ? <GoogleAnalytics gaId={gaId} /> : null}

      {visible && (
        <div
          role="dialog"
          aria-label="Consentement aux cookies"
          style={{
            position: "fixed",
            bottom: 16,
            left: 16,
            right: 16,
            zIndex: 9999,
            maxWidth: 560,
            margin: "0 auto",
            background: "#0E1322",
            border: "1px solid rgba(201,169,97,0.25)",
            borderRadius: 16,
            padding: "20px 22px",
            boxShadow:
              "-3px 3px 14px rgba(220,50,50,0.28), 3px -3px 14px rgba(50,80,220,0.28)",
          }}
        >
          <p
            style={{
              color: "#C5CCD9",
              fontSize: 14,
              lineHeight: 1.6,
              margin: "0 0 16px",
            }}
          >
            Nous utilisons des cookies de mesure d&apos;audience (Google
            Analytics) pour comprendre l&apos;usage du site et l&apos;améliorer.
            Ils ne sont déposés qu&apos;avec votre accord.{" "}
            <Link
              href="/politique-confidentialite"
              style={{ color: "#C9A961", textDecoration: "underline" }}
            >
              En savoir plus
            </Link>
          </p>
          <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
            <button
              type="button"
              onClick={() => choose("accepted")}
              className="btn btn-primary"
              style={{ flex: "1 1 auto" }}
            >
              Accepter
            </button>
            <button
              type="button"
              onClick={() => choose("declined")}
              className="btn btn-secondary"
              style={{ flex: "1 1 auto" }}
            >
              Refuser
            </button>
          </div>
        </div>
      )}
    </>
  );
}
