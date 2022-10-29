import React, {useState, useEffect} from 'react'
import {useAuth} from '../../contexts/AuthContext'
import axios from 'axios'
import { Container } from 'react-bootstrap'
import SingleList from './SingleList'
import FilterCat from './FilterCat'
import ListCreate from './ListCreate'
import './List.css'



export default function List() {
     const [List, setList] = useState([]);

     const {currentUser} = useAuth()
     const [showCreate, setShowCreate] = useState(false)
     const [filter, setFilter] = useState(0);
     const [doneFilter, setDoneFilter] = useState(0);

     const getList = () => {
        axios.get(`https://localhost:7080/api/Resources`).then(response => {
            console.log(response)
            setList(response.data)
        })
     }

     useEffect(() => {
        getList()
     }, []);

  return (
    <section className='List'>
        <article className='bg-info p-5'>
            <h1 className='text-center'>List</h1>
        </article>

            <div className='bg-dark p-2 mb-3 text-center'>
                <button className='btn btn-info' onClick={() => setShowCreate(!showCreate)}>
                    {!showCreate ? 'Create New ToDo' : 'Close Form'}
                </button>
                <div className='createContainer'>
                    {showCreate &&
                        <ListCreate getList={getList} setShowCreate={setShowCreate} />
                    }
                </div>
            </div>

            {/* <div className='bg-dark p-2 mb-3 text-center'>
                <button className='btn btn-info' onClick={() => setShowCreate(!showCreate)}>
                    {!showCreate ? 'Filter Done ToDos' : 'Filter Done'}
                </button>
                <div className='createContainer'>
                    {showCreate &&
                        //Conditionally render ListCreate if showCreate is true
                        <ListCreate getList={getList} setShowCreate={setShowCreate} />
                    }
                </div>
            </div> */}




        <FilterCat setFilter={setFilter} />
        <Container>
            <article className='ListGallery row justify-content-center'>
                {filter === 0 ? List.map(x =>
                    <SingleList key={x.resourceId} List={x} getResources={getList} />
                ) :
                List.filter(x => x.categoryId === filter).map(x =>
                    <SingleList key={x.ResourceId} List={x} getList={getList} />
                )}
                
                {filter !== 0 && List.filter(x => x.categoryId === filter).length === 0 &&
                    <h2 className='alert alert-warning text-dark'>
                        There are no results for this category.
                    </h2>
                }
            </article>
        </Container>

    </section>
  )
}
