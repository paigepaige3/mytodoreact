
import * as Yup from 'yup'

const catSchema = Yup.object().shape({
    //Below we call to each property that will need to be validated and use Yup to define the requirements
    //for each property (required, maxLength, etc.)
    categoryName: Yup.string().max(25, 'Max 25 characters').required('Required'),
    categoryDescription: Yup.string().max(50, 'Max 50 characters')
})

const ListSchema = Yup.object().shape({
    name: Yup.string().max(100, 'Max 100 characters').required(),
    description: Yup.number(),
    categoryId: Yup.number().required()
})


export { ListSchema }
export default catSchema