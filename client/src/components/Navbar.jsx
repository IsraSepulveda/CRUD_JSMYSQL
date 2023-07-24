import {Link} from 'react-router-dom'

function Navbar() {
    return (
        <div className='bg-zinc-700 flex justify-between px-20 py-4'>
            <Link to="/" className="text-white">
              <h1>React MySQL</h1>
            </Link>
            <ul className='flex gap-x-2'>
                <li>
                    <Link to="/" className="text-white px-2 py-1">Home</Link>
                </li>
                <li>
                    <Link to="/new" className="text-white px-2 py-1">Create task</Link>
                </li>
            </ul>
        </div>
    )
}

export default Navbar;