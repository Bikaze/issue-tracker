'use client';
import { Button } from "@radix-ui/themes";
import axios from "axios";
import React from "react";
import { useRouter } from "next/navigation";

const DeleteDialogButton = ({issueId}: {issueId: number}) => {
  const router = useRouter();

  return (
    <Button
      variant="solid"
      color="red"
      onClick={async () => {
        await axios.delete("/api/issues/" + issueId);
        router.push("/issues");
        router.refresh();
      }}
    >
      Delete Issue
    </Button>
  );
};

export default DeleteDialogButton;
