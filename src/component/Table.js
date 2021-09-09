import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Table = () => {
  const [data, setData] = useState([]);
  const [type, setType] = useState('');
  const [title, setTitle] = useState('');
  const [unit, setUnit] = useState('');
  const [brand, setBrand] = useState('');
  const [attributes, setAttributes] = useState('');

  const UserData = {
    type: type,
    title: title,
    unit: unit,
    brand: brand,
    attributes: attributes,
  };

  const api = axios.create({
    baseURL: `http://3.20.41.252:3000/admin`,
  });

  useEffect(() => {
    const Getdata = () => {
      api.get('/getFields').then((res) => {
        console.log(res.data.response);
        setData(res.data.response);
      });
    };
    Getdata();
  }, []);

  const saveData = () => {
    api
      .post('/addField', UserData)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const deleteField = (id) => {
    api
      .delete(`/deleteField/${id}`)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div>
      <h2>List</h2>
      <table>
        <thead>
          <tr>
            <th>title</th>
            <th>brand</th>
            <th>category</th>
            <th>unit</th>
            <th>attributes</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {data.map((lst) => (
            <tr key={lst._id}>
              <td>{lst.title}</td>
              <td>{lst.brand.title}</td>
              <td>{lst.catagory_id.title}</td>
              <td>{lst.unit}</td>
              <td>{lst.attributes}</td>
              <td onClick={() => deleteField(lst._id)}>Delete</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
