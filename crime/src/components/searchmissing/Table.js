const Table = ({ data }) => {
    return (
      <table>
        <tbody>
          <tr>
            <th>Name</th>
            <th>Age</th>
            <th>Description</th>
          </tr>
          {data.map((item) => (
            <tr key={item.id} style={{color:item.found?'green':'red'}}>
              <td>{item.name}</td>
              <td>{item.age}</td>
              <td>{item.description}</td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  };
  
  export default Table;