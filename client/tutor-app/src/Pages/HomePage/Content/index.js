import React from 'react'
import { 
    Pane,

} from 'evergreen-ui'
import Feature from './Feature'
import './style.css'
const Content = (props) =>{

    const featuresData = [
        {
            img: 'https://www.pngitem.com/pimgs/m/30-307416_profile-icon-png-image-free-download-searchpng-employee.png',
            title: 'My Bio',
            body: "Heres some lorem ipsum. et dolore magna aliqua. Posuere lorem ipsum dolor sit. Phasellus faucibus scelerisque eleifend donec pretium. Cursus in hac habitasse platea dictumst quisque sagittis purus. Vel risus commodo viverra maecenas accumsan. Odio eu feugiat pretium nibh ipsum consequat nisl vel. Nunc pulvinar sapien et ligula ullamcorper. Cursus euismod quis viverra nibh cras pulvinar mattis nunc. Sed tempus urna et pharetra pharetra massa massa ultricies. Egestas purus viverra accumsan in nisl nisi scelerisque eu. Facilisis sed odio morbi quis. Ac turpis egestas sed tempus urna et pharetra pharetra massa. Porta non pulvinar neque laoreet suspendisse interdum consectetur libero. Nunc scelerisque viverra mauris in aliquam sem. Molestie at elementum eu facilisis sed odio. Ut enim blandit volutpat maecenas volutpat blandit aliquam etiam erat. Auctor eu augue ut lectus arcu bibendum at varius vel. Velit scelerisque in dictum non consectetur a erat nam. Sem integer vitae justo eget magna fermentum. Feugiat pretium nibh ipsum consequat nisl vel pretium."
        },
        {
            img: 'https://thumbs.dreamstime.com/z/blue-merle-border-collie-looking-up-camera-beautiful-female-its-pretty-eyes-shallow-depth-field-blurs-44928308.jpg',
            title: 'Facts about My dog',
            body: "This is not my dog but it looks like her, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Posuere lorem ipsum dolor sit. Phasellus faucibus scelerisque eleifend donec pretium. Cursus in hac habitasse platea dictumst quisque sagittis purus. Vel risus commodo viverra maecenas accumsan. Odio eu feugiat pretium nibh ipsum consequat nisl vel. Nunc pulvinar sapien et ligula ullamcorper. Cursus euismod quis viverra nibh cras pulvinar mattis nunc. Sed tempus urna et pharetra pharetra massa massa ultricies. Egestas purus viverra accumsan in nisl nisi scelerisque eu. Facilisis sed odio morbi quis. Ac turpis egestas sed tempus urna et pharetra pharetra massa. Porta non pulvinar neque laoreet suspendisse interdum consectetur libero. Nunc scelerisque viverra mauris in aliquam sem. Molestie at elementum eu facilisis sed odio. Ut enim blandit volutpat maecenas volutpat blandit aliquam etiam erat. Auctor eu augue ut lectus arcu bibendum at varius vel. Velit scelerisque in dictum non consectetur a erat nam. Sem integer vitae justo eget magna fermentum. Feugiat pretium nibh ipsum consequat nisl vel pretium."
        }
    ]

    const featuresDisplay = featuresData.map((feature, i)=>{
        return (
            <Feature {...feature} key={i} isFlipped={i%2 == 1}/>
        )
    })
    return (
        <Pane className='content-homepage'>
            <div className='homepage-banner'>
            </div> 
            <div className='homepage-content'>
                {featuresDisplay}
            </div>
            <div className='footer'>

            </div>
        </Pane>
    )
}

export default Content