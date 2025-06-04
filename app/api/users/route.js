let users = [
    { id: 1, username: "admin", role: "admin" },
    { id: 2, username: "mhs", role: "mhs" },
    { id: 3, username: "dosen", role: "dosen" },
  ];
  
  // GET all users
  export async function GET() {
    return new Response(JSON.stringify(users), { status: 200 });
  }
  
  // POST add user
  export async function POST(request) {
    const newUser = await request.json();
    newUser.id = users.length + 1;
    users.push(newUser);
    return new Response(JSON.stringify(newUser), { status: 201 });
  }
  
  // DELETE user by id
  export async function DELETE(request) {
    const { searchParams } = new URL(request.url);
    const id = parseInt(searchParams.get("id"));
    users = users.filter((u) => u.id !== id);
    return new Response(null, { status: 204 });
  }
  