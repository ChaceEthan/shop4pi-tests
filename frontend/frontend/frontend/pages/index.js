export default function Home() {
  return (
    <div style={{ textAlign: "center", marginTop: "60px" }}>
      <h1>Welcome to Shop4Pi</h1>
      <button
        onClick={() => {
          window.Pi.authenticate(["payments"], (payment) => {
            console.log("Incomplete payment:", payment);
          })
          .then(auth => alert("Hello " + auth.user.username))
          .catch(err => console.error(err));
        }}
      >
        Login with Pi
      </button>
    </div>
  );
}
