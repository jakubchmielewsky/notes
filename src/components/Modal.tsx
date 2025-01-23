
interface ModalProps{
    icon: React.FC<React.SVGProps<SVGSVGElement>> | null,
    title: string,
    description: string,
    buttonColor: string,
    onSubmit: () => void,
    resetModal: () => void,
}

const Modal: React.FC<ModalProps> = ({icon: Icon, title, description, buttonColor, onSubmit, resetModal}) => {
    console.log(buttonColor);
    return ( 
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 px-150">
            <div className="max-w-[440px] bg-white rounded-12 border-1 border-custom-neutral-200 divide-y-1 divide-custom-neutral-200 dark:bg-custom-neutral-700 dark:border-custom-neutral-600 dark:divide-custom-neutral-600">
                {/* top */}
                <div className="flex px-200 py-200 gap-150">
                    <div className="bg-custom-neutral-100 min-w-[40px] h-[40px] rounded-8 flex justify-center items-center dark:bg-custom-neutral-600">
                        {Icon && <Icon className="w-[24px] h-[24px] dark:text-white"/>}
                    </div>
                    <div className="flex flex-col gap-[6px]">
                        <h4 className="text-preset-3 font-bold text-custom-neutral-950 dark:text-white">{title}</h4>
                        <p className="text-preset-5 text-custom-neutral-950 dark:text-custom-neutral-200">{description}</p>
                    </div>

                </div>

                {/* bottom */}
                <div className="flex gap-150 px-200 py-150 justify-end">
                   
                        {/* secondary button */}
                        <button className="bg-custom-neutral-100 dark:bg-custom-neutral-500 text-custom-neutral-600 dark:text-custom-neutral-200 px-200 py-150 rounded-8 text-preset-4 hover:bg-transparent border border-transparent hover:border-custom-neutral-300 focus:border-custom-neutral-950 dark:focus:border-white focus:outline outline-offset-2 outline-2 outline-custom-neutral-400" onClick={resetModal}>
                            Cancel
                        </button>

                         {/* primary button */}
                        <button className={`w-[117px] bg-${buttonColor} px-200 py-150 rounded-8 text-preset-4 text-white focus:outline outline-offset-2 outline-2 outline-custom-neutral-400`} onClick={()=>{onSubmit(); resetModal();}}>
                                {title}
                        </button>
                </div>

            </div>
        </div>
     );
}
 
export default Modal;