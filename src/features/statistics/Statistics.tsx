import { Row } from "@components/row";
import { customerEngageMentRateMock, dayStatsMock, mockcards } from "@mocks/data";
import styled from "styled-components";
import { Card } from "./Card";
import Button from "@components/button/Button";
import { HiOutlineCalendar, HiOutlineChevronDown } from "react-icons/hi2";
import { DayPickerCalender } from "./day-picker/DayPicker";
import { DayStatsContainer } from "./day-stats/DayStatsContainer";
import { AreaChartComponent } from "./area-chart/AreaChart";
import { PieChart } from "./pie-chart/PieChart";

const EmailDeliveryStatsContainer = styled.div`
  width: 100%;
  background-color: var(--color-grey-0);
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  padding: 2rem;
  border-radius: 1.6rem;
  height: auto;
`;
const CardContainer = styled.div`
  width: 70%;
  border: 1px;
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;
const CardItems = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.6rem;
`;
const StyledCalendarContainer = styled.div`
  /* border: 1px solid var(--color-grey-0); */
  border-radius: 4px;
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;
const DayPickerContainer = styled.div`
  width: 100%;
  background-color: var(--color-grey-0);
  border-radius: 4px;
`;
const CalenderDayContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;
const paymentBehaviouralData = [
  {
    name: "Prompt Payers",
    value: 25,
    color: "#2165FA",
  },
  {
    name: "Late Payers",
    value: 5,
    color: " #FF7F2A",
  },
  {
    name: "Non Payers",
    value: 70,
    color: "#04AA61",
  },
];
const invoicesAmount = [
  {
    name: "Paid Invoices",
    value: 75,
    color: "#04AA61",
  },
  {
    name: "Unpaid Invoices",
    value: 25,
    color: "#FF7F2A",
  },
];
export const Statistics = () => {
  const statsCards = mockcards();
  const engagementStatsCards = customerEngageMentRateMock();
  const dayStats = dayStatsMock();
  const daysArray = Object.keys(dayStats);
  return (
    <div style={{ display: "flex", gap: "3rem" }}>
      <CardContainer>
        <EmailDeliveryStatsContainer>
          <Row type="horizontal">
            <p>Email Delivary Rate</p>
            <Button variation="outlineGrey">
              <HiOutlineCalendar />
              Last Month
            </Button>
          </Row>
          <CardItems>
            {statsCards.map((card: any) => (
              <Card type="md" key={card.id} data={card} />
            ))}
          </CardItems>
        </EmailDeliveryStatsContainer>
        <EmailDeliveryStatsContainer>
          <Row type="horizontal">
            <span>Customer Engagement Rate</span>
            <Button variation="outlineGrey">
              <HiOutlineCalendar />
              Last Month
            </Button>
          </Row>
          <CardItems>
            {engagementStatsCards.map((card: any) => (
              <Card type="sm" key={card.id} data={card} />
            ))}
          </CardItems>
        </EmailDeliveryStatsContainer>
        <EmailDeliveryStatsContainer>
          <Row type="horizontal">
            <span>Trend Analysis</span>
            <div style={{ display: "flex", gap: "1.2rem" }}>
              <Button variation="outlineGrey">
                <span>unpaid invoices</span>
                <HiOutlineChevronDown />
              </Button>

              <Button variation="outlineGrey">
                <HiOutlineCalendar />
                <span> MoM</span>
              </Button>
            </div>
          </Row>
          {/* <AreaChartComponent /> */}
          <div style={{ width: "100%", height: "260px" }}>
            <AreaChartComponent />
          </div>
        </EmailDeliveryStatsContainer>
        <EmailDeliveryStatsContainer>
          <Row type="horizontal">
            <span>Customer Segmentation Metrics</span>
            <Button variation="outlineGrey">
              <HiOutlineCalendar />
              <span> MoM</span>
            </Button>
          </Row>
          <div style={{ display: "flex", justifycontent: "space-between" }}>
            <div
              style={{
                width: "48%",
                height: "260px",
                border: "1px solid #f9fafb",
                border_radius: "16px",
                padding: "1rem",
              }}
            >
              <span>Payment Behaviour</span>

              <div
                style={{
                  width: "100%",
                  height: "100%",
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <PieChart behaviouralData={paymentBehaviouralData} />
              </div>
            </div>
            <div
              style={{
                width: "48%",
                height: "260px",
                border: "1px solid #f9fafb",
                border_radius: "16px",
                padding: "1rem",
              }}
            >
              <span>Invoices Amount</span>
              <div
                style={{
                  alignItems: "center",
                  display: "flex",
                  width: "100%",
                  height: "100%",
                }}
              >
                <PieChart behaviouralData={invoicesAmount} />
              </div>
            </div>
          </div>
        </EmailDeliveryStatsContainer>
      </CardContainer>
      <StyledCalendarContainer>
        <DayPickerContainer>{<DayPickerCalender />}</DayPickerContainer>
        <CalenderDayContainer>
          {daysArray.map(day => (
            <DayStatsContainer day={day} key={day} stats={dayStats[day]} />
          ))}
        </CalenderDayContainer>
      </StyledCalendarContainer>
    </div>
  );
};
