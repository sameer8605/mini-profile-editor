let profile = {
  name: 'John Doe',
  email: 'john@example.com',
  phone: '1234567890',
  location: 'Mumbai',
  bio: 'I am a developer',
};

export async function GET() {
  return new Response(JSON.stringify(profile), { status: 200 });
}

export async function PUT(req) {
  const updated = await req.json();
  profile = { ...profile, ...updated };
  return new Response(JSON.stringify(profile), { status: 200 });
}
