import Main from '../main/main';

type countPoints = {
  count: number;
};

function App({count}: countPoints): JSX.Element {
  return <Main count = {count}/>;
}

export default App;
