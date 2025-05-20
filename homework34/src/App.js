import React, { useState, useEffect } from "react";

const VALID_EMAIL = "digitalAcademy@gmail.com";
const VALID_PASSWORD = "iLoveReact123";

function App() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loggedIn, setLoggedIn] = useState(false);

  const [users, setUsers] = useState([]);
  const [filters, setFilters] = useState({
    name: true,
    email: true,
    phone: false,
    country: false,
  });

  const fetchUser = async () => {
    const res = await fetch("https://randomuser.me/api/");
    const data = await res.json();
    const user = data.results[0];
    setUsers((prev) => [...prev, user]);
  };

  useEffect(() => {
    (async () => {
      for (let i = 0; i < 5; i++) {
        await fetchUser();
      }
    })();
  }, []);

  const handleLogin = () => {
    if (email === VALID_EMAIL && password === VALID_PASSWORD) {
      setLoggedIn(true);
    }
  };

  const toggleFilter = (key) => {
    setFilters((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  if (!loggedIn) {
    return (
      <div style={{ maxWidth: 400, margin: "30px auto", textAlign: "center" }}>
        <h2>Login</h2>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={{ width: "100%", padding: 8, marginBottom: 10 }}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={{ width: "100%", padding: 8, marginBottom: 10 }}
        />
        <button
          onClick={handleLogin}
          disabled={!(email === VALID_EMAIL && password === VALID_PASSWORD)}
          style={{
            padding: 10,
            width: "100%",
            backgroundColor:
              email === VALID_EMAIL && password === VALID_PASSWORD
                ? "blue"
                : "gray",
            color: "white",
            border: "none",
            cursor:
              email === VALID_EMAIL && password === VALID_PASSWORD
                ? "pointer"
                : "not-allowed",
          }}
        >
          Log In
        </button>
      </div>
    );
  }
  return (
    <div style={{ maxWidth: 900, margin: "30px auto", fontFamily: "Arial" }}>
      <h1>users</h1>

      <div style={{ marginBottom: 20 }}>
        <strong>filters</strong>
        {Object.keys(filters).map((key) => (
          <label key={key} style={{ marginRight: 10 }}>
            <input
              type="checkbox"
              checked={filters[key]}
              onChange={() => toggleFilter(key)}
            />{" "}
            {key.charAt(0).toUpperCase() + key.slice(1)}
          </label>
        ))}
      </div>
      <button
        onClick={fetchUser}
        style={{
          marginBottom: 20,
          padding: "10px 15px",
          cursor: "pointer",
        }}
      >
        add new user
      </button>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit,minmax(250px,1fr))",
          gap: 20,
        }}
      >
        {users.map((user, i) => (
          <div
            key={i}
            style={{
              border: "1px solid #ccc",
              borderRadius: 8,
              padding: 15,
              boxShadow: "0 0 5px rgba(0,0,0,0.1)",
            }}
          >
            {filters.name && (
              <p>
                <strong>name: </strong> {user.name.title} {user.name.first}{" "}
                {user.name.last}
              </p>
            )}
            {filters.email && (
              <p>
                <strong>email: </strong> {user.email}
              </p>
            )}
            {filters.phone && (
              <p>
                <strong>phone:</strong> {user.phone}
              </p>
            )}
            {filters.country && (
              <p>
                <strong>country: </strong> {user.location.country}
              </p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
export default App;
