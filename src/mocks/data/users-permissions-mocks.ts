const users = [
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
        queries: [{ requeryView: 1, queryEdit: -1, queryDelete: -1 }],
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
        queries: [{ requeryView: 1, queryEdit: -1, queryDelete: -1 }],
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
        queries: [{ requeryView: 1, queryEdit: 1, queryDelete: 1 }],
        source: [{ sourceView: 1, sourceEdit: 1, sourceDelete: 1 }],
      },
    ],
  },
];

export function userByIdMocks(userId: string) {
  const filteredUser = {};

  users.forEach(({ userId, ...rest }) => {
    if (!(userId in filteredUser)) {
      filteredUser[userId] = [];
      filteredUser[userId].push(rest);
    }
  });
  return filteredUser[userId];
}
