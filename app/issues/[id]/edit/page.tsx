import prisma from "@/prisma/client";
import { notFound } from "next/navigation";
import EditIssuePageWrapper from "./EditIssuePageWrapper";

interface Props {
  params: { id: string };
}

const EditIssuePage = async ({ params }: Props) => {
  const { id } = await params;

  const issueId = parseInt(id);
  if (isNaN(issueId)) {
    return notFound();
  }

  const issue = await prisma.issue.findUnique({
    where: { id: issueId },
  });

  if (!issue) {
    return notFound();
  }

  return <EditIssuePageWrapper issue={issue} />;
};

export default EditIssuePage;