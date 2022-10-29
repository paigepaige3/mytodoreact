import React, { useState, useEffect} from 'react'
import { Formik, Field, Form } from 'formik'
import { ListSchema } from '../../utilities/validationSchema'

import axios from 'axios'

export default function ListForm(props) {

    const [categories, setCategories] = useState([])
    const [filterDone, setFilterDone] = useState([])

    const getCategories = () => {
        axios.get(`https://localhost:7080/api/Categories`).then(response => setCategories(response.data))
    }
    


    const handleSubmit = (values) => {
        console.log(values)
        if(!props.List) {
            const ListToCreate = values

            axios.post(`https://localhost:7080/api/Resources`, ListToCreate).then(() => {
                props.getList() 
                props.setShowCreate(false)})
        }
        
        else {
            const ListToEdit = {
                ResourceId: props.List.ResourceId,
                Name: values.name,
                ToDos : values.desc,
                Done: values.done,
                CategoryId: values.categoryId
            }

            axios.put(`https://localhost:7080/api/Resources/${props.resource.resourceId}`, 
             ListToEdit).then(() => {
                props.getLists()
                props.setShowEdit(false)
            })
        }
    }



    useEffect(() => {
        getCategories()
    }, []);

  return (
    <Formik
        initialValues={{
            name: props.List ? props.List.name : '',
            Done: props.List ? props.List.done : '',

            categoryId: props.List ? props.List.categoryId : ''
        }}
        validationSchema={ListSchema}
        onSubmit={(values) => handleSubmit(values)}
    >

        {({errors, touched}) => (
            <Form id='ListForm'>
                <div className='form-group m-3'>
                    <Field name='name' className='form-control' placeholder='Title' />
                    {errors.name && touched.name ? (
                        <div className='text-danger'>{errors.name}</div>
                    ) : null}
                </div>
                <div className='form-group m-3'>
                    <Field name='done' className='form-control' placeholder='Done' />
                    {errors.done && touched.done ? (
                        <div className='text-danger'>{errors.done}</div>
                    ) : null}
                </div>


                <div className='form-group m-3'>
                    <Field as='select' name='categoryId' className='form-control'>
                        <option value='' disabled>[Choose Category]</option>
                        {categories.map(cat =>
                            <option key={cat.categoryId} value={cat.categoryId}>
                                {cat.categoryName}
                            </option>
                        )}
                    </Field>
                </div>
                <div className='form-group m-3'>
                    <button type='submit' className='btn btn-info m-3'>Submit List</button>
                </div>
            </Form>
        )}
    </Formik>
  )
}
