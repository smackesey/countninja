import { RecoilRoot } from 'recoil';
import './App.css';
import { Board } from './Board';
import { Sidebar } from './Sidebar';
import { KeyboardListener } from './state';

function App() {
  return (
    <RecoilRoot>
      <KeyboardListener />
      <div className="flex w-screen h-screen bg-black overflow-hidden">
        <Sidebar />
        <Board />
      </div>
    </RecoilRoot>
  );
}

export default App;
