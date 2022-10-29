import React, {useState} from 'react'
import { useAuth } from '../../contexts/AuthContext'
import axios from 'axios'
import {FaTrashAlt, FaEdit} from 'react-icons/fa'
import ListEdit from './ListEdit'


export default function SingleList(props) {
  const {currentUser} = useAuth()
  //the below hook will open/close our edit modal
  const [showEdit, setShowEdit] = useState(false);

  const deleteListItem = (id) => {
    if(window.confirm(`Are you sure you wnat to delete ${props.List.name}?`)) {
      axios.delete(`https://localhost:7080/api/Resources/${id}`).then(() => {props.getList()})
    }
  }

  return (
    <div className='singleList col-md-5 m-4'>
          <div>
            <button id='editLink' onClick={() => setShowEdit(true)}>
              <FaEdit />
            </button>
            <button className='m-1 rounded' id='deleteLink' onClick={() => deleteListItem(props.resource.id)}>
              <FaTrashAlt />
            </button>

            {showEdit &&
              <ListEdit
                List={props.List}
                showEdit={showEdit}
                setShowEdit={setShowEdit}
                getList={props.getList} />
            }
          </div>
        
        <h3>{props.List.name}</h3>
            <p>{props.List.name}</p>
    </div>
  )
}
