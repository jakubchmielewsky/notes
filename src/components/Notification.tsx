import { ReactComponent as SuccessIcon } from "../assets/images/icon-checkmark.svg";
import { ReactComponent as CloseIcon } from "../assets/images/icon-cross.svg";
import { useNotificationsStore } from "../stores/NotificationsStore";
import { NotificationType } from "../types/types";

interface Props{
    notificationData: NotificationType,
    duration: number,
}

const Notification: React.FC<Props> = ({notificationData, duration}) => {
    const {removeNotification} = useNotificationsStore();

    setTimeout(()=>{
        removeNotification(notificationData.id);
    },duration-10);
    return ( 
        <div className= "flex justify-between bg-white mt-100 border-custom-neutral-200 dark:bg-custom-neutral-800 rounded-8 border-1 dark:border-custom-neutral-700 py-100 px-100 animate-notificationAnimation"
        style={{animation: `notificationAnimation ${duration/1000}s linear`}}
        >
                        <div className="flex gap-100">
                            <SuccessIcon className="text-custom-green-500"/> 
                            <p className="text-custom-neutral-950 dark:text-white">
                                {notificationData.message}
                            </p>
                        </div>
                        <button onClick={()=>removeNotification(notificationData.id)}>
                            <CloseIcon className="text-custom-neutral-400"/>
                        </button>
                    </div>
     );
}
 
export default Notification;