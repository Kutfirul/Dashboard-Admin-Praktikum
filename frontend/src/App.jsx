import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const API_URL = "http://localhost:3001/users";

  const [users, setUsers] = useState([]);
  const [editUser, setEditUser] = useState(null);
  const [newUser, setNewUser] = useState(null);

  const fetchUsers = async () => {
    try {
      const res = await fetch(API_URL);
      const data = await res.json();
      setUsers(data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleCreate = async () => {
    if (!newUser.nama || !newUser.email || !newUser.npm || !newUser.kelas) {
      alert("Semua field wajib diisi");
      return;
    }

    await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        nama: newUser.nama,
        email: newUser.email,
        npm: newUser.npm,
        kelas: newUser.kelas,
      }),
    });

    fetchUsers();
    setNewUser(null);
  };

  const handleUpdate = async () => {
    if (!editUser?.id) {
      alert("ID tidak ditemukan");
      return;
    }

    await fetch(`${API_URL}/${editUser.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        nama: editUser.nama,
        email: editUser.email,
        npm: editUser.npm,
        kelas: editUser.kelas,
      }),
    });

    fetchUsers();
    setEditUser(null);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Yakin ingin menghapus data ini?")) return;

    await fetch(`${API_URL}/${id}`, {
      method: "DELETE",
    });

    fetchUsers();
  };

  return (
    <div className="page">
      <div className="card">
        <h2>Dashboard Admin</h2>

        <button
          className="btn-add"
          onClick={() =>
            setNewUser({ nama: "", email: "", npm: "", kelas: "" })
          }
        >
          + Tambah Data
        </button>

        <div className="table-wrapper">
          <table>
            <thead>
              <tr>
                <th>Nama</th>
                <th>Email</th>
                <th>NPM</th>
                <th>Kelas</th>
                <th>Aksi</th>
              </tr>
            </thead>

            <tbody>
              {users.map((u) => (
                <tr key={u.id}>
                  <td>{u.nama}</td>
                  <td>{u.email}</td>
                  <td>{u.npm}</td>
                  <td>{u.kelas}</td>
                  <td>
                    <button
                      className="btn-edit"
                      onClick={() => setEditUser({ ...u })}
                    >
                      Edit
                    </button>
                    <button
                      className="btn-delete"
                      onClick={() => handleDelete(u.id)}
                    >
                      Hapus
                    </button>
                  </td>
                </tr>
              ))}

              {users.length === 0 && (
                <tr>
                  <td colSpan="5" style={{ textAlign: "center" }}>
                    Tidak ada data
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
      {newUser && (
        <div className="modal">
          <div className="modal-content">
            <h3>Tambah Data</h3>

            <input
              placeholder="Nama"
              value={newUser.nama}
              onChange={(e) => setNewUser({ ...newUser, nama: e.target.value })}
            />

            <input
              placeholder="Email"
              value={newUser.email}
              onChange={(e) =>
                setNewUser({ ...newUser, email: e.target.value })
              }
            />

            <input
              placeholder="NPM"
              value={newUser.npm}
              onChange={(e) => setNewUser({ ...newUser, npm: e.target.value })}
            />

            <input
              placeholder="Kelas"
              value={newUser.kelas}
              onChange={(e) =>
                setNewUser({ ...newUser, kelas: e.target.value })
              }
            />

            <div className="modal-actions">
              <button className="btn-save" onClick={handleCreate}>
                Simpan
              </button>
              <button className="btn-cancel" onClick={() => setNewUser(null)}>
                Batal
              </button>
            </div>
          </div>
        </div>
      )}

      {editUser && (
        <div className="modal">
          <div className="modal-content">
            <h3>Edit Data</h3>

            <input
              placeholder="Nama"
              value={editUser.nama}
              onChange={(e) =>
                setEditUser({ ...editUser, nama: e.target.value })
              }
            />

            <input
              placeholder="Email"
              value={editUser.email}
              onChange={(e) =>
                setEditUser({ ...editUser, email: e.target.value })
              }
            />

            <input
              placeholder="NPM"
              value={editUser.npm}
              onChange={(e) =>
                setEditUser({ ...editUser, npm: e.target.value })
              }
            />

            <input
              placeholder="Kelas"
              value={editUser.kelas}
              onChange={(e) =>
                setEditUser({ ...editUser, kelas: e.target.value })
              }
            />

            <div className="modal-actions">
              <button className="btn-save" onClick={handleUpdate}>
                Simpan
              </button>
              <button className="btn-cancel" onClick={() => setEditUser(null)}>
                Batal
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
