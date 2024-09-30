"use client";

import routes from "@/constants/routes";
import { createTask } from "@/services";
import {
  TaskCategory,
  TaskCreateDto,
  TaskStatus,
} from "@/services/backend/todo-list/types";
import { yupResolver } from "@hookform/resolvers/yup";
import { Button, Container, Stack } from "@mui/material";
import { useRouter } from "next/navigation";
import { FormProvider, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import * as Yup from "yup";
import { TaskForm } from "../../(components)/form";

export default function AdminCreateTask() {
  const { push } = useRouter();

  const form = useForm<TaskCreateDto>({
    defaultValues: {
      title: "",
      subtitle: "",
      description: "",
      status: TaskStatus.TO_DO,
      archived: false,
    },
    resolver: yupResolver(validationSchema),
  });

  const onSaveClickHandler = async (formData: TaskCreateDto) => {
    try {
      await createTask(formData);
      toast.success("Tarea creada con éxito");
      push(routes.admin.tasks.list);
    } catch (error) {
      console.error("Error al crear tarea:", error);
      toast.error("Error al crear tarea");
    }
  };

  return (
    <FormProvider {...form}>
      <Container title="Crear Nueva Tarea">
        <Stack gap={{ xs: 2, md: 3 }}>
          <TaskForm />
          <Stack direction="row" spacing={2} justifyContent="center">
            <Button
              variant="contained"
              color="primary"
              onClick={form.handleSubmit(onSaveClickHandler)}
              disabled={form.formState.isSubmitting}
            >
              Agregar Tarea
            </Button>
            <Button
              variant="outlined"
              color="secondary"
              onClick={() => push(routes.admin.tasks.list)}
            >
              Cancelar
            </Button>
          </Stack>
        </Stack>
      </Container>
    </FormProvider>
  );
}

const validationSchema = Yup.object().shape({
  title: Yup.string().required("Título requerido"),
  subtitle: Yup.string().required("Subtítulo requerido"),
  description: Yup.string(),
  status: Yup.mixed<TaskStatus>()
    .oneOf(Object.values(TaskStatus))
    .required("Requerido"),
  category: Yup.mixed<TaskCategory>()
    .oneOf(Object.values(TaskCategory))
    .required("Requerido"),
  archived: Yup.boolean(),
});
