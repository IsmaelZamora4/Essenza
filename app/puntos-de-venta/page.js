import StoresClient from "./StoresClient";
import { stores as allStores } from "../../content/stores";

export default function StoresPage() {
  return (
    <main className="bg-white text-black">
      <StoresClient stores={allStores} />
    </main>
  );
}