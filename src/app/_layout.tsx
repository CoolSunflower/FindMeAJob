import { Stack } from "expo-router";

import { JobProvider } from "../context/JobContext";

export default function RootLayout() {
  return (
    <JobProvider>
      <Stack>
        <Stack.Screen
          name="(tabs)"
          options={{
            headerShown: false,
          }}
        />

        <Stack.Screen
          name="job/[jobId]"
          options={{
            title: "Job Details",
          }}
        />

        <Stack.Screen
          name="company/[companyId]"
          options={{
            title: "Company Details",
          }}
        />
      </Stack>
    </JobProvider>
  );
}
