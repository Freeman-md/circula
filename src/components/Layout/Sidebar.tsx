
import ContactsPane from '../ContactsPane'
import SearchPane from '../SearchPane'

interface Props {
    classes?: string
}

const Sidebar = ({ classes = 'h-screen w-1/4' }: Props) => {
    return <div className={[classes, 'container flex flex-col space-y-4 py-10'].join(' ')}>
        <SearchPane />
        <ContactsPane />
    </div>
}

export default Sidebar