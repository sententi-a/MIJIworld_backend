const sharp = require("sharp");
const fs = require("fs");

// Process ticket image(add text on it) and help client to download the image
export const getTicket = async (
  restName: string,
  date: string,
  name: string,
  company: string,
  note: string,
  message: string
) => {
  const imagePath = `src/assets/tickets/${restName}.png`;

  try {
    const imageBuffer = await fs.promises.readFile(imagePath);

    const text = Buffer.from(
      `<svg width="1000" height="417">
        <style>
          text {font-size: 18px; font-family: Noto Sans KR; font-weight: bold; fill: #525253;}    
        </style>
        <text x="14%" y="42%" text-anchor="middle">${date}</text>
        <text x="77%" y="21%" text-anchor="left">${name}</text>
        <text x="77%" y="37%" text-anchor="left">${company}</text>
        <text x="77%" y="53%" text-anchor="left">${note}</text>
        <text x="77%" y="69%" text-anchor="left">${message}</text>
      </svg>`
    );

    const resultImage = await sharp(imageBuffer)
      .composite([{ input: text, top: 0, left: 0 }])
      .toBuffer();

    return resultImage;
  } catch (error) {
    console.error(error);
  }
};
