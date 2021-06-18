import React from 'react'
import {
    Table,
    Pane,
    Icon,
    MinusIcon,
    Button
}from 'evergreen-ui'
import { useDispatch, useSelector } from 'react-redux'
import * as cartActions from '../../redux/cart/actions'
import './style.css'
const Cart = (props) =>{
    const d = useDispatch()
    const cart = useSelector(state => state.cart)
    const lessons = useSelector(state => state.lessons)
    let width = {
        lesson: '65%',
        price: '15%',
        remove: '20%'
    }
    const removeFromCart =(id) =>{
        d(cartActions.removeCart(id))
    }
    let cartTotal = 0
    let cartDisplay = cart.lessons.map((id) =>{
        let lesson = lessons.data.find(item=> item.id === id)
        if(!lesson){
            return null
        }
        cartTotal += Number.parseInt(lesson.price)
        return (
            <Table.Row key={lesson.id}>
                <Table.TextCell flex={`1 1 ${width.lesson}`}>{lesson.name}</Table.TextCell>
                <Table.TextCell flex ={`0 1 ${width.price}`}>{lesson.price}</Table.TextCell>
                <Table.TextCell flex ={`0 1 ${width.remove}`}>
                    <Icon onClick={()=>{removeFromCart(lesson.id)}} icon={MinusIcon} size={20} />
                </Table.TextCell>
            </Table.Row>
        )
    })
    return (
        <div className='content-cart'>
            <Pane width="400px" className='cart-panel'>
                <Table>
                    <Table.Head>
                        <Table.TextHeaderCell flex={`1 1 ${width.lesson}`}>Lesson</Table.TextHeaderCell>
                        <Table.TextHeaderCell flex ={`0 1 ${width.price}`}>Price</Table.TextHeaderCell>
                        <Table.TextHeaderCell flex ={`0 1 ${width.remove}`}>Remove</Table.TextHeaderCell>
                    </Table.Head>
                    <Table.Body>
                        {cartDisplay}
                        <Table.Row key='total' >
                            <Table.TextCell flex='1 1'></Table.TextCell>
                            <Table.TextCell ><h3>TOTAL: {cartTotal}</h3></Table.TextCell>
                        </Table.Row>
                    </Table.Body>
                </Table>
            </Pane>
            <div className='checkout-panel'>
                <h3>Checkout</h3>
                <Button disabled>Pay With Stripe</Button>
                <Button >Pay </Button>
            </div>
        </div>
    )
}

export default Cart