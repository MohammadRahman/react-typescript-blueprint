const permissionData = [] as any;

const permissionTypes = ["Jobs", "Email Template", "Reports", "Queries", "Source"];

function createPermission(howMany: number) {
  const data = [];
  for (let i = 0; i < howMany; i++) {
    const permissionType = permissionTypes[i];
    const jobsPermission = [1, 0, 1];
    const emailTemplatePermission = [0, 0, 1];
    const reports = [1, 1, 0];
    const queries = [1, 0, 1];
    const source = [0, 1, 0];

    data.push({
      id: i + 1,
      permissionType,
      jobsPermission,
      emailTemplatePermission,
      reports,
      queries,
      source,
    });
  }
  return data;
}
export function permissionDataMocks() {
  if (permissionData.length == 0) {
    const calculatedData = createPermission(5);
    permissionData.push(...calculatedData);
  }
  return permissionData;
}
