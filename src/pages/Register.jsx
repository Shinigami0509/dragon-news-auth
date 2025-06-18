import { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../provider/AuthProvider';

const Register = () => {

    const { createNewUser, setUser, updateUserProfile } = useContext(AuthContext)
    const [error, setError] = useState([])
    const navigate =useNavigate()


    const handleSubmit = (e) => {
        e.preventDefault()
        // const name = e.target.name.value
        // const photo = e.target.photo.value
        // const email = e.target.email.value
        // const password = e.target.password.value
        const form = new FormData(e.target)
        const name = form.get('name')
        if (name.length < 5) {
            setError({ ...error, name: 'must be more than 5 character' })
            return
        }
        const photo = form.get('photo')
        const email = form.get('email')
        const password = form.get('password')
        // console.log({name,photo,email,password})     

        createNewUser(email, password)
            .then(res => {
                const user = res.user
                // console.log(user)
                setUser(user)
                updateUserProfile({displayName:name, photoURL:photo})
                .then(()=>{
                    navigate('/')
                })
                .catch(err=>console.log(err))
            })
            .catch(error => {
                const errorCode = error.code;
                const errorMessage = error.message;
                // console.log(errorCode, errorMessage)
            })

    }

    return (
        <div>
            <div className='min-h-screen flex justify-center items-center'>
                <div className="card bg-base-100 w-full max-w-lg shrink-0 rounded-none p-10">
                    <h2 className='text-2xl font-semibold text-center mt-5'>Register your account</h2>
                    <form onSubmit={handleSubmit} className="card-body">
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Your Name</span>
                            </label>
                            <input name='name' type="text" placeholder="Enter your name" className="input input-bordered" required />
                            {
                                error?.name && <label className='label text-sm text-red-400'>
                                    {error.name}
                                </label>
                            }
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Photo URL</span>
                            </label>
                            <input name='photo' type="text" placeholder="Enter Photo URL" className="input input-bordered" required />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Email</span>
                            </label>
                            <input name='email' type="email" placeholder="Enter Email" className="input input-bordered" required />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Password</span>
                            </label>
                            <input name='password' type="password" placeholder="Enter Password" className="input input-bordered" required />
                            <label className="label">
                                <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
                            </label>
                        </div>
                        <div className="form-control mt-6">
                            <button className="btn btn-neutral rounded-none">Register</button>
                        </div>
                    </form>
                    <p className="text-center font-semibold">
                        Already Have an Account? <Link className='text-red-400' to='/auth/login'>Login</Link></p>
                </div>
            </div>
        </div>
    );
};

export default Register;