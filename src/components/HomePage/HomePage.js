import Header from './Header';
import NavBar from './NavBar';
import Card from './Card';
import Footer from './Footer';
import { useEffect, useState } from 'react';

function HomePage(props) {

  const [restaurants, setRestaurants] = useState([])
  const [findRestaurants, setFindRestaurants] = useState([])
  const [currentRestaurant, setCurrentRestaurant] = useState({})
  const [reviews, setReviews] = useState([])


  const BASE_URL_RESTAURANT_SERVICE = "http://localhost:8081/api/";
  const BASE_URL_USER_SERVICE = "http://localhost:8081/api/";
  const BASE_URL_REVIEW_SERVICE = "http://jumpfinalprojectreviews-env.eba-5yianuah.us-east-1.elasticbeanstalk.com";

  useEffect(()=>{
    fetchAllRestaurants();
    fetchAllReviews();
  },[])

  const fetchAllRestaurants = async () => {
    try{
      fetch(`http://localhost:8081/api/book`, {
        method: 'GET',
        headers:{
        Accept: 'application/json',
                 'Content-Type': 'application/json',
                 'Authorization': "Bearer " + props.JWT,
         },
          
      })
          .then(res => res.json())
          .then(data => {
              console.log(data)
          })
  } catch (err) {
      console.error(err);
  }
  }

  const fetchAllReviews = async () => {
    // try {
    //   fetch(`${BASE_URL_REVIEW_SERVICE}/api/reviews`)
    //     .then(res => res.json())
    //     .then(data => {
    //       setReviews(data);
    //     });
    // } catch (err) {
    //   console.error("Getting error: " + err);
    // }
  }

  // const searchRestaurants = (str) => {
  //   if (str) {
  //     setFindRestaurants( restaurants.filter( restaurant=> str === restaurant.name ))
  //   }

  //   if(!str.length){
  //     setFindRestaurants([])
  //   }
  // }

  // const partialSearchRestaurants = (str) => {
  //   if(str){
  //     setFindRestaurants(restaurants.filter(restaurant => restaurant.name.toLowerCase().includes(str.toLowerCase())))
  //   }

  //   if (!str.length) {
  //     setFindRestaurants([])
  //   }
  // }


  useEffect(() => {
    setRestaurants(()=>[]);
      props.restaurants.forEach(restaurant=>{
        setRestaurants(prevState=>([
          ...prevState,
          restaurant
        ]))
      })
  }, [props.restaurants])

  return (
    <div>
      <NavBar currentUser={props.currentUser}/>
      <Header
        searchRestaurants={props.searchRestaurants}
        partialSearchRestaurants={props.partialSearchRestaurants}/>
      <div className = "container">
        <div className = "row justify-content-center">
          {restaurants.map(restaurant => {
            const numberOfReviews = props.reviews.filter(review => review.restaurantId === restaurant.id).length;
              return (
                <Card
                  key={restaurant.id}
                  setFindRestaurants={props.setFindRestaurants}
                  numberOfReviews={numberOfReviews}
                  restaurant={restaurant}
                  setCurrentRestaurant={props.setCurrentRestaurant}
                />
              )
          })}
        </div>
      </div>
      <br></br>
      <br></br>
      <br></br>
      <Footer />
    </div>
  );
}

export default HomePage;
