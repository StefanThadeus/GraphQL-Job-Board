import DataLoader from "dataloader";
import { connection } from "./connection.js";

const getCompanyTable = () => connection.table("company");

export async function getCompany(id) {
  return await getCompanyTable().first().where({ id });
}

export function createCompanyLoader() {
  return new DataLoader(async (ids) => {
    const companies = await getCompanyTable().select().whereIn("id", ids);

    // Create a map of id -> company in order to return them in the correct order
    // of the ids array, as required by DataLoader (db results are unordered)
    return ids.map((id) => companies.find((company) => company.id === id));
  });
}
