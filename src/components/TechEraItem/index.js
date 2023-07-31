import './index.css'
import {Link} from 'react-router-dom'

const TechEraItem = props => {
  const {techEraDetails} = props
  const {id, name, logoUrl} = techEraDetails

  return (
    <li className="list-item">
      <Link to={`/courses/${id}`} className="nav-link">
        <img src={logoUrl} alt={name} className="item-logo" />
        <p className="name">{name} </p>
      </Link>
    </li>
  )
}
export default TechEraItem
