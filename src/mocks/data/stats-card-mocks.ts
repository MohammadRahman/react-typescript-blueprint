import { faker } from "@faker-js/faker";

const titles = ["Send Emails", "Delivery Rate", "Bounce Rate", "Open Rate", "Click Through Rate"];
const cards = [] as any;
const engegementCards = [] as any;
const colors = ["blue", "pink", "orange", "green", "black"];
const color = ["grey", "grey"];
// const icons = ["<HiOutlinePaperAirplane/>", ""];
const gradients = [
  "bluegradient",
  "pinkgradient",
  "orangegradient",
  "greegreengradient",
  "blackgradient",
];
const statsByDays = [
  {
    id: 1,
    jobType: "sent",
    quantity: 45,
    color: "#04AA61",
    day: "31 Mar 2024",
  },
  {
    id: 2,
    jobType: "sent",
    quantity: 45,
    day: "31 Mar 2024",
    color: "#FF6242",
  },
  {
    id: 3,
    jobType: "sent",
    quantity: 45,
    day: "31 Mar 2024",
    color: "#1A5FF8",
  },

  {
    id: 5,
    jobType: "sent",
    quantity: 45,
    day: "26 Mar 2024",
    color: "#1A5FF8",
  },
  {
    id: 6,
    jobType: "sent",
    quantity: 45,
    day: "26 Mar 2024",
    color: "#FF6242",
  },
  {
    id: 7,
    jobType: "sent",
    quantity: 45,
    day: "22 Mar 2024",
    color: "#FF6242",
  },
  {
    id: 8,
    jobType: "sent",
    quantity: 45,
    day: "20 Mar 2024",
    color: "#1A5FF8",
  },
  {
    id: 9,
    jobType: "sent",
    quantity: 45,
    day: "20 Mar 2024",
    color: "#04AA61",
  },
  {
    id: 10,
    jobType: "sent",
    quantity: 45,
    day: "19 Mar 2024",
    color: "#FF6242",
  },
  {
    id: 11,
    jobType: "sent",
    quantity: 45,
    day: "19 Mar 2024",
    color: "#04AA61",
  },
  {
    id: 12,
    jobType: "sent",
    quantity: 45,
    day: "19 Mar 2024",
    color: "#1A5FF8",
  },
];
// const days = [
//   "31 Mar 2024",
//   "26 Mar 2024",
//   "22 Mar 2024",
//   "20 Mar 2024",
//   "19 Mar 2024",
//   "18 Mar 2024",
// ];
const createreports = (howMany: number) => {
  console.log(howMany);
  const getColors = howMany === 2 ? color : colors;
  const cardssData = [];
  for (let i = 0; i < howMany; i++) {
    const randomNumber = faker.number.int({ min: 70, max: 100 });
    cardssData.push({
      id: i + 1,
      title: titles[i],
      rate: randomNumber,
      icon: faker.image.avatar(),
      status: faker.number.float({ min: 1, max: 10 }).toPrecision(2),
      color: getColors[i],
      gradients: gradients[i],
    });
  }
  return cardssData;
};
export const mockcards = () => {
  if (cards.length == 0) {
    const calculatedCards = createreports(5);
    cards.push(...calculatedCards);
  }
  return cards;
};
export const customerEngageMentRateMock = () => {
  const newItem = {
    id: 3,
    title: "Repeating invoices",
    repeatingInvoices: 3450,
    rate: 0,
    color: "grey",
    // gradients: "",
  };
  if (engegementCards.length == 0) {
    const calculatedCards = createreports(2);
    engegementCards.push(...calculatedCards, newItem);
  }
  return engegementCards;
};
type Stat = {
  id: number;
  jobType: string;
  quantity: number;
};
export const dayStatsMock = () => {
  const dayStatsByCat: { [day: string]: Stat[] } = {};
  statsByDays.forEach(({ day, ...rest }) => {
    if (!(day in dayStatsByCat)) {
      dayStatsByCat[day] = [];
    }
    dayStatsByCat[day]?.push({ ...rest });
  });
  return dayStatsByCat;
};
