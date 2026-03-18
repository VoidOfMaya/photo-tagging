import levelOne from '../../assets/photos/Waldo-Underground.jpg'
import style from './home.module.css'
import { useState } from 'react'
const Home =()=>{
    const [position, setPostion] = useState({x: null,y: null})

    const updatePosition=(e)=>{
        const react = e.target.getBoundingClientRect();
        const x = e.clientX - react.left;
        const y = e.clientY - react.top;
        setPostion({x:x, y:y});
    }

    return(
        <div>
            <img    
                src={levelOne}
                className={style.photoCanvas}    
                onClick={e=>{updatePosition(e)}}
            ></img>
            <div>x:{position.x}</div>
            <div>Y:{position.y}</div>
            <div style={{width: '50px',
                         height: '50px',
                         border: `2px solid red`,
                         position: 'absolute',
                         left: `${position.x- 53/2}px`,
                         top: `${position.y+ 53/2}px`,
                        }}></div>
        </div>
    )
}
export{
    Home
}