import Header from "./components/Header";
import Card from "./components/Card";
function App() {
  return (
    <>
      <Header />
      <section className="px-3 py-1 grid grid-cols-[repeat(auto-fill,_minmax(300px,_1fr))] gap-3">
        <Card title="İzmir, Turkey" color="orange" />
        <Card title="London, United Kingdom" />
      </section>
    </>
  );
}

export default App;
