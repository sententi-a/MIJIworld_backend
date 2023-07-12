import { AppDataSource } from "../data-source";
import { Restaurant, Menu } from "../entity";

export const getMenus = async (name: string) => {
  try {
    const restData = await AppDataSource.manager.findOne(Restaurant, {
      where: { en_name: name },
    });

    const menuData = await AppDataSource.manager.find(Menu, {
      where: { rest_name: restData },
    });

    // console.log(menuData);

    const result = {
      country_word: restData.country_word,
      menus: [...menuData],
    };

    return result;
  } catch (e) {
    console.error(e);
  }
};
