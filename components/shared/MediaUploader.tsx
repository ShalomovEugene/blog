"use client";
import { useToast } from "@/components/ui/use-toast";
import { MediaUploaderProps } from "@/types";
import { CldImage, CldUploadWidget } from "next-cloudinary";
import { PlaceholderValue } from "next/dist/shared/lib/get-img-props";
import Image from "next/image";
import { useState } from "react";

const shimmer = (w: number, h: number) => `
<svg width="${w}" height="${h}" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
  <defs>
    <linearGradient id="g">
      <stop stop-color="#7986AC" offset="20%" />
      <stop stop-color="#68769e" offset="50%" />
      <stop stop-color="#7986AC" offset="70%" />
    </linearGradient>
  </defs>
  <rect width="${w}" height="${h}" fill="#7986AC" />
  <rect id="r" width="${w}" height="${h}" fill="url(#g)" />
  <animate xlink:href="#r" attributeName="x" from="-${w}" to="${w}" dur="1s" repeatCount="indefinite"  />
</svg>`;

const toBase64 = (str: string) =>
  typeof window === "undefined"
    ? Buffer.from(str).toString("base64")
    : window.btoa(str);

export const dataUrl = `data:image/svg+xml;base64,${toBase64(
  shimmer(1000, 1000)
)}`;

const MediaUploader = ({
  onValueChange,
  setPost,
  publicId,
}: MediaUploaderProps) => {
  const { toast } = useToast();
  const [localPublicId, setLocalPublicId] = useState(publicId);

  const onUploadSuccessHandler = (result: any) => {
    const newPublicId = result?.info?.public_id;
    const newSecureURL = result?.info?.secure_url;
    setPost((prevState: any) => ({
      ...prevState,
      publicId: newPublicId,
      secureURL: newSecureURL,
    }));

    setLocalPublicId(newPublicId);
    onValueChange(newPublicId);

    toast({
      title: "Image uploaded successfully",
      duration: 5000,
      className: "success-toast",
    });
  };
  const onUploadErrorHandler = () => {
    toast({
      title: "Something went wrong while uploading",
      description: "Please try again",
      duration: 5000,
      className: "error-toast",
    });
  };

  return (
    <CldUploadWidget
      uploadPreset="heyLink"
      options={{
        multiple: false,
        resourceType: "image",
      }}
      onSuccess={onUploadSuccessHandler}
      onError={onUploadErrorHandler}
    >
      {({ open }) => (
        <div className="flex flex-col">
          {localPublicId ? (
            <>
              <div
                className="cursor-pointer overflow-hidden rounded-lg"
                onClick={() => open()}
              >
                <CldImage
                  width={300}
                  height={300}
                  src={localPublicId}
                  alt="image"
                  sizes={"(max-width: 767px) 100vw, 50vw"}
                  className="media-uploader_cldImage"
                  placeholder={dataUrl as PlaceholderValue}
                />
              </div>
            </>
          ) : (
            <div className="media-uploader_cta" onClick={() => open()}>
              <div className="media-uploader_cta-image">
                <Image
                  src="/assets/add.svg"
                  alt="Add image"
                  width={24}
                  height={24}
                />
              </div>
              <p className="p-14-medium">Click here to uploade image</p>
            </div>
          )}
        </div>
      )}
    </CldUploadWidget>
  );
};

export default MediaUploader;
