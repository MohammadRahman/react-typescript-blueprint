import { faker } from "@faker-js/faker";

const reports = [] as any;
const howManyreports = 100;

const createreports = (howMany: number) => {
    const reportsData = [];

    for (let i = 0; i < howMany; i++) {
        const firstName = faker.person.firstName();
        const lastName = faker.person.lastName();
        const fullName = `${firstName} ${lastName}`;
        const email = `${firstName}.${lastName}@basilinq.com`;
        const totalSent = faker.number.int({ min: 1, max: 200 })
        const success = '100%';
        const fail = '0%';
        reportsData.push({
            id: i + 1,
            fullName,
            email,
            totalSent,
            success,
            fail,
        });
    }

    return reportsData;
};

export const mockreports = () => {
    if (reports.length == 0) {
        const calculatedreports = createreports(howManyreports);
        reports.push(...calculatedreports);
    }
    return reports;
};
enum JobType {
    SENT = 'sent',
    FAILED = 'failed',
    DRAFT = 'draft',
    SPAM = 'spam'
}
export const todaysData = [
    {
        id: 1,
        jobType: JobType.SENT,
        total: faker.number.int({ min: 100, max: 200 }),
        name: faker.person.fullName(),
    },
    {
        id: 2,
        jobType: JobType.FAILED,
        total: faker.number.int({ min: 1, max: 100 }),
        name: faker.person.fullName(),
    },
    {
        id: 3,
        jobType: JobType.DRAFT,
        total: faker.number.int({ min: 20, max: 100 }),
        name: faker.person.fullName(),
    },
    {
        id: 4,
        jobType: JobType.SPAM,
        total: faker.number.int({ min: 10, max: 30 }),
        name: faker.person.fullName(),
    },
]