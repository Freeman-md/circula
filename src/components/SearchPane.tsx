import { ChangeEventHandler } from 'react'
import { ReactComponent as SearchIcon } from '../assets/svgs/search.svg'

const SearchPane = ({ onChangeHandler } : { onChangeHandler: ChangeEventHandler<HTMLInputElement> }) => {

    return <div className="mx-2 rounded-full px-4 py-2 flex space-x-3 items-center bg-secondary/10">
        <SearchIcon className="w-8 text-secondary" />
        <input type="text" className='w-full bg-transparent border-none outline-none focus:border-none focus:outline-none focus:ring-0 placeholder:text-secondary/50 text-secondary' placeholder='Search contacts...' onChange={onChangeHandler} />
    </div>
}

export default SearchPane