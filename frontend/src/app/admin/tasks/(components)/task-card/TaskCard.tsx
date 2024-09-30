"use client";

import { TASK_STATUS_LABEL } from "@/constants/i18N";
import { Task, TaskStatus } from "@/services/backend/todo-list/types";
import { Icon } from "@iconify/react";
import { Box, Card, Grid2, Stack, Typography } from "@mui/material";
import TaskCardMenu from "./TaskCardMenu";

interface TaskCardProps {
  task: Task;
}

export default function TaskCard({ task }: TaskCardProps) {
  return (
    <Grid2>
      <Card
        sx={{
          p: { xs: 2, xl: 3 },
          position: "relative",
          boxShadow: 3,
          borderRadius: 2,
          transition: "0.3s",
          "&:hover": {
            boxShadow: 6,
            transform: "scale(1.02)",
          },
          backgroundColor:
            task.status === TaskStatus.ARCHIVED ? "#f9f9f9" : "#fff",
        }}
      >
        {task.status === TaskStatus.ARCHIVED && (
          <Box
            position="absolute"
            top={10}
            left={10}
            data-cy="task-card-archived-indicator"
          >
            <Icon icon="mdi:archive" color="#FFD700" />
          </Box>
        )}

        <Stack direction="row" alignItems="flex-start" gap={2}>
          <Stack direction="column" flex={1} spacing={1} alignContent="initial">
            <Typography
              variant="h5"
              textTransform="capitalize"
              fontWeight="bold"
            >
              {task.title}
            </Typography>
            <Typography variant="subtitle1" color="text.secondary">
              {task.subtitle}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {task.description}
            </Typography>
            <Stack direction="row" alignItems="initial">
              <Icon icon="mdi:status" width={16} />
              <Typography variant="body2" color="text.secondary">
                <strong>Status:</strong> {TASK_STATUS_LABEL[task.status]}
              </Typography>
            </Stack>
          </Stack>

          <TaskCardMenu task={task} />
        </Stack>
      </Card>
    </Grid2>
  );
}
