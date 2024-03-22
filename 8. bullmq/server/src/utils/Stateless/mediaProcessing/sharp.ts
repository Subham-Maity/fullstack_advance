import sharp from "sharp";

interface ResizeOptions {
  height: number;
  width: number;
  fit: keyof sharp.FitEnum;
}

const resizeImage = async (
  buffer: Buffer,
  options: ResizeOptions,
): Promise<Buffer> => {
  return await sharp(buffer)
    .resize(options.width, options.height, {
      fit: options.fit,
    })
    .toBuffer();
};

export { resizeImage };
