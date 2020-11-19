import React from 'react'

import Filters from './Filters'
import PetBrowser from './PetBrowser'

//import {getAll, getByType, getBetweenAge} from '../data/pets'

class App extends React.Component {
  constructor() {
    super()

    this.state = {
      pets: [],
      filters: {
        type: 'all'
      }
    }
  }
  
  changeFilter = (event) => {
    this.setState({filters: {type: event.target.value}})
  }
  
  onFindPetsClick = (event) => {
    let fetchPath = "/api/pets"
    
    if (this.state.filters.type !== "all") {
      fetchPath = fetchPath + `?type=${this.state.filters.type}`
    }
        
    fetch(fetchPath)
    .then(response => response.json())
    .then(data => {
      this.setState({pets: data})
    })
    
  }
  
  onAdoptPet = (petID) => {
    const toAdopt = this.state.pets.find(pet => pet.id === petID)
    toAdopt.isAdopted = true
    const newPets = this.state.pets.map(pet => {
      return pet.id === petID ? pet : isAdopted
    })
    this.setState({pets: newPets})
  }

  render() {
    return (
      <div className="ui container">
        <header>
          <h1 className="ui dividing header">React Animal Shelter</h1>
        </header>
        <div className="ui container">
          <div className="ui grid">
            <div className="four wide column">
              <Filters onChangeType={this.changeFilter} onFindPetsClick={this.onFindPetsClick} />
            </div>
            <div className="twelve wide column">
              <PetBrowser onAdoptPet={this.onAdoptPet} pets={this.state.pets}/>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default App
