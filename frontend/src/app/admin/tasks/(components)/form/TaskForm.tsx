import { RHFTextField } from "@/components";
import { RHFCheckBoxField } from "@/components/check-box-field";
import { RHFSelectField } from "@/components/select-field";
import { TASK_CATEGORY_OPTIONS, TASK_STATUS_OPTIONS } from "@/constants/i18N";
import { Card, CardContent, Stack, Typography } from "@mui/material";

const TaskForm = () => {
  return (
    <Stack alignItems="center" justifyContent="flex-start" sx={{ padding: 2 }}>
      <Card sx={{ width: "100%", maxWidth: 600, padding: 3 }}>
        <Typography variant="h5" component="h2" gutterBottom align="center">
          Crear Tarea
        </Typography>
        <CardContent>
          <Stack gap={3}>
            <RHFTextField
              name="title"
              label="Title"
              type="text"
              fullWidth
              required
            />
            <RHFTextField
              name="subtitle"
              label="Subtitle"
              type="text"
              fullWidth
              required
            />
            <RHFTextField
              name="description"
              label="Description"
              type="text"
              fullWidth
              multiline
              minRows={4}
            />
            <Stack direction="row" gap={3}>
              <RHFSelectField
                name="status"
                label="Status"
                options={TASK_STATUS_OPTIONS}
              />
              <RHFSelectField
                name="category"
                label="Category"
                options={TASK_CATEGORY_OPTIONS}
              />
              <RHFCheckBoxField name="archived" label="Archive" />
            </Stack>
          </Stack>
        </CardContent>
      </Card>
    </Stack>
  );
};

export default TaskForm;
