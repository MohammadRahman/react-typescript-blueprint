type Data = {
    id: number;
    first_name: string;
    last_name: string;
    email: string;
    country: string;
    gender: string;
};
export const COLUMNS = [
    {
        Header: "Id",
        accessor: 'id' as const
    },
    {
        Header: "First Name",
        accessor: 'first_name' as const
    },
    {
        Header: "Last Name",
        accessor: 'last_name' as const
    },
    {
        Header: "Email",
        accessor: 'email' as const
    },
    {
        Header: "Country",
        accessor: 'country' as const
    },
   
    {
        Header: "Gender",
        accessor: 'gender' as const
    },
]