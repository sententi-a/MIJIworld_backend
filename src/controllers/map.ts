import { AppDataSource } from "../data-source";
import { Restaurant, Map } from "../entity";

export const getMapData = async (name: string) => {
  try {
    const restData = await AppDataSource.manager.findOne(Restaurant, {
      where: { en_name: name },
    });

    const mapData = await AppDataSource.manager.findOne(Map, {
      where: { rest_name: restData },
    });

    return mapData;
  } catch (e) {
    console.error(e);
  }
};
