import React from 'react'
import {
    Table,
    Pane,
    Icon,
    MinusIcon,
    Button
}from 'evergreen-ui'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import * as cartActions from '../../redux/cart/actions'
import LessonDisplay from '../Lessons/LessonDisplay'
//import {CartItem} from './CartItem'
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
    let cartTotal = 0
    let cartDisplay = cart.lessons.map((id) =>{
        let lesson = lessons.data.find(item=> item.id === id)
        if(!lesson){
            return null
        }
        cartTotal += Number.parseInt(lesson.price)
        return (
            <div className='cart-item'>
                <LessonDisplay lesson={lesson} roundedBorder={0} cartDisplay={true} />
            </div>
        )
    })

    return (
        <div className='content-cart content-page'>
            <h1 className='content-header'>Cart</h1>
            <div className='cart-wrapper'>
                <div className='cart-body content-body'>
                    <h1 style={{textAlign:'left', width: '100%', marginLeft:'10px'}}>My Cart - {cart.lessons.length} items</h1>
                    <div className='cart-header'>
                        <div className='cart-header-flex header-flex'>
                            <div className='cart-header-item header-lesson'>
                                <h3>Lesson</h3>
                            </div>
                            <div className='cart-header-item cart-header-sub-flex'>
                                <div className='header-price'>
                                    <h3>Price</h3>
                                </div>
                                <div className='header-remove'>
                                    <h3>Remove</h3>
                                </div>
                            </div>
                        </div>                
                    </div>
                    {cart.lessons.length == 0?
                        <div className='cart-empty'>
                            <h3>Go to <Link to='/lessons'>Lessons</Link> to add to your cart</h3>
                        </div>
                    :
                        cartDisplay
                    }
                    <div className='cart-header cart-footer'>
                        <div className='cart-header-flex header-flex'>
                            <div className='cart-header-item header-lesson'>
                                <h3>Total Price</h3>
                            </div>
                            <div className='cart-header-item cart-header-sub-flex'>
                                <div className='header-price'>
                                    <h3>{cartTotal}</h3>
                                </div>
                                <div className='header-remove'>
                                </div>
                            </div>
                        </div>                
                    </div>
                    <div className='cart-checkout'>
                        <div className='cart-checkout-flex'>
                            <div className='cart-checkout-item' style={{flex: 1}}>
                            </div>
                            <div className='cart-checkout-item'>
                                <Button disabled> Pay With Stripe</Button>
                            </div>
                            <div className='cart-checkout-item'>
                                <Button disabled={cart.lessons.length === 0}> Pay With Venmo</Button>
                            </div>
                        </div>
                    </div> 
                </div>
            </div>
        </div>
    )
}

export default Cart