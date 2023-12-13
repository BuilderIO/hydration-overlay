export default function Index() {
  return (
    <div>
      <h1>Welcome to Remix</h1>
      <div>{Math.random()}</div>
      <button style={{ all: "unset" }}>Hello world</button>
      <span style={{ color: "green", backgroundColor: "black" }}>
        Hello world
      </span>
    </div>
  );
}
