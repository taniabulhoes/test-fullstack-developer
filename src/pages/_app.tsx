import type { AppProps } from "next/app";

import { AuthProvider } from "@/context/auth";
import { TasksProvider } from "@/context/tasks";
import Toast from "@/components/Toast";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <AuthProvider>
      <TasksProvider>
        <>
          <Toast />
          <Component {...pageProps} />
        </>
      </TasksProvider>
    </AuthProvider>
  );
}
