import Image from "next/image";

interface ComicImageProps {
  src: string;
  alt: string;
}

export const ComicImage = ({ src, alt }: ComicImageProps) => (
  <div className="md:w-1/3">
    <Image
      src={src}
      alt={alt}
      width={300}
      height={450}
      className="rounded-lg w-full object-cover"
      priority
    />
  </div>
);
