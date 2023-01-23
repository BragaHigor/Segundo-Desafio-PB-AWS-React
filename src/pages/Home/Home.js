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

//hooks
import { useState, useEffect } from 'react'


const Home = () => {

  const [day, setDay] = useState(1)
  const [hour, setHour] = useState(1)

  const [task, setTask] = useState('')
  const [allTask, setAllTask] = useState(JSON.parse(localStorage.getItem('db_task')) || [])

  const [reload, setReload] = useState(false)

  const [copyAllTask, setCopyAllTask] = useState([])
  
  //VERIFICA SE A TASK PODE SER CRIADA
  function handleCreateTask() {

    if (
      !task |
      !day |
      !hour
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

    if (day === 1) {

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

    if (hour === 1) {

      return toast.error('Add a time', {
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

    if (hour && day && hour) {

    }

    //CRIA UMA NOVA TASK
    const idRandom = (num) => Math.floor(Math.random() * num)

    const newTask = { id: idRandom(9999), title: task, group: day, date: hour }

    setAllTask([...allTask, newTask])

    setTask('')
    setDay(1)
    setHour(1)

    setCopyAllTask(allTask)

    filterDay(day)

    setReload(true)


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

  //DELETAR TASK SELECIONADA
  function handleDeleteTask(id) {

    setAllTask(allTask.filter(remove => remove.id !== id))

    setCopyAllTask(copyAllTask.filter(remove => remove.id !== id));

    return toast.warn('Heads up! You have deleted the selected task', {
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

  //DELETA TODAS AS TASK DE UMA VEZ SÓ
  function handleAllDeleteTask() {

    setAllTask(allTask.filter((remove) => !remove.id));

    setCopyAllTask(copyAllTask.filter((remove) => !remove.id));

    return toast.warn('Heads up! You just deleted ALL tasks from your Week Planner', {
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

  //ARMAZENAR AS TASK NO LOCALSTORAGE
  useEffect(() => {
    localStorage.setItem('db_task', JSON.stringify(allTask));

  }, [allTask, copyAllTask])


  const [selectDay, setSelectDay] = useState('Monday')

  //ORDENA CADA DIA DA SEMANA NO SEU FILTRO
  function filterDay(number) {

    setSelectDay(number)

    const results = allTask.filter((item) => 
    item.group === number).sort((a,b) => a.date.localeCompare(b.date))
    
   setCopyAllTask(results)

  }

  useEffect(() => {

    filterDay(selectDay)
    setReload(false)

  },[reload])
 

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
                <option value='1'        ></option>
                <option value='Monday'   >Monday</option>
                <option value='Tuesday'  >Tuesday</option>
                <option value='Wednesday'>Wednesday</option>
                <option value='Thursday' >Thursday</option>
                <option value='Friday'   >Friday</option>
                <option value='Saturday' >Saturday</option>
                <option value='Sunday'   >Sunday</option>
              </select>

              <input className={styles.inputTimeHeader}
                type='time'
                pattern="(?:[01]|2(?![4-9])){1}\d{1}:[0-5]{1}\d{1}"
                value={hour}
                onChange={(e) => setHour(e.target.value)}
              />

            </div>

            <div className={styles.buttonHeader}>
              <button className={styles.buttonAdd} 
                onClick={handleCreateTask}>
                  + Add to calendar
              </button>
              <button className={styles.buttonDeleteAll} 
                onClick={() => handleAllDeleteTask(task.id)}>
                  - Delete All
              </button>
            </div>
          </div>

          {/* FILTROS TO DO LIST */}
          
          <div className={styles.buttonFiltros}>
            <button className={styles.buttonMonday} 
              value='Monday' 
              onClick={(e) => filterDay(e.target.value)} 
            >
              Monday
            </button>
            <button 
              className={styles.buttonTuesday} 
              value='Tuesday' 
              onClick={(e) => filterDay(e.target.value)}
            >
              Tuesday
            </button>
            <button className={styles.buttonWednesday} 
              value='Wednesday' 
              onClick={(e) => filterDay(e.target.value)}
            >
              Wednesday
            </button>
            <button className={styles.buttonThursday} 
              value='Thursday' 
              onClick={(e) => filterDay(e.target.value)}
            >
              Thursday
            </button>
            <button className={styles.buttonFriday} 
              value='Friday' 
              onClick={(e) => filterDay(e.target.value)}
            >
              Friday
            </button>
            <button className={styles.buttonSaturday} 
              value='Saturday' 
              onClick={(e) => filterDay(e.target.value)}
            >
              Saturday
            </button>
            <button className={styles.buttonSunday} 
              value='Sunday' 
              onClick={(e) => filterDay(e.target.value)}
            >
              Sunday
            </button>
          </div>


          {/* SCROLL FILTRO*/}
          {/* <div className={styles.scrollFilter}></div> */}

          {/* TIME */}
          <div className={styles.textTime}>
            <p>Time</p>
          </div>

          {/* SCROLL TASK*/}
          <div className={`${styles.scrollTask} ${styles.flipped}`}>

            {/* TO DO LIST */}
            {copyAllTask.map(task => {

              return (<div key={task.id} className={styles.taskContainer}>
                <DateColor taskDate={task.group}>
                  <p>{task.date}</p>
                </DateColor>
                <div className={styles.task}>
                  <TaskContainer taskDate={task.group}>
                  <div className={styles.borderTask}></div>
                  </TaskContainer>
                  <span className={styles.taskTitle}>{task.title}</span>
                  <div className={styles.buttonTask}>
                    <button className={styles.buttonDeleteTask} onClick={() => handleDeleteTask(task.id)} >Delete</button>
                  </div>
                </div>
              </div>)
            })}

            </div>
        </div>
      </div >
    </div >
  )
}

export default Home