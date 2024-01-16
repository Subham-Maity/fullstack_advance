import * as sharp from "sharp";

export const resizeToOriginal = async (input: string, imgName: string) => {
  try {
    const { density, width, height } = await sharp(input, {
      limitInputPixels: 8585550069,
    }).metadata();

    if (density && height && width && density > 300) {
      if (height > 6000 && width > 6000) {
        await sharp(input, { limitInputPixels: 8585550069 })
          .resize(width > height ? { width: 6000 } : { height: 6000 })
          .withMetadata({ density: 300 })
          .toFile(`output/Original-${imgName}`);
      } else if (height > 6000) {
        await sharp(input, { limitInputPixels: 8585550069 })
          .resize({ height: 6000 })
          .withMetadata({ density: 300 })
          .toFile(`output/Original-${imgName}`);
      } else if (width > 6000) {
        await sharp(input, { limitInputPixels: 8585550069 })
          .resize({ width: 6000 })
          .withMetadata({ density: 300 })
          .toFile(`output/Original-${imgName}`);
      } else {
        await sharp(input, { limitInputPixels: 8585550069 })
          .withMetadata({ density: 300 })
          .toFile(`output/Original-${imgName}`);
      }
    } else if (density && height && width && density <= 300) {
      if (height > 6000 && width > 6000) {
        await sharp(input, { limitInputPixels: 8585550069 })
          .resize(width > height ? { width: 6000 } : { height: 6000 })
          .withMetadata({ density: density })
          .toFile(`output/Original-${imgName}`);
      } else if (height > 6000) {
        await sharp(input, { limitInputPixels: 8585550069 })
          .resize({ height: 6000 })
          .withMetadata({ density: density })
          .toFile(`output/Original-${imgName}`);
      } else if (width > 6000) {
        await sharp(input, { limitInputPixels: 8585550069 })
          .resize({ width: 6000 })
          .withMetadata({ density: density })
          .toFile(`output/Original-${imgName}`);
      } else {
        await sharp(input, { limitInputPixels: 8585550069 })
          .resize({ width: width, height: height })
          .withMetadata({ density: density })
          .toFile(`output/Original-${imgName}`);
      }
    }
  } catch (error) {
    console.log(error);
  }
};

export const resizeToMedium = async (input: string, imgName: string) => {
  try {
    const { density, width, height } = await sharp(input, {
      limitInputPixels: 8585550069,
    }).metadata();
    if (width && height && density)
      await sharp(input, { limitInputPixels: 8585550069 })
        .resize({
          width: Math.floor(width / 2),
          height: Math.floor(height / 2),
        })
        .withMetadata({ density: density })
        .toFile(`output/Medium-${imgName}`);
  } catch (error) {
    console.log(error);
  }
};
export const resizeToSmall = async (input: string, imgName: string) => {
  try {
    const { density, width, height } = await sharp(input, {
      limitInputPixels: 8585550069,
    }).metadata();
    if (width && height && density)
      await sharp(input, { limitInputPixels: 8585550069 })
        .resize({
          width: Math.floor(width / 4),
          height: Math.floor(height / 4),
        })
        .withMetadata({ density: density })
        .toFile(`output/Small-${imgName}`);
  } catch (error) {
    console.log(error);
  }
};

export const resizeForProductPage = async (input: string, imgName: string) => {
  try {
    const { density, width, height } = await sharp(input, {
      limitInputPixels: 8585550069,
    }).metadata();
    const { width: logoWidth, height: logoHeight } = await sharp(
      "assets/logo.png",
      { limitInputPixels: 8585550069 },
    ).metadata();

    console.log(logoHeight, height, width, logoWidth);
    // return console.log("from composite");
    if (logoHeight && height && width && logoWidth) {
      await sharp("assets/logo.png", { limitInputPixels: 8585550069 })
        .resize(
          logoHeight >= height / 8 || logoWidth >= width / 8
            ? {
                width: Math.floor(logoWidth / 2),
                height: Math.floor(logoHeight / 2),
              }
            : { width: logoWidth, height: logoHeight },
        )
        .toFile(`assets/recused-logo.png`);
    }
    if (width && height)
      await sharp(input, { limitInputPixels: 8585550069 })
        .resize({
          width: Math.floor(width / 8),
          height: Math.floor(height / 8),
        })
        .composite([{ input: "assets/recused-logo.png", gravity: "center" }])
        .withMetadata({ density: 72 })
        .toFile(`output/ProductPage-${imgName}`);
  } catch (error) {
    console.log(error);
  }
};
export const resizeForThumbnail = async (input: string, imgName: string) => {
  try {
    const { density, width, height } = await sharp(input, {
      limitInputPixels: 8585550069,
    }).metadata();
    if (width && height && density)
      await sharp(input, { limitInputPixels: 8585550069 })
        .resize({ width: 150 })
        .withMetadata({ density: 72 })
        .toFile(`output/Thumbnail-${imgName}`);
  } catch (error) {
    console.log(error);
  }
};
