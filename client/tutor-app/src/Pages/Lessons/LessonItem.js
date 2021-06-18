import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {
    Table,
    Icon,
    EditIcon,
    PlusIcon,
    MinusIcon,
    toaster
} from 'evergreen-ui'
import LessonEdit from './LessonEdit'
import * as cartActions from '../../redux/cart/actions'
import './style.css'
const LessonItem = (props) =>{
    const {lesson, isEdit, editCB, isAdmin} = props
    const d = useDispatch()
    const cart = useSelector(state=> state.cart)
    const addToCart = (id) =>{
        d(cartActions.addCart(id))
        toaster.success('item added to cart')
    }
    const removeFromCart = (id)=>{
        d(cartActions.removeCart(id))
        toaster.success('item removed from cart')
    }
    return(
        <>
        <Table.Row>
            <Table.TextCell flex='0 1 200px'>{lesson.name}</Table.TextCell>
            <Table.TextCell flex='1 1'>{lesson.description}</Table.TextCell>
            <Table.TextCell flex='0 1 100px'>place</Table.TextCell>
            <Table.TextCell flex='0 1 65px'>${lesson.price}</Table.TextCell>
            {isAdmin ?
                <Table.TextCell flex='0 1 50px'>
                    <Icon onClick={()=>editCB(lesson.id)} icon={EditIcon} size={20}/>
                </Table.TextCell>
                :
                <Table.TextCell flex='0 1 50px'>
                    {cart.lessons.includes(lesson.id)?
                        <Icon onClick={()=>{removeFromCart(lesson.id)}} icon={MinusIcon} size={20}/>
                        :
                        <Icon onClick={()=>{addToCart(lesson.id)}} icon={PlusIcon} size={20}/>
                    }
                </Table.TextCell>     
            }
        </Table.Row>
        <Table.Row  height='1000px' maxHeight = {isEdit? '250px': '0'} overflow="hidden" className='expand-box'>
            <LessonEdit {...props} />
        </Table.Row>
        </>
    )
}

export default LessonItem