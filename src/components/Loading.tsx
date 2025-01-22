const Loading = () => {
    return ( 
        <div className="w-screen h-screen bg-white dark:bg-custom-neutral-950 flex justify-center items-center">
            <div className="h-32 w-32 animate-spin rounded-full border-8 border-solid border-current border-e-transparent align-[-0.          125em] text-surface motion-reduce:animate-[spin_1.5s_linear_infinite] text-custom-neutral-500  dark:text-custom-neutral-300"
             role="status"
             >
                <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">Loading...</span>
        </div>
        </div>
        
     );
}
 
export default Loading;