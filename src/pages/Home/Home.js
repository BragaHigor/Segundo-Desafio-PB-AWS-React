//CSS
import styles from '../Home/Home.module.css'

//stylesComponents
import { DateColor } from '../Home/DateColor.styles'
import { TaskContainer } from './TaskContainer.styles'

//toastify
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

//components
import Navbar from '../../components/Navbar/Navbar'
import Loading from '../../components/Loading/Loading'

//hooks
import { useState, useEffect } from 'react'

//axios
import http from '../../server/http'

const Home = () => {

  const [day, setDay] = useState('monday')
  const [task, setTask] = useState('')
  const [taskAPI, setTaskAPI] = useState([])
  const [copyAllTask, setCopyAllTask] = useState([])
  const [selectDay, setSelectDay] = useState('')
  const [arrayWeek, setArrayWeek] = useState('')
  const [showLoading, setShowLoading] = useState(false)

  //LOCALSTORAGE TOKEN
  const userToken = localStorage.getItem('token_API')
  const token = JSON.parse(userToken)

  //API POST
  const createTaskSubmit = async () => {

    setShowLoading(true)

    await http({
      method:'post',
      url: 'events',
      data: {
        description: task,
        dayOfWeek: day,
      },
      headers: {
        authorization: `bearer ${token}`,
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    }) 

    .then((response) => {

      renderTaskSubmit()
      console.log(response.data, 'ENTROU')
    })

    .catch((error) => {
      console.log(error)
      toast.error('Error, try again later!', {
        className: "error-toast",
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
        });
    })

    .finally(() => {
      setShowLoading(false)
    })

  }

  //API GET
  const renderTaskSubmit = async () => {

    setShowLoading(true)

    await http({
      method:'get',
      url: 'events',
      headers: {
        authorization: `bearer ${token}`,
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    }) 

    .then((response)=>{

      setTaskAPI(response.data.events)
      filterDay(day, response.data.events)

    })

    .catch((error) => {
      console.log(error)
      toast.error('Error or try to render task!', {
        className: "error-toast",
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
        });
    })

    .finally(() => {
      setShowLoading(false)
    })
  }

  useEffect(() => {
    renderTaskSubmit()
  },[])


  //API DELETE TASK ESPECIFICA
  const deleteSelectTaskSubmit = async (id) => {

    setShowLoading(true)

    await http({
      method:'delete',
      url: `events/${id}`,
      headers: {
        authorization: `bearer ${token}`,
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    }) 

    .then((response)=>{

      renderTaskSubmit()
      setArrayWeek(selectDay)
      console.log(response)

      toast.warn('The task you chose has been deleted', {
        position: "top-right",
        autoClose: 2500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      
    })

    .catch((error) => {
      console.log(error)
      toast.error('Error or trying to delete task!', {
        className: "error-toast",
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
        });
      
    })

    .finally(() => {
      setShowLoading(false)
    })

  }

  //API DELETE TODAS AS TASKS
  const deleteAllTaskSubmit = async () => {

    setShowLoading(true)

    await http({
      method:'delete',
      url: `events?dayOfWeek=${arrayWeek}`,
      headers: {
        authorization: `bearer ${token}`,
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    }) 

    .then((response)=>{
      renderTaskSubmit()
      setArrayWeek(selectDay)
      console.log(response)
      
      toast.warn('Tasks for the day you selected have been deleted', {
        position: "top-right",
        autoClose: 2500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    })

    .catch((error) => {
      console.log(error)
      toast.error('Error or trying to delete task!', {
        className: "error-toast",
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
        });
    })

    .finally(() => {
      setShowLoading(false)
    })

  }

  //VERIFICA SE A TASK PODE SER CRIADA
  function handleCreateTask() {

    if (
      !task |
      !day
    ) {

      return toast.error('Complete all fields', {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }

    if (task === '') {

      return toast.error('Complete your task', {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });

    }

    if (day === '') {

      return toast.error('Select a day of the week', {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });

    }

    if (task && day) {

    }

    setTask('')

    createTaskSubmit()

    renderTaskSubmit()

    return toast.success('Your task has been Successfully added', {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });

  }

  //ORDENA CADA DIA DA SEMANA NO SEU FILTRO
  function filterDay(selectWeek, taskAsync = false) {

    console.log(selectWeek)

    const results = (taskAsync ? taskAsync : taskAPI).filter((item) =>
      item.dayOfWeek === selectWeek)

      setCopyAllTask(results)
      setArrayWeek(selectWeek)
     
      console.log(results)
  }

  return (

      <div >
        <Navbar />
          <ToastContainer />

          <div className={styles.container}>
            <div className={styles.todo}>
              {/* HEARDER DO TO DO LIST */}
              <div className={styles.todoHeader}>
                <div className={styles.allInput}>
                  <input className={styles.inputTextHeader}
                    placeholder='Task or issue'
                    type="text"
                    value={task}
                    maxlength="102"
                    onChange={(e) => setTask(e.target.value)}
                  />

                  <select className={styles.inputDayHeader} value={day} onChange={(e) => setDay(e.target.value)} >
                    <option value='default'></option>
                    <option value='monday'   >Monday</option>
                    <option value='tuesday'  >Tuesday</option>
                    <option value='wednesday'>Wednesday</option>
                    <option value='thursday' >Thursday</option>
                    <option value='friday'   >Friday</option>
                    <option value='saturday' >Saturday</option>
                    <option value='sunday'   >Sunday</option>
                  </select>
                </div>

                <div className={styles.buttonHeader}>
                  <button className={styles.buttonAdd} 
                    onClick={handleCreateTask}>
                      + Add to calendar
                  </button>
                  <button className={styles.buttonDeleteAll}
                     onClick={() => deleteAllTaskSubmit (task.arrayWeek)}>
                      - Delete All
                  </button>
                </div>
              </div>

              {/* FILTROS TO DO LIST */}
              
              <div className={styles.buttonFiltros}>
                <button className={styles.buttonMonday} 
                  value='monday' 
                  onClick={(e) => {filterDay(e.target.value); setSelectDay(e.target.value)}} 
                >
                  Monday
                </button>
                <button 
                  className={styles.buttonTuesday} 
                  value='tuesday' 
                  onClick={(e) => {filterDay(e.target.value); setSelectDay(e.target.value)}}
                >
                  Tuesday
                </button>
                <button className={styles.buttonWednesday} 
                  value='wednesday' 
                  onClick={(e) => {filterDay(e.target.value); setSelectDay(e.target.value)}}
                >
                  Wednesday
                </button>
                <button className={styles.buttonThursday} 
                  value='thursday' 
                  onClick={(e) => {filterDay(e.target.value); setSelectDay(e.target.value)}}
                >
                  Thursday
                </button>
                <button className={styles.buttonFriday} 
                  value='friday' 
                  onClick={(e) => {filterDay(e.target.value); setSelectDay(e.target.value)}}
                >
                  Friday
                </button>
                <button className={styles.buttonSaturday} 
                  value='saturday' 
                  onClick={(e) => {filterDay(e.target.value); setSelectDay(e.target.value)}}
                >
                  Saturday
                </button>
                <button className={styles.buttonSunday} 
                  value='sunday' 
                  onClick={(e) => {filterDay(e.target.value); setSelectDay(e.target.value)}}
                >
                  Sunday
                </button>
              </div>

              {/* TIME */}
              <div className={styles.textTime}>
                <p>Time</p>
              </div>

              {/* SCROLL TASK*/}
              <div className={`${styles.scrollTask} ${styles.flipped}`}>

                {/* TO DO LIST */}
                {copyAllTask.map(task => {
    
                  return (
                  <>
                    {showLoading && <Loading />}
                      <div key={task._id} className={styles.taskContainer}>
                        <DateColor taskDate={task.dayOfWeek}>
                          <p>{task.createdAt.substring(11,16)}</p>
                        </DateColor>
                        <div className={styles.task}>
                          <TaskContainer taskDate={task.dayOfWeek}>
                          <div className={styles.borderTask}></div>
                          </TaskContainer>
                          <span className={styles.taskTitle}>{task.description}</span>
                          <div className={styles.buttonTask}>
                            <button className={styles.buttonDeleteTask} onClick={() => deleteSelectTaskSubmit(task._id)}>Delete</button>
                          </div>
                        </div>
                      </div>
                  </>)
                })}
                  {showLoading && <Loading />}
                </div>
            </div>
          </div >
    </div >
  )
}

export default Home