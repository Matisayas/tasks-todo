"use client";

import { ROUTES } from "@/constants";
import { findOneTask } from "@/services/backend/todo-list/findOne";
import { TaskStatus, TaskUpdateDto } from "@/services/backend/todo-list/types";
import { updateTask } from "@/services/backend/todo-list/update";
import { yupResolver } from "@hookform/resolvers/yup";
import { Button, Container, Stack } from "@mui/material";
import { useParams, useRouter } from "next/navigation";
import { useEffect } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import * as Yup from "yup";
import { TaskForm } from "../../../(components)/form";

export default function AdminTaskEditPage() {
  const { id } = useParams<{ id: string }>();
  const { push } = useRouter();

  const form = useForm<TaskUpdateDto>({
    defaultValues: {
      title: "",
      subtitle: "",
      description: "",
      status: TaskStatus.TO_DO,
      archived: false,
    },
    resolver: yupResolver(validationSchema),
  });

  useEffect(() => {
    const fetchTask = async () => {
      try {
        const task = await findOneTask(id);
        form.reset(task);
      } catch (error) {
        console.error("Error al obtener tarea:", error);
        toast.error("Error al obtener tarea");
      }
    };

    fetchTask();
  }, [id, form]);

  const onSaveClickHandler = async (formData: TaskUpdateDto) => {
    try {
      await updateTask(id, formData);
      toast.success("Tarea actualizada con éxito");
      push(ROUTES.admin.tasks.list);
    } catch (error) {
      console.error("Error al actualizar tarea:", error);
      toast.error("Error al actualizar tarea");
    }
  };

  return (
    <FormProvider {...form}>
      <Container title="Edit Task">
        <Stack gap={{ xs: 2, md: 3 }}>
          <TaskForm />
          <Stack direction="row" spacing={2} justifyContent="center">
            <Button
              variant="contained"
              color="primary"
              onClick={form.handleSubmit(onSaveClickHandler)}
              disabled={form.formState.isSubmitting}
            >
              Confirm{" "}
            </Button>
            <Button
              variant="outlined"
              color="secondary"
              onClick={() => push(ROUTES.admin.tasks.list)}
            >
              Cancel
            </Button>
          </Stack>
        </Stack>
      </Container>
    </FormProvider>
  );
}

const validationSchema = Yup.object().shape({
  title: Yup.string(),
  subtitle: Yup.string(),
  description: Yup.string(),
  status: Yup.mixed<TaskStatus>().oneOf(Object.values(TaskStatus)),
  archived: Yup.boolean(),
});
