import Image from "next/image";
import type { Photo as PhotoData } from "@/content/gallery";

type Props = {
  photo: PhotoData;
  sizes: string;
  className?: string;
  /** Preload for the LCP image only. */
  preload?: boolean;
  style?: React.CSSProperties;
  alt?: string;
};

/** next/image wrapper fed from content/gallery.ts. Fills its (positioned) parent. */
export function Photo({ photo, sizes, className = "", preload = false, style, alt }: Props) {
  return (
    <Image
      src={photo.src}
      alt={alt ?? photo.alt}
      width={photo.width}
      height={photo.height}
      sizes={sizes}
      preload={preload}
      className={`h-full w-full object-cover ${className}`}
      style={photo.focus || style ? { objectPosition: photo.focus, ...style } : undefined}
    />
  );
}
