"use client"

import dynamic from "next/dynamic"

const PixiMouseTrail = dynamic(
  () => import("@/components/pixi-mouse-trail").then((mod) => mod.PixiMouseTrail),
  { ssr: false },
)

export function PixiMouseTrailWrapper() {
  return <PixiMouseTrail />
}
