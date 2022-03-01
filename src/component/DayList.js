//날짜별로 선택할 수 있는 페이지
import { Link } from "react-router-dom";
import useFetch from "./hooks/useFetch";

export default function DayList(){
   const days=  useFetch("http://localhost:3001/days");

   if(days.length ===0){ //느린 인터넷 환경 등에서 했을때 화면이 안뜨면 로딩중을 보여줌
       return <span>Loading...</span>
   }
    
    return(
    //key값에는 day의 id를 넣어준다(map에는 키-값이 한 쌍)
    <ul className="list_day">
        {days.map(day=>(
        <li key={day.id}>
            {/*Link to = html의 a href*/}
            <Link to={`/day/${day.day}`}>Day{day.day}</Link> {/*day.js에서 해당되는 날짜를 가져와서 보여줌, day.day는 data.json의 days 속의 day를 뜻함*/}
        </li> //Day 날짜
        ))}
    </ul>
    );
}