export default function Home() {
  return (
    <>
      {typeof window !== "undefined" ? <div>Random</div> : <div>Random </div>}
      <button style={{ all: "unset" }}>Hello world</button>
      <button
        style={{
          cursor: "pointer",
          padding: "0.5rem",
          marginRight: "1rem",
          backgroundColor: "#212529",
          borderRadius: "0.25rem",
          color: "white",
        }}
      >
        CLOSE
      </button>
    </>
  );
}
