import React, { useEffect, useState } from 'react'
import {
    Table, toaster
}from 'evergreen-ui'
import { useSelector, useDispatch } from 'react-redux'
import * as req from '../../req'
import * as PurchaseActions from '../../redux/purchases/actions'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCopy, faExclamationTriangle, faCheckCircle, faCaretDown, faChalkboardTeacher } from '@fortawesome/free-solid-svg-icons'
import './style.css'
const Purchases = (props) =>{
    const purchases = useSelector(state => state.purchases)
    const lessons = useSelector(state => state.lessons.data)
    const d = useDispatch()
    const [ddState, setDD] = useState({lessons: {}, history: {}})
    const toggleDD = (dd, i) =>{
        let newState = {...ddState}
        newState[dd][i] = newState[dd].hasOwnProperty(i)? !newState[dd][i] : true
        setDD(newState)
    }
    const callAPI = async()=>{
        d(PurchaseActions.setIsLoading(true))
        let res = await req.get('/api/purchase')
        let purchases = res.data
        console.log(purchases)
        d(PurchaseActions.getPurchases(purchases))
        d(PurchaseActions.setIsLoading(false))
    }
    useEffect(()=>{
        callAPI()
    },[])
    const purchasesDisplay = purchases.purchases.map((purchase, i)=>{
        let msg = <></>
        switch(purchase.status){
            case 0:
                msg= (
                    <div className='purchase-status purchase-pending'>
                        <div className='FA-icon purchase-status-icon'>
                            <FontAwesomeIcon icon ={faExclamationTriangle} />
                        </div>
                        <h3>Pending</h3>
                    </div>
                )
                break
            case 1:
                msg= (
                    <div className='purchase-status purchase-active'>
                        <div className='FA-icon purchase-status-icon'>
                            <FontAwesomeIcon icon ={faCheckCircle} />
                        </div>
                        <h3>Active</h3>
                    </div>
                )
                break
            default:
                msg= (
                    <div className='purchase-status purchase-error'>
                        <div className='FA-icon purchase-status-icon'>
                            <FontAwesomeIcon icon ={faExclamationTriangle} />
                        </div>
                        <h3>Error</h3>
                    </div>
                )
                break
        }
        let lessonsDisplay = purchase.Lessons.map((emptyLesson) =>{
            let lessonId = emptyLesson.id
            let lesson = lessons.find((l) =>{
                console.log(l.id, lessonId)
                return l.id === lessonId
            }) || {}
            console.log(lesson)
            return(
                <div className='purchase-dd-flex purchase-dd-flex-row'>
                    <div className='purchase-dd-flex-item' style={{flex:0}}>
                        <div className='FA-icon purchase-lesson-icon'><FontAwesomeIcon icon={faChalkboardTeacher}/></div>
                    </div>
                    <div className='purchase-dd-flex-item' style={{width:'25%', flex:'0 1 25%'}}>
                        <h3>{lesson.name}</h3>
                    </div>
                    <div className='purchase-dd-flex-item'>
                        <h3>{lesson.description}</h3>
                    </div>
                    <div className='purchase-dd-flex-item' style={{width:'13%', flex:0}}>
                        <h3>{lesson.price}</h3>
                    </div>
                </div> 
                
            )
        })
        return (
            <div className='purchase-item-container'>
                <div className='purchase-item-flex'>
                    <div className='purchase-item purchase-code'>
                        <div className='FA-icon copy-icon'>
                            <FontAwesomeIcon icon={faCopy} onClick={()=>{navigator.clipboard.writeText(purchase.code) ; toaster.success('code copied to clipboard')}} />
                        </div>
                        {purchase.code}
                    </div>
                    <div className='purchase-item purchase-status'>
                        {msg}
                    </div>
                    <div className='purchase-item purchase-price'>
                        {purchase.price || 'null'}
                    </div>
                </div>
                <div className={`lesson-dd lesson-dd ${ddState.lessons[i]? 'open-dd' : ''}`} onClick={()=>{toggleDD('lessons', i)}}>
                    <h3>Lessons</h3>
                    <div className='FA-icon dd-icon'><FontAwesomeIcon icon={faCaretDown}/></div>
                </div>
                <div className={`lesson-dd-menu lesson-dd-menu ${ddState.lessons[i]? 'lesson-dd-menu-show' : ''}`}>
                    <div>
                        <div className='purchase-dd-flex purchase-dd-header'>
                            <div className='purchase-dd-flex-item' style={{flex: 0, width: '1.5em'}}>
                                <div className='FA-icon purchase-lesson-icon'></div>
                            </div>
                            <div className='purchase-dd-flex-item' style={{width:'25%', flex:'0 1 25%'}}>
                                <h3>Name</h3>
                            </div>
                            <div className='purchase-dd-flex-item'>
                                <h3>Description</h3>
                            </div>
                            <div className='purchase-dd-flex-item' style={{width:'13%', flex:0}}>
                                <h3>Price</h3>
                            </div>
                        </div>
                        {lessonsDisplay}
                    </div>
                </div>
                <div className={`history-dd lesson-dd ${ddState.history[i]? 'open-dd' : ''}`} onClick={()=>{toggleDD('history', i)}}>
                    <h3>History</h3>
                    <div className='FA-icon dd-icon'><FontAwesomeIcon icon={faCaretDown}/></div>
                </div>
            </div>
        )
    })
    return (
        <div className='content-purchase content-page'>
            <h1 className='content-header'>Purchases</h1>
            <div className='purchase-wrapper'>
                <div className='purchase-body content-body'>
                    <h1 style={{textAlign:'left', width: '100%', marginLeft:'10px'}}>My Purchases</h1>
                    <div className='purchase-header content-table-head'>
                        <div className='purchase-header-flex header-flex'>
                            <div className='purchase-header-item purchase-code'>
                                <h3>code</h3>
                            </div>
                            <div className='purchase-header-item purchase-status'>
                                <h3>status</h3>
                            </div>
                            <div className='purchase-header-item purchase-price'>
                                <h3>price</h3>
                            </div>
                        </div>                
                    </div>
                    {purchases.length == 0?
                        <div className='purchase-empty'>
                            <h3>You have not made any purchases</h3>
                        </div>
                    :
                        purchasesDisplay
                    }
                </div>
            </div>
        </div>
    )
}

export default Purchases