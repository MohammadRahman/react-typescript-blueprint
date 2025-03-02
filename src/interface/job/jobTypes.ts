// types/jobTypes.ts

enum Status {
  ZERO = 0,
  ONE = 1,
  TWO = 2,
  THREE = 3,
}

export type StartJob = {
  emailTemplateId: string;
  emailAccountId: string;
  name: string;
};

export type Job = {
  jobId: string;
  emailTemplateId: string;
  emailAccountId: string;
  name: string;
  status: Status;
  startDate: string;
};

export type JobDetails = {
  id: string;
  jobId: string;
  sendTo?: string;
  emailSendingDate?: string;
  emailSendingStatus: Status;
  emailSubject?: string;
  emailBody?: string;
};
