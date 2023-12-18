"use client";

import { ReactMap } from "MapContainer/ReactMap/ReactMap";
import { Inspector } from "$components/Inspector/Inspector";

export default function Page() {
  return (
    <>
      <ReactMap />
      <Inspector />
    </>
  );
}
