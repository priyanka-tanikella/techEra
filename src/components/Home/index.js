import {Component} from 'react'

import Loader from 'react-loader-spinner'

import Header from '../Header'
import './index.css'
import TechEraItem from '../TechEraItem'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class Home extends Component {
  state = {techEraList: [], apiStatus: apiStatusConstants.initial}

  componentDidMount() {
    this.getTechEraList()
  }

  getTechEraList = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})
    const url = 'https://apis.ccbp.in/te/courses'
    const options = {method: 'GET'}
    const response = await fetch(url, options)
    const data = await response.json()
    console.log(data)

    if (response.ok) {
      const updatedData = data.courses.map(eachEra => ({
        id: eachEra.id,
        logoUrl: eachEra.logo_url,
        name: eachEra.name,
      }))
      this.setState({
        techEraList: updatedData,
        apiStatus: apiStatusConstants.success,
      })
    }
    if (response.status === 401) {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  renderFailureView = () => (
    <div className="failure-view-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/tech-era/failure-img.png"
        className="failure-image"
        alt="failure view"
      />
      <h1 className="failure-heading">Oops! Something Went Wrong</h1>
      <p className="failure-description">
        We cannot seem to find the page you are looking for.
      </p>
      <button
        type="button"
        className="retry-button"
        onClick={this.getTechEraList}
      >
        Retry
      </button>
    </div>
  )

  renderLoaderView = () => (
    <div data-testid="loader" className="loader-container">
      <Loader type="ThreeDots" height={50} width={50} color="#4656a1" />
    </div>
  )

  renderTechEraListView = () => {
    const {techEraList} = this.state
    return (
      <ul className="tech-era-list">
        {techEraList.map(eachTechEra => (
          <TechEraItem key={eachTechEra.id} techEraDetails={eachTechEra} />
        ))}
      </ul>
    )
  }

  renderTechEraList = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderTechEraListView()
      case apiStatusConstants.failure:
        return this.renderFailureView()
      case apiStatusConstants.inProgress:
        return this.renderLoaderView()
      default:
        return null
    }
  }

  render() {
    const {techEraList} = this.state
    console.log(techEraList)
    return (
      <>
        <Header />
        <div className="tech-era-container">
          <h1 className="heading">Courses</h1>
          {this.renderTechEraList()}
        </div>
      </>
    )
  }
}
export default Home
