"use client";

import LivestockPage from "../../pages/owner/LivestckOverview";

// Worker view — reuses the same livestock overview but without Add Animal privilege
export default function LivestockRecords() {
  return <LivestockPage canAdd={false} mobileCols={true} />;
}
