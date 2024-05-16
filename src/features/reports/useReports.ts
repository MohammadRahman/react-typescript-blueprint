import { reportService } from '@apis/reports';
import { useQuery } from '@tanstack/react-query';
import { useSearchParams } from 'react-router-dom';

export function useReports() {
    const [searchParams] = useSearchParams();

    const page = !searchParams.get("page") ? 1 : Number(searchParams.get("page"));

    const { data: reports, isLoading } = useQuery({
        queryKey: ['reports', page],
        queryFn: async () => {
            const reports = await reportService.getAllReport()
            return reports;
        }
    })
    return { reports, isLoading }
}