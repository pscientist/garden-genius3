import { Suspense } from "react";
import { ResultPanel } from "@/components/ResultPanel";
import { TransformedView } from "./transformed-view";

function TransformedFallback() {
  return (
    <div className="mx-auto w-full max-w-3xl">
      <ResultPanel
        result={null}
        loading={false}
        currentTipImage="/images/tip_annual.png"
        tipVisible={false}
        textTips={null}
      />
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
