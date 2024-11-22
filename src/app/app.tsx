import { PokerHandComparison } from "@/components/PokerHandComparison/PokerHandComparison";
import { PokerStore } from "@/store/PokerStore";
import { PokerStoreProvider } from "@/store/provider";

const pokerStore: PokerStore = new PokerStore();
export default function Home() {
  return (
    <PokerStoreProvider value={pokerStore}>
      <PokerHandComparison />
    </PokerStoreProvider>
  );
}
