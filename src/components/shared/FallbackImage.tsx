"use client";

import Image, { type ImageProps } from "next/image";
import { useState, type ReactNode } from "react";

/** next/image that shows `fallback` instead if the image fails to load. */
export function FallbackImage({ fallback, alt, ...props }: ImageProps & { fallback: ReactNode }) {
  const [failed, setFailed] = useState(false);
  if (failed) return <>{fallback}</>;
  return <Image alt={alt} {...props} onError={() => setFailed(true)} />;
}
