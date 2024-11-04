const users: User[] = [
  {
    userId: "249jqwei12340we",
    name: "user1",
    email: "user1@basilinq.com",
    roles: [56, 61],
    permissions: [
      {
        jobs: [{ jobView: 1, jobEdit: -1, jobDelete: -1 }],
        emailTemplate: [{ emilTemplateView: 1, emilTemplateEdit: -1, emilTemplateDelete: -1 }],
        reports: [{ reportsView: 1, reportsEdit: -1, reportsDelete: -1 }],
        queries: [{ queryView: 1, queryEdit: -1, queryDelete: -1 }],
        source: [{ sourceView: -1, sourceEdit: -1, sourceDelete: -1 }],
      },
    ],
  },
  {
    userId: "249jqwei123415sd",
    name: "user2",
    email: "user2@basilinq.com",
    roles: [56],
    permissions: [
      {
        jobs: [{ jobView: 1, jobEdit: -1, jobDelete: -1 }],
        emailTemplate: [{ emilTemplateView: -1, emilTemplateEdit: -1, emilTemplateDelete: -1 }],
        reports: [{ reportsView: 1, reportsEdit: -1, reportsDelete: -1 }],
        queries: [{ queryView: 1, queryEdit: -1, queryDelete: -1 }],
        source: [{ sourceView: 1, sourceEdit: -1, sourceDelete: -1 }],
      },
    ],
  },
  {
    userId: "249jqwei123413es",
    name: "user3",
    email: "user2@basilinq.com",
    roles: [53],
    permissions: [
      {
        jobs: [{ jobView: 1, jobEdit: 1, jobDelete: 1 }],
        emailTemplate: [{ emilTemplateView: 1, emilTemplateEdit: 1, emilTemplateDelete: -1 }],
        reports: [{ reportsView: 1, reportsEdit: 1, reportsDelete: 1 }],
        queries: [{ queryView: 1, queryEdit: 1, queryDelete: 1 }],
        source: [{ sourceView: 1, sourceEdit: 1, sourceDelete: 1 }],
      },
    ],
  },
];

interface Permissions {
  jobs: {jobView: number, jobEdit: number, jobDelete: number}[],
  emailTemplate: {emilTemplateView: number, emilTemplateEdit: number, emilTemplateDelete: number}[]
  reports: {reportsView: number, reportsEdit: number, reportsDelete: number}[],
  queries: {queryView: number, queryEdit: number, queryDelete: number}[],
  source: {sourceView: number, sourceEdit: number, sourceDelete: number}[]

}

type User = {
  userId: string;
  name: string;
  email: string;
  roles: Array<number>;
  permissions: Permissions[]

}
type FormatedData = {
  [key: string]: User;
};
export function userByIdMocks(userId: string): FormatedData {
  const filteredUser: FormatedData = {};

  users.forEach((user) => {
    if (!filteredUser[user.userId]) {
      filteredUser[user.userId] = user;
    }
  });

  return { [userId]: filteredUser[userId] };
}
