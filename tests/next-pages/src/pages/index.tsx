export default function Home() {
  return (
    <>
      <div>normal content</div>
      {/* {typeof window === "undefined" ? (
        <div>SERVER RENDERED DIV</div>
      ) : (
        <span>BROWSER RENDERED SPAN</span>
      )} */}
      <div>
        <div>Hello world!</div>
        <button>CLOSE</button>
      </div>
    </>
  );
}
