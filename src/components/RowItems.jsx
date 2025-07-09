export const RowItems = ({ id, name, surname, point, chain }) => {
    return (
        <tr>
            <td>{id}</td>
            <td>{name}</td>
            <td>{surname}</td>
            <td>{point}</td>
            <td>{chain}</td>
        </tr>
    );
};
