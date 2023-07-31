import {Component} from 'react'

import Loader from 'react-loader-spinner'

import Header from '../Header'
import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class TechEraItemDetails extends Component {
  state = {techEraDetailsData: {}, apiStatus: apiStatusConstants.initial}

  componentDidMount() {
    this.getTechEraDetailsData()
  }

  getTechEraDetailsData = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})
    const {match} = this.props
    const {params} = match
    const {id} = params
    const url = `https://apis.ccbp.in/te/courses/${id}`
    const response = await fetch(url)
    const data = await response.json()
    console.log(data)

    if (response.ok) {
      const updatedData = {
        id: data.course_details.id,
        imageUrl: data.course_details.image_url,
        name: data.course_details.name,
        description: data.course_details.description,
      }
      this.setState({
        techEraDetailsData: updatedData,
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
        We cannot seem to find the page you are looking for
      </p>
      <button
        type="button"
        data-testid="button"
        className="retry-button"
        onClick={this.getTechEraDetailsData}
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

  renderTechEraDetailsView = () => {
    const {techEraDetailsData} = this.state
    const {imageUrl, name, description} = techEraDetailsData

    return (
      <div className="tech-era-details-view-container">
        <img src={imageUrl} alt={name} className="tech-era-details-img" />
        <div className="details-content-container">
          <h1 className="course-name">{name} </h1>
          <p className="course-description">{description} </p>
        </div>
      </div>
    )
  }

  renderTechEraList = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderTechEraDetailsView()
      case apiStatusConstants.failure:
        return this.renderFailureView()
      case apiStatusConstants.inProgress:
        return this.renderLoaderView()
      default:
        return null
    }
  }

  render() {
    const {techEraDetailsData} = this.state
    console.log(techEraDetailsData)
    return (
      <>
        <Header />
        <div className="tech-era-details-container">
          {this.renderTechEraList()}
        </div>
      </>
    )
  }
}
export default TechEraItemDetails
