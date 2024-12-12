"use client";

import dynamic from "next/dynamic";
import { Issue } from "@prisma/client";
import { Grid, Box, Flex } from "@radix-ui/themes";
import StatusSelect from "./StatusSelect";
import IssueFormSkeleton from "./loading";

const IssueForm = dynamic(() => import("@/app/issues/_components/IssueForm"), {
  ssr: false,
  loading: () => <IssueFormSkeleton />,
});

interface Props {
  issue: Issue;
}

const EditIssuePageWrapper = ({ issue }: Props) => {
  return (
    <Grid columns={{ initial: "1", md: "3" }} gap="5">
      <Box className="md:col-span-2">
        <IssueForm issue={issue} />
      </Box>
      <Box>
        <Flex direction="column" gap="4">
          <StatusSelect issue={issue} />
        </Flex>
      </Box>
    </Grid>
  );
};

export default EditIssuePageWrapper;