'use client';

import { useFormik } from 'formik';
import * as Yup from 'yup'
import { useDispatch, useSelector } from 'react-redux';
import { useQuery, useMutation } from '@tanstack/react-query';
import { setProfile } from '@/store/profileSlice';
import Loader from '@/loader/loader';
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { logout } from '@/store/authSlice';

export default function EditProfilePage() {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const router = useRouter()

  useEffect(() => {
    if (!isLoggedIn) {
      router.push('/profile'); 
    }
  }, [isLoggedIn, router]);

  if (!isLoggedIn) return null; 

  const [loading,setLoading] = useState(false)

  const { data, isLoading } = useQuery({
    queryKey: ['profile'],
    queryFn: () => fetch('/api/profile').then(res => res.json()),
  });

  const mutation = useMutation({
    mutationFn: (updated) =>
      fetch('/api/profile', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updated),
      }),
      onSuccess : async ()=>{
        toast.success("profile updated successfully")
        setTimeout(()=>{
        router.push('/profile');
        },2000)
        
      },
      onError: () => {
      toast.error('Failed to update profile');
    },
  });

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      name: data?.name || '',
      email: data?.email || '',
      phone: data?.phone || '',
      location: data?.location || '',
      bio: data?.bio || '',
    },
    validationSchema : Yup.object({phone:Yup.string().required().matches(/^[6-9]\d{9}$/,"Enter Vaild Mobile Number"),
        name:Yup.string().required(),
        email:Yup.string().email("Invalid email address").required("Email is required"),
    }),
    onSubmit: (values) => {
        setLoading(true)
      mutation.mutate(values);
      dispatch(setProfile(values));
    },
  });

  if (isLoading) return <Loader />

  return (
    <div className="container mt-4">
       
                  <div className='row'>
<h1 className="col-9">Edit Profile</h1>

 <button className="btn btn-danger col-2" onClick={() => dispatch(logout())}>
                    Logout
                  </button>
                  </div>
                  <hr></hr>
      
      <form onSubmit={formik.handleSubmit} className="row g-3">
        <div className="col-md-6">
          <label className="form-label">Name</label>
          <input
            type="text"
            name="name"
            className="form-control"
            value={formik.values.name}
            onChange={formik.handleChange}
          />
          {formik.errors && <p className="text-danger">{formik.errors.name}</p>}
        </div>

        <div className="col-md-6">
          <label className="form-label">Email</label>
          <input
            type="email"
            name="email"
            className="form-control"
            value={formik.values.email}
            onChange={formik.handleChange}
          />
          {formik.errors && <p className="text-danger">{formik.errors.email}</p>}
        </div>

        <div className="col-md-6">
          <label className="form-label">Phone</label>
          <input
            type="text"
            name="phone"
            className="form-control"
            value={formik.values.phone}
            onChange={formik.handleChange}
          />
          {formik.errors && <p className="text-danger">{formik.errors.phone}</p>}
        </div>

        <div className="col-md-6">
          <label className="form-label">Location</label>
          <input
            type="text"
            name="location"
            className="form-control"
            value={formik.values.location}
            onChange={formik.handleChange}
          />
        </div>

        <div className="col-12">
          <label className="form-label">Bio</label>
          <textarea
            name="bio"
            className="form-control"
            rows="3"
            value={formik.values.bio}
            onChange={formik.handleChange}
          ></textarea>
        </div>

        <div className="col-12">
          <button type="submit" className="btn btn-primary" disabled = {loading}>Save</button>
        </div>
      </form>
    </div>
  );
}
