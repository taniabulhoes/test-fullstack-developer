import { useRouter } from "next/router";
import Head from "next/head";
import { useFormik } from "formik";
import { object, string } from "yup";
import { toast } from "react-toastify";

import { Box, Button, CssBaseline, TextField } from "@mui/material";

import AppBar from "@/components/AppBar";
import { useAuth } from "@/context/auth";
import { useTasks } from "@/context/tasks";

const validationSchema = object().shape({
  title: string().required(),
});

export default function CreateTaskPage() {
  const { user } = useAuth();
  const { updateTask, deleteTask, tasks } = useTasks();

  const router = useRouter();

  const { task_id } = router.query;

  const selectedTask = tasks.find((task) => task.id === task_id);

  const formik = useFormik({
    initialValues: {
      title: selectedTask?.title,
    },
    validationSchema,
    onSubmit: handleUpdate,
  });

  function handleUpdate({ title }: any) {
    updateTask({
      id: task_id as string,
      title,
    });

    router.push(`/tasks`);

    toast.success("Tarefa atualizada com sucesso");
  }

  const handleDeleteTask = () => {
    deleteTask(task_id as string);

    router.push(`/tasks`);
  };

  return (
    <>
      <Head>
        <title>Atualizar Tarefa | Tânia Bulhões</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <CssBaseline />

      <Box
        sx={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}
      >
        <AppBar title="Atualizar Tarefa" user={user} />

        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            flexGrow: 1,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <form
            onSubmit={formik.handleSubmit}
            style={{ maxWidth: "640px", width: "100%", padding: 12 }}
          >
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                width: "100%",
                maxWidth: "640px",
              }}
            >
              <TextField
                fullWidth
                id="title"
                name="title"
                label="Título"
                value={formik.values.title}
                onChange={formik.handleChange}
                error={formik.touched.title && Boolean(formik.errors.title)}
                helperText={formik.touched.title && formik.errors.title}
                variant="outlined"
                sx={{ marginBottom: 2 }}
              />
            </Box>
          </form>
          <Box>
            <Button
              variant="outlined"
              color="primary"
              type="submit"
              size="large"
              disabled={formik.isSubmitting}
              sx={{ marginRight: 2 }}
              onClick={handleDeleteTask}
            >
              Deletar
            </Button>

            <Button
              variant="contained"
              color="primary"
              type="submit"
              size="large"
              disabled={formik.isSubmitting}
              onClick={formik.submitForm}
            >
              Atualizar
            </Button>
          </Box>
        </Box>
      </Box>
    </>
  );
}
