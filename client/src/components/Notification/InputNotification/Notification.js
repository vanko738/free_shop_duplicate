
import style from './Notification.module.css'

export default function Notification(props) {
 
    
    return (
        <div className={style.errors}>
            <p>{props.children}</p>
        </div>
    )
}
