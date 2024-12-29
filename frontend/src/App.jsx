import { useState } from "react";
import "./App.css";
import { Button } from "./components/ui/button";
import { NavLink, Route, Routes } from "react-router";
import { ChatPage, HomePage, MainHeader } from "./components/utility/import";

function App() {
  const [count, setCount] = useState(0);

  return (
    < div className="app">


      <Routes>
        <Route path="/" element={<MainHeader></MainHeader>}>
          <Route index element={<HomePage></HomePage>} />
          <Route path="/chat" element={<ChatPage></ChatPage>} />
          <Route path="*" element={<h1>Not Found</h1>} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
