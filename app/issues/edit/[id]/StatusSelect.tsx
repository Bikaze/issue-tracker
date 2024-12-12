// filepath: /c:/Users/user/Desktop/issue-tracker/app/issues/[id]/StatusSelect.tsx
"use client";

import { Issue, Status } from "@prisma/client";
import { Select } from "@radix-ui/themes";
import axios from "axios";
import { Toaster, toast } from "react-hot-toast";
import { useState } from "react";

const statuses: { label: string; value: Status }[] = [
  { label: "Open", value: "OPEN" },
  { label: "In Progress", value: "IN_PROGRESS" },
  { label: "Closed", value: "CLOSED" },
];

const StatusSelect = ({ issue }: { issue: Issue }) => {
  const [selectedStatus, setSelectedStatus] = useState<Status>(issue.status);

  const updateStatus = (status: Status) => {
    setSelectedStatus(status);
    axios
      .patch(`/api/issues/${issue.id}`, { status })
      .catch(() => {
        toast.error("Changes could not be saved.");
        setSelectedStatus(issue.status);
      });
  };

  return (
    <>
      <Select.Root value={selectedStatus} onValueChange={updateStatus}>
        <Select.Trigger placeholder="Change Status..." />
        <Select.Content>
          <Select.Group>
            {statuses.map((status) => (
              <Select.Item key={status.value} value={status.value}>
                {status.label}
              </Select.Item>
            ))}
          </Select.Group>
        </Select.Content>
      </Select.Root>
      <Toaster />
    </>
  );
};

export default StatusSelect;