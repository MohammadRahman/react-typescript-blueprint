import { faker } from "@faker-js/faker";
import { format } from "date-fns";

const jobsExecutionStats = [] as any;
const jobsExecutionDetails = [] as any;
const executedJobData = [] as any;
const colors = ["black", "blue", "pink"];
const gradients = ["blackgradient", "bluegradient", "pinkgradient"];

function createJobStats(howMany: number) {
  let data = [];
  for (let i = 0; i < howMany; i++) {
    const title = faker.person.firstName();
    const icon = faker.image.avatar();
    const quantity = faker.number.int({ min: 20, max: 500 });

    data.push({
      id: i + 1,
      title,
      icon,
      quantity,
      color: colors[i],
      gradients: gradients[i],
    });
  }
  return data;
}
function createJobDetails(howMany: number) {
  const data = [];
  const randomNumber = 765455;
  const newDate = new Date();
  const formatedDate = format(newDate, "dd MMM yyyy");
  const getDay = formatedDate.split(" ")[0];
  for (let i = 0; i < howMany; i++) {
    // const date = getDay + i + formatedDate.slice(2);
    const jobName = faker.person.firstName();
    const mailType = faker.number.int({ min: 1, max: 2 });
    const recipent = faker.number.int({ min: 100, max: 300 });
    const fail = faker.number.int({ min: 10, max: 70 });
    const success = recipent - fail;
    const firstName = faker.person.firstName();
    const lastName = faker.person.lastName();
    const status =
      howMany > 4 ? faker.number.int({ min: 1, max: 2 }) : faker.number.int({ min: 1, max: 3 });
    const fullName = `${firstName} ${lastName}`;
    const email = `${firstName}.${lastName}@mail.com`;
    const dataIndex = faker.number.int({ min: 156, max: 994 });
    data.push({
      id: randomNumber + i,
      jobName,
      date: Number(getDay) + i + formatedDate.slice(2),
      mailType,
      email,
      fail,
      fullName,
      dataIndex,
      recipent,
      success,
      status,
    });
  }
  return data;
}
export function jobExecutaionCardData() {
  const withRate = [
    {
      id: 4,
      title: faker.person.firstName(),
      icon: faker.image.avatar(),
      color: "green",
      gradients: "greegreengradient",
      rate: faker.number.int({ min: 25, max: 70 }),
    },
    {
      id: 5,
      title: faker.person.firstName(),
      icon: faker.image.avatar(),
      color: "orange",
      gradients: "orangegradient",
      rate: faker.number.int({ min: 25, max: 70 }),
    },
  ];

  if (jobsExecutionStats.length == 0) {
    const calculatedJobs = createJobStats(3);
    jobsExecutionStats.push(...calculatedJobs, ...withRate);
  }
  return jobsExecutionStats;
}
export function jobsData() {
  if (jobsExecutionDetails.length == 0) {
    const calculatedJobs = createJobDetails(4);
    jobsExecutionDetails.push(...calculatedJobs);
  }
  return jobsExecutionDetails;
}
export function executedJobDetailsData() {
  const formatedExcecutedJobData = {};

  if (jobsExecutionDetails.length > 0) {
    const calculatedData = createJobDetails(10);
    jobsExecutionDetails.forEach(({ id }) => {
      if (!(id in formatedExcecutedJobData)) {
        formatedExcecutedJobData[id] = [];
        formatedExcecutedJobData[id].push(...calculatedData);
      }
    });
  }
  return formatedExcecutedJobData;
}
