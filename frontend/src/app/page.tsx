'use client'

import { Container, Content , Main, TaskList } from "./home.styles"
import { Header } from "@/components/header/Header"

import React, { useState, useEffect } from "react"
import { AppDispatch, RootState } from "@/redux/store/store"
import { useDispatch, useSelector } from "react-redux"
import { useRouter } from "next/navigation"
import {  getAllTasks } from "@/redux/features/tasks/tasksActions"
import { TaskItem } from "@/components/taskItem/TaskItem"

export default function Home() {

  
  const router = useRouter()
  const dispatch = useDispatch<AppDispatch>()
  const task = useSelector((state: RootState) => state.task)
  const [listDependency, setListDependency] = useState(true)
  const [searchValueFilter, setSearchValueFilter] = useState("")
  const [buttonSearchvalue, setButtonSearchvalue] = useState("")

  useEffect(()=>{
    dispatch(getAllTasks({userToken: task.userToken}))
  }, [listDependency])


  const handleFilterButtons = (e: React.MouseEvent<HTMLElement>) => {
    const button = e.target as HTMLButtonElement
    if(button.className.includes("selected")){
      setButtonSearchvalue("")
      return button.classList.remove("selected")
    }
    
    const menu = e.currentTarget as HTMLElement
    var buttons = menu.getElementsByTagName("button")
    for(let i=0; i < buttons.length; i++){
      const btn = buttons[i]
        btn.classList.remove("selected")
      }

      button.classList.add("selected")
      setButtonSearchvalue(button.value)
  }

  const filteredTaskList = task.taskList.filter((taskItem) => {
  const statusFilter = taskItem.status.includes(buttonSearchvalue)
  const textFilter =
      taskItem.title.toLowerCase().includes(searchValueFilter.toLowerCase()) ||
      taskItem.description.toLowerCase().includes(searchValueFilter.toLowerCase());

    return statusFilter && textFilter;
  });

  

  const handleNewTaskButtonClick = () => {
    router.push('/task')
  }

  return (
    <Main>
      <Header/>
      <Container>
        <Content>
            <div className="contentHeader">
              <h1>Minhas Tarefas</h1>
              <button onClick={()=>handleNewTaskButtonClick()}>Criar Tarefa</button>
            </div>
            <menu onClick={(e) => handleFilterButtons(e)}>
              <li><button className="selected open"  value="open">Abertas</button></li>
              <li><button className="closed"  value="closed">Finalizadas</button></li>
              <li><button className="running" value="running">Em andamento</button></li>
            </menu>

            <input placeholder="Pesquisar" value={searchValueFilter} onChange={(e)=> setSearchValueFilter(e.target.value)}/>
            <TaskList>
              {filteredTaskList.map((taskItem, i)=>{
                return (
                    <TaskItem taskItem={taskItem} userToken={task.userToken} key={i} setListDependency={setListDependency} listDependency={listDependency} />
                )
              })}     
            </TaskList>
        </Content>
      </Container>
    </Main>
  )
}
