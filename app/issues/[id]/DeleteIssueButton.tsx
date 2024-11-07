'use client';
import { AlertDialog, Button, Flex } from "@radix-ui/themes";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";

const DeleteIssueButton = ({ issueId }: { issueId: number }) => {
  const [error, setError] = useState(false);
  const router = useRouter();

  const handleDelete = async () => {
    try {
      // Trigger the delete action
      await axios.delete("/api/issues/" + issueId);
      router.push("/issues");
      router.refresh();
    } catch {
      // Set error if the delete action fails
      setError(true);
    }
  };

  return (
    <AlertDialog.Root>
      <AlertDialog.Trigger>
        <Button>Delete Issue</Button>
      </AlertDialog.Trigger>
      <AlertDialog.Content>
        <AlertDialog.Title>Confirm Deletion</AlertDialog.Title>
        <AlertDialog.Description>
          Are you sure you want to delete this issue? This action cannot be
          undone.
        </AlertDialog.Description>
        <Flex gap="3" mt="4" justify="end">
          <AlertDialog.Cancel>
            <Button variant="soft" color="gray">
              Cancel
            </Button>
          </AlertDialog.Cancel>
          <AlertDialog.Action>
            {/* Pass handleDelete to DeleteDialogButton */}
            <Button variant="solid" color="red" onClick={handleDelete}>
              Delete Issue
            </Button>
          </AlertDialog.Action>
        </Flex>
      </AlertDialog.Content>

      {/* Error Alert Dialog */}
      <AlertDialog.Root open={error}>
        <AlertDialog.Content>
          <AlertDialog.Title>Error</AlertDialog.Title>
          <AlertDialog.Description>
            This issue could not be deleted.
          </AlertDialog.Description>
          <Button color="gray" variant="soft" onClick={() => setError(false)}>
            Ok
          </Button>
        </AlertDialog.Content>
      </AlertDialog.Root>
    </AlertDialog.Root>
  );
};

export default DeleteIssueButton;
