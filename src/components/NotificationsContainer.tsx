import {useNotificationsStore} from "../stores/NotificationsStore";
import Notification from "./Notification";

interface Props{
    duration: number
}

const NotificationsContainer: React.FC<Props> = ({duration}) => {
    const {notifications} = useNotificationsStore();
    

    return ( 
        <div className="fixed w-[274px] tablet:w-[390px] bottom-[80px] tablet:bottom-[100px] desktop:bottom-[50px] right-200 tablet:right-400 desktop:right-[50px]">
            {notifications.map(notification => {
                return(
                    <Notification key={notification.id} notificationData={notification} duration={duration}/>
                )
            })}
        </div>
     );
}
 
export default NotificationsContainer;