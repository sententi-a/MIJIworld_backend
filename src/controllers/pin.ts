import { AppDataSource } from "../data-source";
import { Pin } from "../entity";

const pinRepo = AppDataSource.getRepository(Pin);

export const getAllPinData = async () => {
  try {
    const allData = await pinRepo
      .createQueryBuilder("p")
      .select(["p.top", "p.left", "r.en_name"])
      .leftJoin("p.rest_name", "r")
      .where("p.rest_name = r.en_name")
      .getMany();

    const results = allData.map((data) => {
      const result = {
        ...data.rest_name,
        top: data.top,
        left: data.left,
      };
      return result;
    });

    return results;
  } catch (e) {
    console.error(e);
  }
};
