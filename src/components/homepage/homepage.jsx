import { Dropdown } from '../dropdown/dropdown.jsx'
import levelOne from '../../assets/photos/Waldo-Underground.jpg'
import style from './home.module.css'
import { useEffect, useRef, useState } from 'react'
const Home =()=>{
    const imgRef = useRef(null);
    const [position, setPostion] = useState({x: null,y: null})
    const [target, setTarget] = useState(false);

    const updatePosition=(e)=>{
        const react = e.target.getBoundingClientRect();
        const img = imgRef.current.getBoundingClientRect();
        const x = e.clientX - react.left;
        const y = e.clientY - react.top;
        console.log(`current target: \nx:${x}, y:${y}`)
        console.log(`canvase size: \nx:${img.width}, y:${img.height}`)
        setPostion({x:x, y:y});
        setTarget(true)
    }
    const dropmenu = ()=>{
        if(!target) return;
        return(
            <>
                <Dropdown targets={['waldo', 'waldina']}
                position={position}
                />
            </>
        )
    }

    useEffect(()=>{
        const updateSize=()=>{
            if(!imgRef.current)return;
            imgRef.current.getBoundingClientRect();
        };
        updateSize()
        window.addEventListener('resize',updateSize);
        return ()=> window.removeEventListener('resize',updateSize);
    },[])
    return(
        <div>
            
            <img  
                ref={imgRef}  
                src={levelOne}
                className={style.photoCanvas}    
                onClick={e=>{updatePosition(e)}}
                onChange={e=>{targetPostion(e)}}
            ></img>
            <div>x:{position.x}</div>
            <div>Y:{position.y}</div>
            <div style={{width: '50px',
                         height: '50px',
                         border: `2px solid red`,
                         position: 'absolute',
                         left: `${position.x- 53/2}px`,
                         top: `${position.y+ 53/2}px`,
                        }}>
            </div>
            {dropmenu()}
        </div>
    )
}
export{
    Home
}