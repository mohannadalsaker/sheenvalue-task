import { useState } from "react";

const ImageViewer = ({ images }: { images: string[] }) => {
  const [selectedImage, setSelectedImage] = useState(images?.[0]);
  return (
    <div className="flex flex-col gap-4">
      <div className="bg-slate-200 md:w-1/2 h-[400px] w-full p-4 rounded-lg mx-auto">
        <img
          src={selectedImage}
          alt="product-image"
          className="rounded-md mx-auto w-full h-full"
        />
      </div>
      <div className="flex gap-3 justify-center">
        {images.map((img) => (
          <div
            className={`bg-slate-200 w-20 h-20 p-4 rounded-lg  ${
              img === selectedImage ? "border-2 border-primary" : ""
            }`}
          >
            <img
              src={img}
              alt="image"
              className="w-full h-full object-cover"
              onClick={() => setSelectedImage(img)}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ImageViewer;
