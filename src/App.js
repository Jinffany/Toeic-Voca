//시작하기 전에 터미널 2개 띄워서 한 개에 먼저 json-server --watch ./src/db/data.json --port 3001 //node.js 서버 띄워야 함(포트번호는 현재 포트가 3000이니까 3000말고 다른 아무데나)
//그리고 남은 하나의 터미널에는 npm run start 하면 db와 연동돼서 실행

import Day from './component/Day';
import DayList from './component/DayList';
import Header from './component/Header';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import EmptyPage from './component/EmptyPage';
import CreateWord from './component/CreateWord';
import CreateDay from './component/CreateDay';

function App() {
  return (
    <BrowserRouter>
    <div className="App">
        <Header/> {/*헤더(모든페이지에서 공통으로 보여줌) 다음 부분은 바뀌니까 Switch로 감싸줌*/}
        <Switch>
          <Route exact path="/"> {/*라우트 경로="/"는 첫 페이지로 가라는 뜻 + exact path="/"는 /가 확실히 일치할 때만 가게끔*/}
            <DayList/>
          </Route>
          <Route path="/day/:day"> {/*day로 들어왔을때 클릭된 날짜값 day(1,2,3 중 하나)을 받을 수 있음*/}
            <Day/>
          </Route>
          <Route path="/create_word">
            <CreateWord/>
          </Route>
          <Route path="/create_day">
            <CreateDay/>
          </Route>
          <Route>
            <EmptyPage/> {/*위에 있는 조건들이 만족하지 않으면 이거 보여줌, 이걸 만약 맨 위에 적으면 이거부터 실행되니까 조심!*/}
          </Route>
        </Switch>
    </div>
    </BrowserRouter>
  );
}

export default App;

