import React from 'react'
import { Modal } from 'react-bootstrap'
import ListForm from './ListForm'

export default function ListEdit(props) {
  return (
    <Modal
        show={props.showEdit}
        onHide={() => props.setShowEdit(false)}>
        <Modal.Header>
            <h3>Editing {props.List.name}</h3>
        </Modal.Header>
        <Modal.Body>
            <ListForm
                List={props.List}
                setShowEdit={props.setShowEdit}
                getList={props.getList} />
        </Modal.Body>
    </Modal>
  )
}
