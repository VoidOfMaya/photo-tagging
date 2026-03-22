import { Dropdown } from '../dropdown/dropdown.jsx'
import levelOne from '../../assets/photos/Waldo-Underground.jpg'
import style from './home.module.css'
import { useEffect, useRef, useState } from 'react'
const Home =()=>{
    const imgRef = useRef(null);
   // const [position, setPostion] = useState({x: null,y: null})
    const [target, setTarget] = useState(false);
    const [data, setData]= useState({
        // outgoing to backend
            currentTX: 0,
            currentTY: 0,
            currentSX: 0,
            currentSY: 0,  
            targetId: null,   
        // rendering purposes
            position: {X: null, Y: null}  
    })

    const targetHandler=(e)=>{
        const img = imgRef.current.getBoundingClientRect();

        const x = e.clientX;
        const y = e.clientY;
        setData({   
                currentTX: x - img.left,
                currentTY: y - img.top,
                currentSX: img.width,
                currentSY: img.height, 
                targetId: 1,
                position: {X: x, Y:y}
            })

        setTarget(true)
    }
    const dropmenu = (targets, fn)=>{
        if(!target) return;
        return(
            <div style={{transform: 'translate(40px,40px)'}}>
                <Dropdown targets={targets} selectTarget={fn}
                position={data.position}
                />
            </div>
        )
    }

    useEffect(()=>{
        const updateSize=()=>{
            if(!imgRef.current)return;

            const img =imgRef.current.getBoundingClientRect();
            setData(prev=>({
                ...prev,
                currentSX: img.width,
                currentSY: img.height,
                position:{ 
                    X:  data.currentTX/data.currentSX * img.width , 
                    Y:  data.currentTY/data.currentSY * img.height 
                }
            })) 
        console.log(`old size and position: TX:${data.currentTX} TY:${data.currentTY} PX:${data.position.X} PY:${data.position.Y}`)
        console.log(`new size and position: TX:${img.width} TY:${img.height} PX:${data.currentTX/data.currentSX * img.width} PY:${data.currentTY/data.currentSY * img.height }`)

            if(data.position.X !== null) setTarget(true);
        };
       
        updateSize()
        window.addEventListener('resize',updateSize);
        return ()=> window.removeEventListener('resize',updateSize);
    },[])
    //console.log(data)
    return(
        <div className={style.waldoContainer}>     
            <img  
                ref={imgRef}  
                src={levelOne}
                className={style.photoCanvas}    
                onClick={e=>{targetHandler(e)}}
            ></img>
            <div>x:{data.position.X}</div>
            <div>Y:{data.position.Y}</div>
            {target?(
                
                <div style={{width: '50px',
                            height: '50px',
                            border: `2px solid red`,
                            borderRadius: '25px',
                            position: 'absolute',
                            left: `${data.position.X - 53/2}px`,
                            top: `${data.position.Y - 53/2}px`,
                            }}>{dropmenu(['waldo', 'waldina'])}
                </div>                
            ):(
                <></>
            )}

            
        </div>
    )
}
export{
    Home
}