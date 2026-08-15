import Image from "next/image";

type FramedImageProps = {
  src: string;
  alt: string;
  width: number;
  height: number;
  className?: string;
  priority?: boolean;
};

// width/height must be the source file's actual pixel dimensions — that's
// what lets next/image both preserve the image's natural aspect ratio (no
// forced/mismatched box) and serve it through Next's optimizer (webp/avif,
// responsive srcset, lazy loading) instead of a raw static file.
export function FramedImage({ src, alt, width, height, className = "", priority = false }: FramedImageProps) {
  return (
    <div className={`framed-image overflow-hidden ${className}`}>
      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        sizes="(max-width: 768px) 100vw, 900px"
        priority={priority}
        className="block w-full h-auto"
      />
    </div>
  );
}
