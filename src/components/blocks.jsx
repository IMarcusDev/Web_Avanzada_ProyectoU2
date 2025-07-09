export  function Blocks({initialChain}){
    return(
    <>
        {initialChain.map((bloque, i) => (
                                <div
                                    key={i}
                                    className="p-4 rounded shadow col"
                                    style={{
                                        backgroundColor: 'white',
                                        color: 'black',
                                        margin: '0.7rem',
                                    }}
                                >
                                    <h2 className="text-xl font-semibold mb-4 text-center">Bloque #{bloque.index}</h2>
                                    <chain />
                                    <table className= "table table-striped table-hover table-bordered" >
                                        <tbody>
                                            <chain />
                                            <tr>
                                                <td  style={{ fontWeight: 'bold', padding: '8px', borderBottom: '1px solidrgb(95, 92, 83)' }}>Cadena</td>
                                                <td style={{ padding: '8px', borderBottom: '1px solidrgb(75, 92, 83)' }}>{bloque.data}</td>
                                            </tr>
                                            <tr>
                                                <td style={{ fontWeight: 'bold', padding: '8px', borderBottom: '1px solidrgb(95, 92, 83)' }}>Semilla</td>
                                                <td style={{ padding: '8px', borderBottom: '1px solidrgb(95, 92, 83)' }}>{bloque.previousHash}</td>
                                            </tr>
                                            <tr>
                                                <td style={{ fontWeight: 'bold', padding: '8px', borderBottom: '1px solidrgb(95, 92, 83)' }}>tiempo
                                                </td>
                                                <td style={{ padding: '8px', borderBottom: '1px solidrgb(95, 92, 83)' }}>{bloque.nonce}</td>
                                            </tr>
                                            <tr>
                                                <td style={{ fontWeight: 'bold', padding: '8px' }}>Hash</td>
                                                <td style={{ padding: '8px' }}>{bloque.hash}</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            ))}
    </>)
}