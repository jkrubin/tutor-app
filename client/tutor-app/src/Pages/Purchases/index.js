import React, { useEffect, useState } from 'react'
import {
    Table, toaster, Button
}from 'evergreen-ui'
import { useSelector, useDispatch } from 'react-redux'
import * as req from '../../req'
import * as PurchaseActions from '../../redux/purchases/actions'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCopy, faExclamationTriangle, faCheckCircle, faCaretDown, faChalkboardTeacher, faHistory } from '@fortawesome/free-solid-svg-icons'
import './style.css'
const Purchases = (props) =>{
    const purchases = useSelector(state => state.purchases)
    const lessons = useSelector(state => state.lessons.data)
    const auth = useSelector(state => state.auth)
    const isAdmin = auth.user.admin == true
    const d = useDispatch()
    const [ddState, setDD] = useState({lessons: {}, history: {}})
    const toggleDD = (dd, i) =>{
        let newState = {...ddState}
        newState[dd][i] = newState[dd].hasOwnProperty(i)? !newState[dd][i] : true
        setDD(newState)
    }
    const callAPI = async()=>{
        d(PurchaseActions.setIsLoading(true))
        let res = null
        if(isAdmin){
            res = await req.get('/api/purchase/admin')
        }else{
            res = await req.get('/api/purchase')
        }
        let purchases = res.data
        d(PurchaseActions.getPurchases(purchases))
        d(PurchaseActions.setIsLoading(false))
    }
    useEffect(()=>{
        callAPI()
    },[])
    const getDisplayFromStatus = (status) =>{
        switch(status){
            case 0:
                return(
                    <div className='purchase-status purchase-pending'>
                        <div className='FA-icon purchase-status-icon'>
                            <FontAwesomeIcon icon ={faExclamationTriangle} />
                        </div>
                        <h3>Pending</h3>
                    </div>
                )
            case 1:
                return(
                    <div className='purchase-status purchase-active'>
                        <div className='FA-icon purchase-status-icon'>
                            <FontAwesomeIcon icon ={faCheckCircle} />
                        </div>
                        <h3>Active</h3>
                    </div>
                )
            default:
                return(
                    <div className='purchase-status purchase-error'>
                        <div className='FA-icon purchase-status-icon'>
                            <FontAwesomeIcon icon ={faExclamationTriangle} />
                        </div>
                        <h3>Error</h3>
                    </div>
                )
        } 
    }
    const activatePurchase = async (code) =>{
        d(PurchaseActions.setIsLoading(true))
        let res = await req.put(`/api/purchase/${code}/validate`)
        let updatedPurchase = res.data
        d(PurchaseActions.updatePurchase(updatedPurchase))
        d(PurchaseActions.setIsLoading(false))
    }
    const purchasesDisplay = purchases.purchases.map((purchase, i)=>{
        let msg = getDisplayFromStatus(purchase.status)
        let lessonsDisplay = purchase.Lessons.map((emptyLesson) =>{
            let lessonId = emptyLesson.id
            let lesson = lessons.find((l) =>{
                return l.id === lessonId
            }) || {}
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
        let historyDisplay = purchase.history.history.reverse().map((item) =>{
            let statusDisplay = getDisplayFromStatus(item.status)
            let date = new Date(item.date)
            let dateDisplay = `${date.getMonth()}/${date.getDate()}/${date.getFullYear()}`
            return(
                <div className='purchase-dd-flex purchase-dd-flex-row'>
                    <div className='purchase-dd-flex-item' style={{flex:0}}>
                        <div className='FA-icon purchase-lesson-icon'><FontAwesomeIcon icon={faHistory}/></div>
                    </div>
                    <div className='purchase-dd-flex-item' style={{width:'25%', flex:'0 1 25%'}}>
                        <h3>{item.action}</h3>
                    </div>
                    <div className='purchase-dd-flex-item'>
                        <h3>{statusDisplay}</h3>
                    </div>
                    <div className='purchase-dd-flex-item' style={{width:'22%', flex:0}}>
                        <h3>{dateDisplay}</h3>
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
                    {isAdmin &&
                        <div className='purchase-item purchase-price'>
                            {purchase.user.name || 'null'}
                        </div>
                    }
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
                <div className={`lesson-dd-menu lesson-dd-menu ${ddState.history[i]? 'lesson-dd-menu-show' : ''}`}>
                    <div>
                        <div className='purchase-dd-flex purchase-dd-header'>
                            <div className='purchase-dd-flex-item' style={{flex: 0, width: '1.5em'}}>
                                <div className='FA-icon purchase-lesson-icon'></div>
                            </div>
                            <div className='purchase-dd-flex-item' style={{width:'25%', flex:'0 1 25%'}}>
                                <h3>Action</h3>
                            </div>
                            <div className='purchase-dd-flex-item'>
                                <h3>Status</h3>
                            </div>
                            <div className='purchase-dd-flex-item' style={{width:'22%', flex:0}}>
                                <h3>Date</h3>
                            </div>
                        </div>
                        {historyDisplay}
                    </div>
                </div>
                {isAdmin &&
                    <div className='purchase-admin-bar'>
                        <h3>Manually Activate Purchase</h3>
                        <Button isLoading={purchases.isLoading} onClick={()=>{activatePurchase(purchase.code)}} className='main-button' disabled={purchase.status === 1}>Activate</Button>
                    </div>
                }
            </div>
        )
    })
    return (
        <div className='content-purchase content-page'>
            <h1 className='content-header'>Purchases</h1>
            <div className='purchase-wrapper'>
                <div className='purchase-body content-body'>
                    <h1 style={{textAlign:'left', width: '100%', marginLeft:'10px'}}>{isAdmin? 'All': 'My'} Purchases</h1>
                    <div className='purchase-header content-table-head'>
                        <div className='purchase-header-flex header-flex'>
                            <div className='purchase-header-item purchase-code'>
                                <h3>Code</h3>
                            </div>
                            <div className='purchase-header-item purchase-status'>
                                <h3>Status</h3>
                            </div>
                            <div className='purchase-header-item purchase-price'>
                                <h3>Price</h3>
                            </div>
                            {isAdmin &&
                                <div className='purchase-header-item purchase-price'>
                                    <h3>User</h3>
                                </div>
                            }
                        </div>                
                    </div>
                    {purchases.length == 0?
                        <div className='purchase-empty'>
                            <h3>You have not made any purchases</h3>
                        </div>
                    :
                        purchasesDisplay.reverse()
                    }
                </div>
            </div>
        </div>
    )
}

export default Purchases