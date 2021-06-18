import React from 'react'
import {
    Table
}from 'evergreen-ui'
import { useSelector, useDispatch } from 'react-redux'

const Purchases = (props) =>{
    const purchases = useSelector(state => state.purchases)
    const purchasesDisplay = purchases.purchases.map((purchase)=>{
        return (
            <div></div>
        )
    })
    return (
        <div>
            <p>My Purchases: </p>
            <Table>
                <Table.Head>
                    <Table.TextHeaderCell>Code</Table.TextHeaderCell>
                    <Table.TextHeaderCell>Total Price</Table.TextHeaderCell>
                </Table.Head>
                <Table.Body>

                </Table.Body>
            </Table>
        </div>
    )
}

export default Purchases