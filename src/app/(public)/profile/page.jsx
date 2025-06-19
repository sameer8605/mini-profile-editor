import Link from "next/link";
import { headers } from 'next/headers';


export default async function Profile() {
 const host = headers().get('x-forwarded-host') || 'localhost:3000';
  const protocol = process.env.NODE_ENV === 'production' ? 'https' : 'http';

  const res = await fetch(`${protocol}://${host}/api/profile`, {
    cache: 'no-store',
  });

// const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/profile`, {cache: 'no-store',});

  const profile = await res.json();
console.log("pof",profile)
  return (
    <div className="container mt-4">
        
     <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-8">
          <div className="card shadow rounded-4 border-0">
            <div className="card-body">
              <h2 className="card-title text-center mb-4"><span className="bi bi-person-fill"></span> Profile Information</h2>
              <ul className="list-group list-group-flush">
                <li className="list-group-item">
                  <strong>Name:</strong> {profile.name}
                </li>
                <li className="list-group-item">
                  <strong>Email:</strong> {profile.email}
                </li>
                <li className="list-group-item">
                  <strong>Phone:</strong> {profile.phone}
                </li>
                <li className="list-group-item">
                  <strong>Location:</strong> {profile.location}
                </li>
                <li className="list-group-item">
                  <strong>Bio:</strong> {profile.bio}
                </li>
              </ul>
              <div className="text-center mt-4 ">
                
                 <Link href="/edit-profile" className="btn btn-primary rounded-pill px-4">Edit Profile</Link> 
                 <Link href="/" className="btn btn-success rounded-pill px-4 mx-3">Home</Link>  
               
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
      
    </div>
  );
}
