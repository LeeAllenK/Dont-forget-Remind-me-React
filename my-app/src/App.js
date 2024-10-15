import { useState } from 'react';

import { createReminder, ogReminders } from './reminders';
import { TrashButton } from './Button';
import { SubmitButton } from './SubmitButton';
import { AddButton } from './AddButton';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSun } from '@fortawesome/free-solid-svg-icons';

import Home from './googleSignin/Home'

console.log(process.env.REACT_APP_API_KEY)
const TodoList = () => {
  //state used for reminders
  const [reminders, setReminders] = useState(ogReminders);
  const [isCompleted, setIsCompleted] = useState(false);

  //State used to connect to server
  const [status, setStatus] = useState('typing');
  const [error, setError] = useState(null);

  //state used to change background color light/dark mode
  const [colorMode, setColorMode] = useState(false);

  //Logic used to filter && render reminders
  const showCompleted = reminders.filter((remind) => !remind.completed);
  const showReminders = isCompleted ? showCompleted : reminders;
  const showNotCompleted = reminders.filter((r) => r.completed);


  
  //Submit form used to simulate submitting completed reminders
  const SubmitForm = async (e) => {
    e.preventDefault();
    setStatus('submitting');
    try {
      await submitReminders(reminders)
      setStatus('success')
    } catch(err) {
      setError(err)
      setStatus(error);
    }
  }

  //delete button
  const handleDelete = (id) => {
    const delButton = reminders.filter((remind) => {
      return remind.id !== id
    })
    setReminders(delButton);
  }

  //Crossout reminder for completion
  const strikeButton = (id) => {
    const strike = [...reminders];
    strike[id].completed = !strike[id].completed
    setReminders(strike);
  }

  //light/dark mode function false => true
  const changeColorMode = () => {
    setColorMode(color => !color);
  }
  return (
    <div
      className='app'
      style={{
        backgroundColor: colorMode ? 'white' : 'black',
        color: colorMode ? 'black' : 'white'
      }}>

      <FontAwesomeIcon
        className='color' icon={faSun}
        onClick={() => changeColorMode()}
        style={{ fontSize: 25, cursor: 'pointer' }}

      >
      </FontAwesomeIcon>
      <Home
        style={{
          backgroundColor: colorMode ? 'black' : 'white',
          color: colorMode ? 'white' : 'black'
        }}
      />
      <h1
        className='header'
      >Remind Me</h1>
      <label
        className='label-checkbox'>
        <input
          className='checkbox'
          type='checkbox'
          checked={isCompleted}
          onChange={e => setIsCompleted(e.target.checked)}
        />
        Things to remember
        {' '}
      </label>
      <AddReminders addOne={item => setReminders([...reminders, item])} colorMode={colorMode} />
      <ul className='ul-list'>

        {showReminders.map((todo, index) => (
          <div
            className='todo-list'
            key={todo.id}
            onClick={() => strikeButton(index)}
            style={{
              border: colorMode ? '  2px solid black' : ' 1px solid white',
              borderTop: colorMode ? '0px' : '0'
            }}
          >
            <li>{todo.completed ? <s>{todo.text}</s> : todo.text} &nbsp;<TrashButton style={{ fontSize: 20 }} onClick={() => handleDelete(todo.id)}>
            </TrashButton>
            </li>
          </div>
        ))}

        <br />

        <form
          onSubmit={SubmitForm}
        >
          <SubmitButton
            style={{
              backgroundColor: colorMode ? 'black' : 'white',
              color: colorMode ? 'white' : 'black'
            }}
          /></form>

      </ul>

      {status === 'success' &&
        <p>{showNotCompleted.length} Reminder(s) sumbitted </p>
      }
      <footer className='footer'>
        {showCompleted.length > 0 &&
          <p> {showCompleted.length} Reminder(s) left</p>
        }
      </footer>
    </div>

  )
}


const AddReminders = ({ addOne, colorMode }) => {
  //State used to set text in input
  const [text, setText] = useState('');

  // Add and set the input text field 
  const addText = () => {
    setText('');
    addOne(createReminder(text));
    localStorage.setItem('note', text)
    console.log(text);
  }

  return (
    <div className='add-todo'>
      <input
        className='addTodo'
        type='text'
        value={text}
        onChange={e => setText(e.target.value)}
        style={{ backgroundColor: colorMode ? 'black' : 'white', color: colorMode ? 'white' : 'black' }}
        placeholder='Reminder...'
      />
      <AddButton
        onClick={addText}
        style={{
          backgroundColor: colorMode ? 'black' : 'white',
          color: colorMode ? 'white' : 'black'
        }}
      />


    </div>
  )
}

export default TodoList;

//Server which reminders are submitted
const submitReminders = (reminders) => {

  const remind = [...reminders].filter((r) => {
    return r.completed;
  })

  return new Promise((resolve, reject) => {
    setTimeout(() => {
      //check whether reminders submitted are completed

      const text = remind.length === 0;

      if(text) {

        reject(new Error('No completed reminders to submit!'));
        console.log(`error:`, remind);
      } else {

        resolve();
      }
    }, 1000)
  })
}