import React, {useState} from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {
    Icon,
    EditIcon,
    PlusIcon,
    MinusIcon,
    toaster,
    LearningIcon,
    Pane,
    ShoppingCartIcon
} from 'evergreen-ui'
import LessonEdit from './LessonEdit'
import * as cartActions from '../../redux/cart/actions'
import { faChalkboardTeacher } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import './style.css'
import {
    Link
  } from "react-router-dom"
const LessonItem = (props) =>{
    const {lesson, isHovered, hoverCB, editCB, isAdmin} = props
    const d = useDispatch()
    const cart = useSelector(state=> state.cart)
    const [TBHovered, setTBHovered] = useState(false)
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
        <Pane className={`lesson-item-container ${isHovered? 'hovered': ''}`} elevation={isHovered? 1: 0}
            onMouseEnter={()=>{hoverCB(lesson.id)}}
            onMouseLeave={()=>{hoverCB(false)}}
        >
            <div className='FA-icon lesson-item-img'>
                <div className='lesson-item-svg'>
                    <Link to ={`/lessons/${lesson.id}/view`}>
                        <FontAwesomeIcon icon={faChalkboardTeacher} className='lesson-item-icon' />
                    </Link>
                </div>
            </div>
            <div className='lesson-item-info'>
                <div className='lesson-item-name'><h3>{lesson.name}</h3></div>
                <div className='lesson-item-description'><p>{lesson.description} THis is a long lesson description and you better believe we will resize text if its too small </p></div>
            </div>
            <div className='lesson-item-toolbar'>
                <Pane onMouseEnter={()=>{setTBHovered('Q')}} onMouseLeave={()=>{setTBHovered(false)}} elevation={TBHovered == 'Q' ? 1 : 0}>
                    <div className='lesson-item-semester lesson-toolbar-item'>
                        <div className='lesson-toolbar-left'>
                            Q:
                        </div>
                        <div className='lesson-toolbar-right'>
                            fall
                        </div>
                    </div>
                </Pane>
                <Pane onMouseEnter={()=>{setTBHovered('price')}} onMouseLeave={()=>{setTBHovered(false)}} elevation={TBHovered == 'price' ? 1 : 0}>
                    <div className='lesson-item-price' lesson-toolbar-item>
                        <div className='lesson-toolbar-left'>
                        </div>
                        <div className='lesson-toolbar-right'>          
                            ${lesson.price}
                        </div>
                    </div>
                </Pane>
                {isAdmin?
                    <div className='lesson-item-edit lesson-toolbar-item'>
                        <div className='lesson-toolbar-left'>
                            <Icon icon={ShoppingCartIcon} />
                        </div>
                        <div className='lesson-toolbar-right'>
                            <Icon onClick={()=>editCB(lesson.id)} icon={EditIcon} size={20}/>
                        </div>
                    </div>
                :
                    <Pane onMouseEnter={()=>{setTBHovered('cart')}} onMouseLeave={()=>{setTBHovered(false)}} elevation={TBHovered == 'cart' ? 1 : 0}>
                        <div className='lesson-item-add lesson-toolbar-item'>
                            <div className='lesson-toolbar-left'>
                                <Icon icon={ShoppingCartIcon} size={20}/>
                            </div>
                            <div className='lesson-toolbar-right'>
                                {cart.lessons.includes(lesson.id)?
                                    <Icon onClick={()=>{removeFromCart(lesson.id)}} icon={MinusIcon} size={20}/>
                                    :
                                    <Icon onClick={()=>{addToCart(lesson.id)}} icon={PlusIcon} size={20}/>
                                }
                            </div>
                        </div>
                    </Pane>
                }
            </div>
        </Pane>
        </>
    )
}

export default LessonItem