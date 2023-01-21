//CSS
import styles from '../Home/Home.module.css'

//toastify
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

//components
import Navbar from '../../components/Navbar/Navbar'
import { useState, useEffect } from 'react'


const Home = () => {

  const [day, setDay] = useState(1)
  const [hour, setHour] = useState(1)

  const [task, setTask] = useState('')
  const [allTask, setAllTask] = useState(JSON.parse(localStorage.getItem('taks_db')) || [])

  const [results, setResults] = useState([])

  //CRIAR UMA NOVA TASK
  function handleCreateTask() {

    if (
      !task |
      !day |
      !hour 
    ) {

      return toast.error('Selecione todas as opções')
    }

      if (task === '') {

        return toast.error('Digite alguma task')

      } 
      
      if (day === 1) {

        return toast.error('selecione um dia da semana')

      } 
      
      if (hour === 1) {

        return toast.error('selecione um horário')
      
      }

      if (hour && day && hour ) {

      }

        const idRandom = (num) => Math.floor(Math.random() * num)

        const newTask = { id: idRandom(9999), title: task, group: day, date: hour }

        setAllTask([...allTask, newTask])

        setTask('')
        setDay(1)
        setHour(1)

        console.log(setDay, setHour)

    }

    //DELETAR TASK SELECIONADA
    function handleDeleteTask (id) {

      setAllTask(allTask.filter(remove => remove.id !== id))

    }

    //DELETAR TODAS AS TASK DE UMA VEZ SÓ
    function handleAllDeleteTask () {

      setAllTask(allTask.filter((remove) => !remove.id));

    }

    //ARMAZENAR AS TASK NO LOCALSTORAGE
    useEffect(() => {
      localStorage.setItem('taks_db', JSON.stringify(allTask));

    }, [allTask])


    //FILTRO
    function filterDay(number) {
      
      const results = allTask.filter((item) => 
        item.group === number 
      )

      console.log(results)

      setAllTask(results)
    }

    useEffect(() => {
      setResults(results)
    },[results])



  return (

    <div >
      <Navbar />

      <ToastContainer />

      <div className={styles.container}>

        <div className={styles.todo}>

          {/* HEAR DO TO DO LIST */}
          <div className={styles.todoHeader}>
            <input
              type="text"
              value={task}
              onChange={(e) => setTask(e.target.value)}
            />
            <select  name='day' value={day} onChange={(e) => setDay(e.target.value)} >
              <option name='1' value='1'></option>
              <option name='2' value='2'>Monday</option>
              <option name='3' value='3'>Tuesday</option>
              <option name='4' value='4'>Wednesday</option>
              <option name='5' value='5'>Thursday</option>
              <option name='6' value='6'>Friday</option>
              <option name='7' value='7'>Saturday</option>
              <option name='8' value='8'>Sunday</option>
            </select>
            <input
              type='time'
              value={hour}
              onChange={(e) => setHour(e.target.value)}
            />
            <button onClick={handleCreateTask}>+ Add to calendar</button>
            <button onClick={() => handleAllDeleteTask(task.id)}>- Delete All</button>
          </div>

          {/* FILTROS TO DO LIST */}
          <div className={styles.filtros}>
            <div>
              <button name='2' value='2' onClick={(e) => filterDay(e.target.value)}>Monday</button>
              <button name='3' value='3' onClick={(e) => filterDay(e.target.value)}>Tuesday</button>
              <button name='4' value='4' onClick={(e) => filterDay(e.target.value)}>Wednesday</button>
              <button name='5' value='5' onClick={(e) => filterDay(e.target.value)}>Thursday</button>
              <button name='6' value='6' onClick={(e) => filterDay(e.target.value)}>Friday</button>
              <button name='7' value='7' onClick={(e) => filterDay(e.target.value)}>Saturday</button>
              <button name='8' value='8' onClick={(e) => filterDay(e.target.value)}>Sunday</button>
            </div>
          </div>


          {/* TO DO LIST */}
          {allTask.map(task => (

            <div key={task.id}className={styles.taskContainer}>

              <div className={styles.task}>
                <label className={styles.checkboxContainer}>
                  <input type="checkbox" />

                  <span className={styles.checkmark}></span>
                </label>
                <p>{task.date}</p>
                <p>{task.group}</p>
                <p>{task.title}</p>
              </div>
              <div>
                <button onClick={() => handleDeleteTask(task.id)}>delete</button>
              </div>
            </div>

          ))}

        </div>
      </div >
    </div >
  )
}

export default Home