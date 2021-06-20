import React, {useEffect, useState} from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {
    Icon,
    EditIcon,
    PlusIcon,
    MinusIcon,
    toaster,
    LearningIcon,
    Pane,
    ShoppingCartIcon,
    TickCircleIcon
} from 'evergreen-ui'
import * as cartActions from '../../redux/cart/actions'
import { faChalkboardTeacher } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import './style.css'
import {
    Link
  } from "react-router-dom"
const LessonItem = (props) =>{
    const {lesson, isHovered, hoverCB = ()=>{}, editCB = ()=>{}, isAdmin = false, roundedBorder = 1, cartDisplay = false} = props
    const d = useDispatch()
    const cart = useSelector(state=> state.cart)
    const purchased = useSelector(state=> state.lessons.purchasedLessons)
    const [TBHovered, setTBHovered] = useState(false)
    let borderClass = ''
    switch(roundedBorder){
        case 0:
            borderClass = ''
            break
        case 1:
            borderClass = 'rounded-left'
            break
        case 2:
            borderClass = 'rounded-right'
            break
        case 3:
            borderClass = 'rounded-left rounded-right'
            break
        default:
            break
    }
    console.log(borderClass, roundedBorder)
    const addToCart = (id) =>{
        d(cartActions.addCart(id))
        toaster.success('item added to cart')
    }
    const removeFromCart = (id)=>{
        d(cartActions.removeCart(id))
        toaster.success('item removed from cart')
    }
    const CartIcon = ({handleClick, icon}) =>(
        <Pane onClick={handleClick} onMouseEnter={()=>{setTBHovered('cart')}} onMouseLeave={()=>{setTBHovered(false)}}>
            <div className='lesson-item-add lesson-toolbar-item'>
                <div className='lesson-toolbar-left'>
                    <Icon icon={ShoppingCartIcon} size={20}/>
                </div>
                <div className='lesson-toolbar-right'>
                    <Icon icon={icon} size={20}/>
                </div>
            </div>
        </Pane>

    )
    return(
        <>
        <Pane className={`lesson-item-container ${borderClass} ${isHovered? 'hovered': ''}`} elevation={isHovered? 1: 0}
            onMouseEnter={()=>{hoverCB(lesson.id)}}
            onMouseLeave={()=>{hoverCB(false)}}
        >
            <div className = 'lesson-item-top'>
                <div className='FA-icon lesson-item-img'>
                    <div className='lesson-item-svg'>
                        <Link to ={`/lessons/${lesson.id}/view`}>
                            <FontAwesomeIcon icon={faChalkboardTeacher} className='lesson-item-icon' />
                        </Link>
                    </div>
                </div>
                <div className='lesson-item-info'>
                    <div className='lesson-item-name'><h3>{lesson.name}</h3></div>
                    {!cartDisplay &&
                        <div className='lesson-item-description'><p>{lesson.description} THis is a long lesson description and you better believe we will resize text if its too small </p></div>
                    }
                </div>
            </div>
            <div className='lesson-item-toolbar'>
                {!cartDisplay &&
                    <Pane onMouseEnter={()=>{setTBHovered('Q')}} onMouseLeave={()=>{setTBHovered(false)}} >
                        <div className='lesson-item-semester lesson-toolbar-item'>
                            <div className='lesson-toolbar-left'>
                                Q:
                            </div>
                            <div className='lesson-toolbar-right'>
                                fall
                            </div>
                        </div>
                    </Pane>
                }
                <Pane onMouseEnter={()=>{setTBHovered('price')}} onMouseLeave={()=>{setTBHovered(false)}}>
                    <div className='lesson-item-price lesson-toolbar-item'>
                        <div className='lesson-toolbar-left'>
                        </div>
                        <div className='lesson-toolbar-right'>          
                            {cartDisplay? '': ''}${lesson.price}
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
                purchased.hasOwnProperty(lesson.id)?
                    <CartIcon icon={TickCircleIcon} handleClick={()=>{}} />
                :cart.lessons.includes(lesson.id)?
                    <CartIcon icon={MinusIcon} handleClick={()=>{removeFromCart(lesson.id)}} />
                    :
                    <CartIcon icon={PlusIcon} handleClick={()=>{addToCart(lesson.id)}} />
                
                }
            </div>
        </Pane>
        </>
    )
}

export default LessonItem