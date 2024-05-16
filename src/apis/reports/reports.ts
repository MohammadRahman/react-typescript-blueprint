import { REPORTS } from "@apis/api-routes"
import { httpCommon } from "@apis/http-common"
import { reportApi } from "@apis/reportService"
import { mockreports } from "@mocks/data"




function createReport() {
    const report = httpCommon('http://localhost:3001/reports')
    return report.get(`${REPORTS}`)
}

function getAllReport() {
    return mockreports()
}

export const reportService = {
    createReport,
    getAllReport
}