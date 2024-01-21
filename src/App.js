import axios from 'axios';
import './App.css';
import { useEffect, useRef, useState } from 'react';

function App() {

  const [data, setdata] = useState([])
  const [search, setsearch] = useState("")


  const fname = useRef();
  const lname = useRef();
  const email = useRef();

  useEffect(() => {
    axios.get("http://localhost:3001/posts").then((res) => {
      setdata(res.data)

      console.log(res.data);
    })
  }, [])


  const handleSubmit = () => {
    const usedata = {
      Firstname: fname.current.value,
      Lastname: lname.current.value,
      Email: email.current.value
    }
    console.log(usedata);
    axios.post("http://localhost:3001/posts", usedata).then((res) => {
      setdata([...data, res.data]);
    })
  }

  const handleDelete = (val) => {
    console.log(val);

    axios.delete(`http://localhost:3001/posts/${val.id}`).then((res) => {
      setdata(data.filter((e) => e.id !== val.id));
    });
  };


  return (
    <>

      <div className='flex'>
        <input type='text' name='fname' placeholder='Enter a First name' ref={fname} className='input'></input>
        <input type='text' name='lname' placeholder='Enter a Last name' ref={lname} className='input'></input>
        <input type='text' name='email' placeholder='Enter a Email' ref={email} className='input'></input>
        <button onClick={handleSubmit}>Add Data</button>
      <br />
      <input placeholder='Search' onChange={(e) => setsearch(e.target.value)} className='search'></input>
      </div>

      <table id="keywords" cellspacing="0" cellpadding="0">
        <thead>
          <tr>
            <th><span>id</span></th>
            <th><span>First name</span></th>
            <th><span>Last name</span></th>
            <th><span>Email</span></th>
            <th><span>Button</span></th>
          </tr>
        </thead>
        <tbody>

          {

            data?.filter((val) => {
              return search.toLowerCase() === "" ? val : val.Firstname.toLowerCase().includes(search);
            }).map((val) => {
              return (
                <tr>
                  <td class="lalign">{val.id}</td>
                  <td>{val.Firstname}</td>
                  <td>{val.Lastname}</td>
                  <td>{val.Email}</td>
                  <td><button onClick={() => handleDelete(val)}>Delete</button></td>
                </tr>
              )
            })
          }

        </tbody>
      </table>
    </>
  );
}

export default App;
