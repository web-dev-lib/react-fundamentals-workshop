import './index.css'
import React, { useState } from 'react'
import ReactDOM from 'react-dom'
import sortBy from 'sort-by'

const items = [
  { id: 1, name: 'tacos', type: 'mexican', price: 6 },
  { id: 2, name: 'burrito', type: 'mexican', price: 9 },
  { id: 3, name: 'tostada', type: 'mexican', price: 8 },
  { id: 4, name: 'mushy peas', type: 'english', price: 3 },
  { id: 5, name: 'fish and chips', type: 'english', price: 12 },
  { id: 6, name: 'black pudding', type: 'english', price: 12 }
]

const MenuItem = ({ item }) => (
  <li>
    <button>add</button> {item.name} - {item.name} - <small>${item.price}</small>
  </li>
)

function Menu({ title, items }) {
  const [filterType, setFilterType] = useState('_ALL_')

  const highestPrice = items.reduce((max, item) => {
    return item.price > max ? item.price : max
  }, 0)

  const [maxPrice, setMaxPrice] = useState(highestPrice)

  const filterByPrice = item => item.price <= maxPrice

  const filterByType = item => {
    if (filterType === '_ALL_') {
      return true
    } else {
      return item.type === filterType
    }
  }

  const handleFilterChange = event => {
    setFilterType(event.target.value)
  }

  const handleMaxPriceChange = event => {
    setMaxPrice(parseInt(event.target.value, 10))
  }

  const filteredItems = items
    .filter(filterByPrice)
    .filter(filterByType)
    .sort(sortBy('name'))

  return (
    <div>
      <h1>{title}</h1>
      <div>
        <div
          style={{
            display: 'flex',
            alignItems: 'center'
          }}
        >
          <div style={{ marginRight: '10px' }}>
            <select onChange={handleFilterChange}>
              <option value="_ALL_">- filter by type</option>
              {[...new Set(items.map(item => item.type))].map(type => (
                <option key={type}>{type}</option>
              ))}
            </select>
          </div>
          <div>
            <label>
              Max Price ${maxPrice}
              <br />
              $0{' '}
              <input
                type="range"
                min="0"
                max={highestPrice}
                defaultValue={highestPrice}
                onChange={handleMaxPriceChange}
              />{' '}
              ${highestPrice}
            </label>
          </div>
        </div>
      </div>
      {filteredItems.length ? (
        <ul>
          {filteredItems.map(item => (
            <MenuItem key={item.id} item={item} />
          ))}
        </ul>
      ) : (
        <p>No items!</p>
      )}
    </div>
  )
}

// const totalOrder = order => order.reduce((total, item) => item.price + total, 0);

function App({ menu }) {
  return (
    <div style={{ display: 'flex' }}>
      <div style={{ background: '#eee', padding: '20px' }}>
        <Menu title="Menu" items={menu} />
      </div>

      <div style={{ marginLeft: '40px' }}>
        <h2>Your Order</h2>
      </div>
    </div>
  )
}

ReactDOM.render(<App title="Menu" menu={items} />, document.getElementById('root'))

// import './index.css'
// import React, { useState } from 'react'
// import ReactDOM from 'react-dom'
// import sortBy from 'sort-by'

// const items = [
//   { id: 1, name: 'tacos', type: 'mexican', price: 6 },
//   { id: 2, name: 'burrito', type: 'mexican', price: 9 },
//   { id: 3, name: 'tostada', type: 'mexican', price: 8 },
//   { id: 4, name: 'mushy peas', type: 'english', price: 3 },
//   { id: 5, name: 'fish and chips', type: 'english', price: 12 },
//   { id: 6, name: 'black pudding', type: 'english', price: 12 }
// ]

// const MenuItem = ({ item, onSelect }) => (
//   <li>
//     <button onClick={onSelect}>add</button> {item.name} - {item.name} - <small>${item.price}</small>
//   </li>
// )

// function Menu({ title, items, onItemSelect }) {
//   const [filterType, setFilterType] = useState('_ALL_')

//   const highestPrice = items.reduce((max, item) => {
//     return item.price > max ? item.price : max
//   }, 0)

//   const [maxPrice, setMaxPrice] = useState(highestPrice)

//   const filterByPrice = item => item.price <= maxPrice

//   const filterByType = item => {
//     if (filterType === '_ALL_') {
//       return true
//     } else {
//       return item.type === filterType
//     }
//   }

//   const handleFilterChange = event => {
//     setFilterType(event.target.value)
//   }

//   const handleMaxPriceChange = event => {
//     setMaxPrice(parseInt(event.target.value, 10))
//   }

//   const filteredItems = items
//     .filter(filterByPrice)
//     .filter(filterByType)
//     .sort(sortBy('name'))

//   return (
//     <div>
//       <h1>{title}</h1>
//       <div>
//         <div
//           style={{
//             display: 'flex',
//             alignItems: 'center'
//           }}
//         >
//           <div style={{ marginRight: '10px' }}>
//             <select onChange={handleFilterChange}>
//               <option value="_ALL_">- filter by type</option>
//               {[...new Set(items.map(item => item.type))].map(type => (
//                 <option key={type}>{type}</option>
//               ))}
//             </select>
//           </div>
//           <div>
//             <label>
//               Max Price ${maxPrice}
//               <br />
//               $0{' '}
//               <input
//                 type="range"
//                 min="0"
//                 max={highestPrice}
//                 defaultValue={highestPrice}
//                 onChange={handleMaxPriceChange}
//               />{' '}
//               ${highestPrice}
//             </label>
//           </div>
//         </div>
//       </div>
//       {filteredItems.length ? (
//         <ul>
//           {filteredItems.map(item => (
//             <MenuItem key={item.id} onSelect={() => onItemSelect(item)} item={item} />
//           ))}
//         </ul>
//       ) : (
//         <p>No items!</p>
//       )}
//     </div>
//   )
// }

// const totalOrder = order => order.reduce((total, item) => item.price + total, 0)

// function App({ menu }) {
//   const [order, setOrder] = useState([])

//   const handleItemSelect = item => {
//     setOrder(order.concat([item]))
//   }

//   return (
//     <div style={{ display: 'flex' }}>
//       <div style={{ background: '#eee', padding: '20px' }}>
//         <Menu title="Menu" onItemSelect={handleItemSelect} items={menu} />
//       </div>

//       <div style={{ marginLeft: '40px' }}>
//         <h2>Your Order ${totalOrder(order)}</h2>
//         <ul>
//           {order.map(item => (
//             <li key={item.id}>{item.name}</li>
//           ))}
//         </ul>
//       </div>
//     </div>
//   )
// }

// ReactDOM.render(<App title="Menu" menu={items} />, document.getElementById('root'))
