"use client";

import { RHFCheckBoxField } from "@/components/check-box-field";
import { RHFSelectField } from "@/components/select-field";
import { ROUTES } from "@/constants";
import { TASK_CATEGORY_OPTIONS } from "@/constants/i18N";
import { findAllTasks } from "@/services";
import { Task, TaskFiltersForm } from "@/services/backend/todo-list/types";
import AccountCircleIcon from "@mui/icons-material/AccountCircle"; // Import this line
import {
  Alert,
  Box,
  Button,
  Card,
  CircularProgress,
  Divider,
  Grid,
  IconButton,
  Menu,
  MenuItem,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { TaskCard } from "./tasks/(components)/task-card";

export default function AdminTasksPage() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const form = useForm<TaskFiltersForm>({
    defaultValues: {
      archived: false,
      category: null,
    },
  });

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const openMenu = Boolean(anchorEl);

  const archivedFormValue = form.watch("archived") as boolean;
  const categoryFormValue = form.watch("category");

  useEffect(() => {
    fetchTasks({ archived: archivedFormValue, category: categoryFormValue });
  }, [archivedFormValue, categoryFormValue]);

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async (filters?: TaskFiltersForm) => {
    try {
      const response = await findAllTasks(filters);
      setTasks(response);
    } catch (error) {
      console.error("Error fetching tasks:", error);
      setError("Error loading tasks.");
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("AUTH_JWT_TOKEN");
    router.push(ROUTES.auth.login); // Redirect to login page
  };

  const handleProfileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleProfileMenuClose = () => {
    setAnchorEl(null);
  };

  if (loading) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="100vh"
      >
        <CircularProgress />
      </Box>
    );
  }

  return (
    <FormProvider {...form}>
      <Stack sx={{ p: 4, bgcolor: "#f5f5f5", minHeight: "100vh" }} gap={3}>
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <Typography variant="h4" gutterBottom>
            Task List
          </Typography>
          <div>
            <IconButton onClick={handleProfileMenuOpen}>
              <AccountCircleIcon fontSize="large" />
            </IconButton>
            <Menu
              anchorEl={anchorEl}
              open={openMenu}
              onClose={handleProfileMenuClose}
            >
              <MenuItem onClick={handleLogout}>Logout</MenuItem>
            </Menu>
          </div>
        </Stack>
        <Card sx={{ p: 3, boxShadow: 2, bgcolor: "#fff" }}>
          <Stack direction="row" justifyContent="space-between" gap={3}>
            <Stack direction="row" alignItems="center" gap={3}>
              <Typography variant="subtitle1">Filters:</Typography>
              <RHFCheckBoxField name="archived" label="Show Archived" />
              <Divider orientation="vertical" flexItem />
              <Typography variant="subtitle1">Categories:</Typography>
              <RHFSelectField
                name="category"
                label="Select Category"
                options={TASK_CATEGORY_OPTIONS}
                placeholder="Category"
              />
            </Stack>
            <Button
              variant="contained"
              onClick={() => router.push(ROUTES.admin.tasks.create)}
              sx={{ bgcolor: "#1976d2", color: "#fff" }}
            >
              Add Task
            </Button>
          </Stack>
        </Card>
        {error && <Alert severity="error">{error}</Alert>}
        <Grid container spacing={2}>
          {tasks.length === 0 ? (
            <Grid item xs={12}>
              <Stack alignItems="center">
                <Typography variant="h6">No tasks available.</Typography>
              </Stack>
            </Grid>
          ) : (
            tasks.map((task) => (
              <Grid item xs={12} sm={6} md={4} key={task.id}>
                <Paper elevation={3}>
                  <TaskCard task={task} />
                </Paper>
              </Grid>
            ))
          )}
        </Grid>
      </Stack>
    </FormProvider>
  );
}
