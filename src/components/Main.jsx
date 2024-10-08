import { NavLink, useNavigate } from 'react-router-dom'

function Main({ children }) {
    const navigate = useNavigate()

    function handlLogin(e) {
        e.preventDefault()
        const request = window.confirm("Loginga qaytishni hohlaysizmi?")
        if (request) {
            navigate('/login')
            localStorage.removeItem('token')
            localStorage.removeItem('user')
        }
    }

    function handlClick(event) {
        event.preventDefault()
        navigate('/')
    }
    return (
        <div className='flex flex-wrap flex-col'>
            <header className='container bg-green-700  fixed'>
                <nav className='max-w-[1400px] p-5 mx-auto flex justify-between'>
                    <button onClick={handlClick} className='text-3xl text-white font-bold cursor-pointer'>Books</button>
                    <div className='flex items-center gap-8 font-semibold text-xl text-white'>
                        <NavLink to='/'>Home</NavLink>
                    </div>
                    <button onClick={handlLogin} className='bg-green-100 shadow-lg shadow-green-700/50 text-green hover:bg-green-400   py-2 px-5 text-lg font-semibold rounded-md capitalize'>Log out</button>
                </nav>
            </header>
            <div className='w-full'> {children} </div>
            <footer class="bg-gray-800 text-white py-4">
                <div class="container mx-auto text-center">
                    <p class="text-sm">© 2024 Sizning kompaniya nomingiz. Barcha huquqlar himoyalangan.</p>
                    <div class="mt-2">
                        <a href="#" class="text-gray-400 hover:text-gray-300 mx-2">Shartlar</a>
                        <a href="#" class="text-gray-400 hover:text-gray-300 mx-2">Maxfiylik siyosati</a>
                        <a href="#" class="text-gray-400 hover:text-gray-300 mx-2">Biz bilan bog'lanish</a>
                    </div>
                </div>
            </footer>

        </div>
    )
}

export default Main
