"use client"
import { useDispatch, useSelector } from 'react-redux';
import { login, logout } from '@/store/authSlice';
import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function Home() {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
const [mounted, setMounted] = useState(false);
   useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
          
    <div className="w-100  d-flex justify-content-center ">
  {!isLoggedIn ? (
    <div className="col-md-4">
      <form className="border rounded p-4 shadow bg-white">
        <dl>
          <dt>Enter Mobile Number</dt>
          <dd>
            <input type="text" className="form-control" />
          </dd>
          <dt>Enter Mobile Password</dt>
          <dd>
            <input type="password" className="form-control" />
          </dd>
        </dl>
        <Link
          href="/profile"
          className="btn btn-success w-100"
          onClick={() => dispatch(login())}
        >
          Login
        </Link>
      </form>
    </div>
  ):
  <div className='d-flex mt-2'>
    <div>
       <button className="btn btn-danger w-100 " onClick={() => dispatch(logout())}>
                    Logout
                  </button>
    </div>
   
                  <Link href="/profile" className='btn btn-success mx-2'>Profile</Link>
                   <Link href="/edit-profile" className='btn btn-success mx-2'>Edit Profile</Link>
  </div>
  }
</div>

  );
}
