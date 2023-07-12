import { AppDataSource } from "../data-source";
import { Restaurant, Color } from "../entity";

export const getColorData = async (name: string) => {
  try {
    const restData = await AppDataSource.manager.findOne(Restaurant, {
      where: { en_name: name },
    });

    const colorData = await AppDataSource.manager.findOne(Color, {
      where: { rest_name: restData },
    });

    return colorData;
  } catch (e) {
    console.error(e);
  }
};
