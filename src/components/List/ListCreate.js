import React from 'react'
import ListForm from './ListForm'

export default function ListCreate(props) {
  return (
    <article className='createList m-2 text-white justify-content-center'>
        <ListForm
            setShowCreate={props.setShowCreate}
            getList={props.getList} />
    </article>
  )
}
