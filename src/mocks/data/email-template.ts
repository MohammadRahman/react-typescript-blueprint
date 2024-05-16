import { faker } from "@faker-js/faker";

const emailTemplate = [] as any;
const names = ["Need to pay", "Not paid", "Payment Successful", "Remainder"];
const templates = [
  "Payment template",
  "Not paid template",
  "Successful payment template",
  "Remainder template",
];
function createTemplate(howMany: number) {
  const data = [];

  for (let i = 0; i < howMany; i++) {
    const name = names[i];
    const template = templates[i];
    const description =
      "Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit.";
    const dataSource = "1";

    data.push({
      id: i + 1,
      name,
      template,
      description,
      dataSource,
    });
  }
  return data;
}

export function emailTemplateMock() {
  if (emailTemplate.length == 0) {
    const calculatedData = createTemplate(4);
    emailTemplate.push(...calculatedData);
  }
  return emailTemplate;
}
