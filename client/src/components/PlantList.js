import React, { Component } from "react";
import axios from "axios";

export default class PlantList extends Component {
  // add state with a property called "plants" - initialize as an empty array
  constructor(props) {
    super();
    this.state = {
      plants: [],
      plantsToDisplay: [],
      filter: "all",
    };
  }
  // when the component mounts:
  //   - fetch data from the server endpoint - http://localhost:3333/plants
  //   - set the returned plants array to this.state.plants
  componentDidMount() {
    axios
      .get("http://localhost:3333/plants")
      .then((res) => {
        this.setState({
          plants: res.data.plantsData,
          plantsToDisplay: res.data.plantsData,
        });
      })
      .catch((err) => console.log(err));
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.filter !== this.state.filter && this.state.filter !== "all") {
      const plants = this.state.plants;
      const newList = plants.filter((item) => item.light === this.state.filter);
      console.log(newList);
      this.setState({ plantsToDisplay: newList });
    }
  }

  handleChange = (event) => {
    console.log(event.target.value);
    this.setState({ filter: event.target.value });
  };

  /*********  DON'T CHANGE ANYTHING IN THE RENDER FUNCTION *********/
  render() {
    const filter = (
      <form onSubmit={this.handleSubmit} style={{ display: "block" }}>
        <label>
          Choose the needed light:
          <select value={this.state.value} onChange={this.handleChange}>
            <option value="all">All</option>
            <option value="direct">Direct</option>
            <option value="indirect">Indirect</option>
            <option value="low">Low</option>
          </select>
        </label>
        {/* <input type="submit" value="Submit" /> */}
      </form>
    );

    return (
      <main className="plant-list">
        {this.state?.plants && filter};
        {this.state?.plantsToDisplay?.map((plant) => (
          <div className="plant-card" key={plant.id}>
            <img className="plant-image" src={plant.img} alt={plant.name} />
            <div className="plant-details">
              <h2 className="plant-name">{plant.name}</h2>
              <p className="plant-scientific-name">{plant.scientificName}</p>
              <p>{plant.description}</p>
              <div className="plant-bottom-row">
                <p>${plant.price}</p>
                <p>☀️ {plant.light}</p>
                <p>💦 {plant.watering}x/month</p>
              </div>
              <button
                className="plant-button"
                onClick={() => this.props.addToCart(plant)}
              >
                Add to cart
              </button>
            </div>
          </div>
        ))}
      </main>
    );
  }
}
