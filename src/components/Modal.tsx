import { ReactElement } from "react";

interface ModalProps{
    icon: ReactElement,
    title: string,
    description: string,
    buttonColor: string,
    onClick: () => React.MouseEvent,
}

const Modal: React.FC<ModalProps> = ({icon, title, description, buttonColor, onClick}) => {
    return ( 
        <div>
            modal
        </div>
     );
}
 
export default Modal;