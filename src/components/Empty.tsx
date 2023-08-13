import { ReactComponent as NoData } from '../assets/svgs/undraw-no-data.svg'

interface EmptyProps {
    message?: string | undefined;
    textColor?: string | undefined
}

const Empty = ({ message, textColor = 'text-secondary' }: EmptyProps) => {
    return <div className="flex flex-col space-y-4 items-center justify-center">
        <NoData className='w-32 ' />
        <p className={[textColor, "text-2xl text-center"].join(' ')}>{ message }</p>
    </div>
}

export default Empty