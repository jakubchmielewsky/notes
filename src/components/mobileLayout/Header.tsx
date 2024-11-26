import { ReactComponent as Logo } from './../../assets/images/logo.svg';


const Header : React.FC = () => {

    return(
        <div className="w-full bg-custom-neutral-100 px-200 py-150 dark:bg-custom-neutral-800  tablet:py-200 tablet:px-400">
            <Logo className="dark:text-white"/>
        </div>
    )
} 

export default Header;