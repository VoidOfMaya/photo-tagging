import { Dropdown } from '../dropdown/dropdown.jsx'
import levelOne from '../../assets/photos/Waldo-Underground.jpg'
import style from './home.module.css'
import { useEffect, useRef, useState } from 'react'
import { GameStart } from '../startDialog/dialog.jsx'
import { TargetCard } from '../targetList/targets.jsx'
const Home =()=>{
    //refs
    const imgRef = useRef(null);
    const pRef = useRef({T:{X: null,Y:null},S:{W:null,H:null}})
    //states
    const [targets, setTargets] = useState([
        {name: 'waldo', photo: '', isSelected: false}, 
        {name: 'wanda', photo: '', isSelected: false}, 
        {name: 'odlaw', photo: '', isSelected: false}
    ])
    const [target, setTarget] = useState(false);
    const [data, setData]= useState({
        // outgoing to backend
            currentTX: 0,
            currentTY: 0,
            currentSX: 0,
            currentSY: 0,  
            targetName: null,   
            playerName: null,
        // rendering purposes
            position: {X: null, Y: null}  
    })
    const selectHandler=(e)=>{
        const img = imgRef.current.getBoundingClientRect();

        const x = e.clientX;
        const y = e.clientY;
        
        pRef.current = {
            T:{
                X: x-img.left, 
                Y: y-img.top
            },
            S:{
                W:img.width,
                H:img.height
            }
        }
        setData(prev =>({ 
                ...prev,  
                currentTX: x - img.left,
                currentTY: y - img.top,
                currentSX: img.width,
                currentSY: img.height, 
                position: {X: pRef.current.T.X, Y:pRef.current.T.Y}
            })
        )
        setTarget(true)
    }
    const targetHandler = (target)=>{
        console.log(target)
        setData(prev =>({
            ...prev,
            targetName:target
        }))
    }
    const populateTargets = (targets)=>{
        return targets.map ((t, i) =>{
            console.log(t)
            return(
                <TargetCard target={t} key={i}/>
            )
        })
    }
    useEffect(()=>{
        const updateSize=()=>{

            if(!imgRef.current && !pRef.current.T.X)return;
            const img =imgRef.current.getBoundingClientRect();
            pRef.current = {
                T:{
                    // X:pRef.current.T.X/pRef.current.S.W * img.width
                    // Y:pRef.current.T.Y/pRef.current.S.H  * img.height 
                    X:pRef.current.T.X/pRef.current.S.W * img.width ,
                    Y:pRef.current.T.Y/pRef.current.S.H  * img.height 
                },
                S:{
                    W:img.width,
                    H:img.height
                }
            }
            setData(prev=>({
                ...prev,
                currentSX: img.width,
                currentSY: img.height,
                position:{ 
                    X:  pRef.current.T.X , 
                    Y:  pRef.current.T.Y 
                }
            })) 
            if(data.position.X !== null) setTarget(true);
        };
        updateSize()
        window.addEventListener('resize',updateSize);
        return ()=> window.removeEventListener('resize',updateSize);
    },[])
    //<GameStart ref={dlgRef} start={handleStart}/>
    return(
        <div className={style.waldoContainer}>     
            <img  
                ref={imgRef}  
                src={levelOne}
                className={style.photoCanvas}    
                onClick={e=>{selectHandler(e)}}
            ></img>
            <p style={{fontSize: '12px', color: 'gray', margin: 0}}>
                Target:[N: {data.targetName} || X:{data.position.X} || Y:{data.position.Y}] 
                Screen:[W:{data.currentSX} || H:{data.currentSY}]  
            </p>
            {target?(            
                <div style={{width: '50px',
                            height: '50px',
                            border: `2px solid red`,
                            borderRadius: '25px',
                            position: 'absolute',
                            left: `${data.position.X - 53/2}px`,
                            top: `${data.position.Y - 53/2}px`,
                            }}>
                </div>                
            ):(
                <></>
            )}
            <section >
                <div className={style.targetContainer}>
                    {populateTargets(targets)}
                </div>
            </section>

            
        </div>
    )
}
export{
    Home
}