"use client";

import { ROUTES } from "@/constants";
import { removeTask } from "@/services";
import { Task } from "@/services/backend/todo-list/types";
import { updateTask } from "@/services/backend/todo-list/update";
import { Icon } from "@iconify/react";
import { Button, IconButton, Link, Menu, Stack } from "@mui/material";
import { useState } from "react";
import { toast } from "react-toastify";

interface TaskCardMenuProps {
  task: Task;
}

export default function TaskCardMenu({ task }: TaskCardMenuProps) {
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);

  const toggleArchived = async () => {
    try {
      await updateTask(task.id, {
        ...task,
        archived: !task.archived,
      });
      window.location.reload();
    } catch (error) {
      console.error("Error al actualizar tarea:", error);
    }
  };

  const handleDelete = async () => {
    try {
      await removeTask(task.id);

      toast.success("Tarea eliminada con éxito");
      window.location.reload();
    } catch (error) {
      console.error("Error al eliminar tarea:", error);
      toast.error("Error al eliminar la tarea");
    }
  };

  const handleMenuClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <IconButton
        aria-controls="task-menu"
        aria-haspopup="true"
        onClick={handleMenuClick}
        size="medium"
      >
        <Icon icon="ic:baseline-more-vert" />
      </IconButton>
      <Menu
        id="task-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
        PaperProps={{
          sx: {
            width: "200px",
          },
        }}
      >
        <Stack direction="column" spacing={1} padding={1}>
          <Button
            sx={{
              gap: 1,
              color: task.archived ? "green" : "red",
              justifyContent: "flex-start",
              width: "100%",
            }}
            onClick={toggleArchived}
          >
            <Icon
              icon={task.archived ? "mdi:archive-off" : "mdi:archive"}
              height={24}
              width={24}
            />
            {task.archived ? "Unarchive" : "Archive"}
          </Button>
          <Link href={ROUTES.admin.tasks.edit(task.id)} underline="none">
            <Button
              sx={{
                color: "black",
                gap: 1,
                justifyContent: "flex-start",
                width: "100%",
              }}
              onClick={handleClose}
            >
              <Icon icon={"mdi:pencil"} height={24} width={24} />
              Edit
            </Button>
          </Link>
          <Button
            sx={{
              color: "red",
              justifyContent: "flex-start",
              width: "100%", // Ocupa todo el ancho del menú
            }}
            onClick={handleDelete}
          >
            <Icon icon="mdi:trash" height={24} width={24} />
            Remove
          </Button>
        </Stack>
      </Menu>
    </>
  );
}
