import React from 'react'
import Img  from '../dash.jpg'
const Dashboard = () => {
    return (
        <div>
            <h1 style={{
                textAlign:"center",
                fontFamily:"cursive"
                }}> DashBoard page
                <div><img style={{height:"100%",width:'100%'}}src={Img} alt="pic"/></div>
            </h1>
            
        </div>
    )
}

export default Dashboard
