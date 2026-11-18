import { Suspense } from "react";
import { ResultPanel } from "@/components/ResultPanel";
import { TransformedView } from "./transformed-view";

function TransformedFallback() {
  return (
    <div className="mx-auto w-[min(100%-2rem,72rem)] sm:w-[min(100%-3rem,72rem)] lg:w-[min(100%-4rem,72rem)]">
      <div className="mx-auto w-full max-w-3xl">
        <ResultPanel
          result={null}
          loading={false}
          currentTipImage="/images/tip_annual.png"
          tipVisible={false}
          textTips={null}
        />
      </div>
    </div>
  );
}

export default function TransformedPage() {
  return (
    <Suspense fallback={<TransformedFallback />}>
      <TransformedView />
    </Suspense>
  );
}
