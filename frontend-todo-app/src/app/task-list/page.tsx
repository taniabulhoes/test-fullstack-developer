"use client";

import PrivateRoute from '../../components/PrivateRoute';

export default function TaskList() {
  return (
    <PrivateRoute>
      <main>
        <h1>TASK LIST</h1>
      </main>
    </PrivateRoute>
  );
}
