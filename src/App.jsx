import CardHolder from "./components/Cardholder";

function App() {
  return (
    <div className="bg-gray-500 h-screen">
      <div className="flex flex-row justify-center p-8">
        <h1 className="text-3xl font-bold text-regal-blue ">Memory Card</h1>
      </div>
      <CardHolder />
    </div>
  );
}

export default App;
