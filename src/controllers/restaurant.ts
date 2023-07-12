import { AppDataSource } from "../data-source";
import { Restaurant, Color } from "../entity";
import { Like } from "typeorm";

// Get restaurants data that includes 'query' in kr_name/address/country
export const getRestaurantData = async (
  query: string | undefined = undefined
) => {
  try {
    let whereCondition = {};

    if (query !== "undefined") {
      // console.log(query);
      whereCondition = [
        { kr_name: Like(`%${query}%`) },
        { en_name: Like(`%${query}%`) },
        { address: Like(`%${query}%`) },
        { country: Like(`%${query}%`) },
      ];
    }

    const data = await AppDataSource.manager.find(Restaurant, {
      where: whereCondition,
    });

    return data;
  } catch (error) {
    console.error(error);
  }
};

export const getRestDialogData = async (name: string) => {
  try {
    const restData = await AppDataSource.manager.findOne(Restaurant, {
      where: { en_name: name },
    });
    const colorData = await AppDataSource.manager.findOne(Color, {
      where: { rest_name: restData },
    });

    const result = { ...restData, ...colorData };
    return result;
  } catch (e) {
    console.error(e);
  }
};

export const getRestBasicData = async (name: string) => {
  try {
    const data = await AppDataSource.manager.findOne(Restaurant, {
      where: { en_name: name },
    });
    return data;
  } catch (e) {
    console.error(e);
  }
};
