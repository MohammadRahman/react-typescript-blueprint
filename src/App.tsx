function App() {
  return (
    <input
      type="text"
      placeholder="this should push it to the next line and format the codes but it doesnot"
      onChange={e => console.log(e)}
    />
  );
}

export default App;
