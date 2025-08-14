export const RowItems = ({ id, name, surname, point, chain, avatar, status, efficiency, onView, onEdit }) => {
   return (
       <tr>
           <td>
               <img 
                   src={avatar || `https://ui-avatars.com/api/?name=${name}+${surname}&background=667eea&color=fff`} 
                   alt={`${name} ${surname}`}
                   className="user-avatar"
               />
           </td>
           <td className="id-cell">{id}</td>
           <td className="name-cell">
               <div className="name-container">
                   <span className="full-name">{name} {surname}</span>
               </div>
           </td>
           <td className="points-cell">
               <div className="points-container">
                   <span className="points-number">{point}</span>
                   <div className="points-bar">
                       <div 
                           className="points-fill" 
                           style={{ width: `${Math.min(point, 100)}%` }}
                       ></div>
                   </div>
               </div>
           </td>
           <td>
               <span className={`status-badge ${status || 'medium'}`}>
                   {status === 'high' ? 'Alto' : status === 'low' ? 'Bajo' : 'Medio'}
               </span>
           </td>
           <td className="chain-cell">
               <div className="chain-container">
                   <code className="chain-hash">
                       {chain.substring(0, 8)}...{chain.substring(chain.length - 6)}
                   </code>
                   <button 
                       className="copy-chain-btn"
                       onClick={() => navigator.clipboard.writeText(chain)}
                       title="Copiar hash completo"
                   >
                       <i className="bi bi-clipboard"></i>
                   </button>
               </div>
           </td>
       </tr>
   );
};