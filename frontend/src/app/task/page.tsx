'use client'
import { TaskForm } from "@/components/taskForm/TaskForm"
import { Container, Content , Main } from "./task.styles"
import { Header } from "@/components/header/Header"


export default function Task() {
  return (
    <Main>
      <Header/>
      <Container>
        <Content>
          <TaskForm/>
        </Content>
      </Container>
    </Main>
  )
}

