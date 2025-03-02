import { BASE_URL, REPORTS } from "@apis/api-routes";
import httpCommon from "@apis/http-common";
import { mockreports } from "@mocks/data";

const report = httpCommon(BASE_URL);

function createReport() {
  return report.get(`${REPORTS}`);
}

function getAllReport() {
  return mockreports();
}

export const reportService = {
  createReport,
  getAllReport,
};
