import React, { useContext,useState, useEffect } from 'react'
import { themeContext } from '../../Firebase/AuthProvider'
import SingleMyToy from './SingleMyToy';
import style from './MyToy.module.css';
import useTitle from '../../Hooks/useTitle';

const MyToy = () => {
  useTitle("My toys")
    const [refresh,setReFresh] = useState(true)
    const {user} = useContext(themeContext)
    const [allToy,setAllToy] = useState([])
    useEffect(() => {
        fetch(`http://localhost:5000/user/${user.email}`)
        .then(res => res.json())
        .then(result => setAllToy(result))
    },[refresh])

  return (
    <div >
      <div className={style.bg}>
        <h2 className='text-center font-Bubblegum text-white text-3xl'>Toy Details</h2>
      </div>

    <div className='py-14'>
        <div className="container mx-auto">
            <div className='text-right mb-6'>
            <select className="select select-bordered w-full max-w-xs">
                <option>Ascending</option>
                <option>Descending </option>
            </select>
            </div>
            <div>
        <div className="overflow-x-auto w-full">
              <table className="table w-full">
    {/* head */}
    <thead>
      <tr>
      <th>Photo</th>
        <th>Name</th>
        <th>Category</th>
        <th>price</th>
        <th>Action</th>
        <th>Details</th>
      </tr>
    </thead>
    <tbody>
      {/* row 1 */}
      {
                allToy.map(item => <SingleMyToy refresh={refresh} setReFresh={setReFresh} item={item} key={item._id}></SingleMyToy>)
            }
    </tbody>
    {/* foot */}
    
  </table>
  </div>
  </div>
        </div>
    </div>
    </div>
  )
}

export default MyToy