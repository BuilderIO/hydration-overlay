export default function Home() {
  return (
    <>
      <div>normal content</div>
      {typeof window === "undefined" ? <div>SERVER</div> : <span>BROWSER</span>}
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
