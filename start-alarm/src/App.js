import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Welcome to Acti-Protect</h1>
        <p>Your security, our priority.</p>
        <button onClick={() => alert('Alarm Activated!')}>Activate Alarm</button>
      </header>
    </div>
  );
}

export default App;