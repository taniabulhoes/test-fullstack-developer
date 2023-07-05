'use client'

import { IDeleteTaskRequest, ITask, IUpdateRequest } from "@/interfaces/ITask";
import { useState } from "react";
import { Container, TaskDescription } from "./taskItem.styles"
import { BiCheckCircle, BiSolidDownArrow } from "react-icons/bi";
import { MdOutlineEditNote, MdOutlineNotStarted } from "react-icons/md";
import { AiOutlineCloseCircle } from "react-icons/ai";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/redux/store/store";
import { deleteTask, updateTask } from "@/redux/features/tasks/tasksActions";
import Modal from "../modal/Modal";
import { SubmitHandler, useForm } from "react-hook-form";

type TaskItemProps = {
    taskItem: ITask
    userToken: string
    setListDependency: React.Dispatch<React.SetStateAction<boolean>>
    listDependency: boolean
}

type FormValues = {
  title?: string
  description?: string
  status?: string
  userToken: string
}


const TaskItem = ({ taskItem, userToken, setListDependency, listDependency }: TaskItemProps) => {
  const [visible, setVisible] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const { register, handleSubmit } = useForm<FormValues>();


  const dispatch = useDispatch<AppDispatch>()

  const handleToggleDescription = () => {
    setVisible(!visible);
  };

  const handleChangeTask = async (data: FormValues )=>{
    const req: IUpdateRequest = {
        taskId: taskItem.id,
        userToken: userToken,
        status: data.status  || taskItem.status,
        description: data.description || taskItem.description,
        title: data.title || taskItem.title
    }

    dispatch(updateTask(req)).then(()=>{
      setShowUpdateModal(false)
      setListDependency(!listDependency)
    })

  }

  const handleRemoveTaskClick = (taskId: number) =>{
    const req: IDeleteTaskRequest = {
      userToken: userToken,
      taskId: taskId
    } 
    dispatch(deleteTask(req)).then(()=>{
      setShowDeleteModal(false)
      setListDependency(!listDependency)
    })
  } 

  const onSubmit: SubmitHandler<FormValues> =  (data) => {
     handleChangeTask(data) 
  }

  return (
    <Container className={taskItem.status}>
      {
        showDeleteModal && 
        <Modal title="Excluir tarefa" className="deleteModal" onClose={setShowDeleteModal}>
            <h1>Confirmar exclusão de <span>{taskItem.title}</span></h1>
            <div className="actions">
              <button onClick={()=> setShowDeleteModal(false)}>Cancelar</button>
              <button onClick={()=> handleRemoveTaskClick(taskItem.id)}>Confirmar</button>
            </div>
        </Modal>
      }
      {
        showUpdateModal && 
        <Modal title="Editar tarefa" className="updateModal" onClose={setShowUpdateModal}>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="inputContainer">
                    <input placeholder="Novo Título" {...register("title")} name="title"/>
              </div>
              <div className="inputContainer">
                    <textarea maxLength={300} placeholder="Descrição" {...register("description")} name="description"/>
              </div>
              <div className="radioOptions" >
                        <input {...register("status")} type="radio" id="open" name="status" value="open"/>
                        <label  htmlFor="open">Aberta</label><br/>
                        <input {...register("status")} type="radio" id="closed" name="status" value="closed"/>
                        <label htmlFor="closed">Fechada</label><br/>
                        <input {...register("status")} type="radio" id="running" name="status" value="running"/>
                        <label htmlFor="open">Em andamento</label>
              </div>
              <div className="actions">
                <button onClick={() => setShowUpdateModal(false)}>Cancelar</button>
                <button type="submit" >Confirmar</button>
              </div>
            </form>
        </Modal>
      }      
      <div className="taskItemHeader" >
        <h1 onClick={handleToggleDescription} >{taskItem.title}</h1>
        <menu>
            <li className="startIcon" ><MdOutlineNotStarted title="Iniciar Tarefa" className="icon" onClick={() => handleChangeTask({userToken: userToken, description: taskItem.description, title: taskItem.title, status:"running"})} /></li>
            <li className="completeIcon" ><BiCheckCircle title="Finalizar Tarefa" className="icon" onClick={() => handleChangeTask({userToken: userToken, description: taskItem.description, title: taskItem.title, status:"closed"})}  /></li>
            <li className="editIcon" ><MdOutlineEditNote title="Editar Tarefa" className="icon" onClick={() => setShowUpdateModal(true)}/></li>
            <li className="deleteIcon" ><AiOutlineCloseCircle title="Remover Tarefa" className="icon" onClick={() => setShowDeleteModal(true)} /></li>
        </menu>
      </div>           
      <TaskDescription className={`taskDescription ${visible ? "content" : ""}`}  >
        {
        visible && <p >{taskItem.description}</p> 
        } 
        <div className="arrowContainter" onClick={handleToggleDescription}>
          <BiSolidDownArrow
            className={`arrow ${visible ? "extended" : ""}`}
          />
        </div>
      </TaskDescription>
    </Container>
  );
};

export { TaskItem }