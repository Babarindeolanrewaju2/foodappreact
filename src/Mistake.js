import './App.css';
import {data} from './data.js';
import React, { useState, useEffect } from "react";

function Mistake() {
const [meals, setMeals] = useState([]);
const [text, setText] = useState('');
const [otherCategories, setOtherCategories] = useState([]);
const [categoriesMeals, setCategoriesMeals] = useState([]);
const [filterMeals, setFilterMeals] = useState([]);
const [delivery, setDelivery] = useState("");
const [sort, setSort] = useState(undefined);
const [categories, setCategories] = useState([]);
const [title, setTitle] =  useState("All meals");
const [rating, setRating] =  useState([]);

useEffect(() => {
    const { meals } = data
    console.log("ok to request");
    setFilterMeals(meals);
    setCategoriesMeals(meals);
    setMeals(meals);
  }, []);

const handleDelivery = (e) => {
    console.log(e.target.value)
    setRating("");
    setText("");
    setSort("");
    setCategories([]);
    setDelivery(e.target.value);
    setTitle(e.target.value);
};

useEffect(() => {
    console.log(delivery)
    if(delivery === 'Delivery') {
        setFilterMeals([...meals.filter(meal => meal.delivery)])
    } 
    if(delivery === 'Take away') {
        setFilterMeals([...meals.filter(meal => meal.takeaway)])
    }
  }, [delivery, meals]);

const handleSort = (e) => {
    setRating("");
    setDelivery("");
    setText("");
    setCategories([]);
    setSort(e.target.value);
    setTitle(e.target.value);
    console.log(e.target.value)
};

useEffect(() => {
    if(sort === "Recommended") {
        setFilterMeals([...meals.filter(meal => meal.recommended)])
    } 
    if(sort === '15') {
        setFilterMeals([...meals.filter(meal => meal.discount <= 15)])
    }
    if(sort === 'All Offers') {
        setFilterMeals([...meals.filter(meal => meal.offer)])
    }
    if(sort === 'Top Rated') {
        setFilterMeals([...meals.filter(meal => meal.toprated)])
    }
    if(sort === 'low to high') {
        setFilterMeals([...meals.sort((mealA,mealB) => (parseFloat(mealA.price) - parseFloat(mealB.price)))])
    }
    if(sort === 'Distance') {
        setFilterMeals([...meals.filter(meal => meal.near)])
    }
  }, [sort, meals]);

const handleCategories = (e) => {
    setRating("");
    setDelivery("");
    setText("");
    setSort("");
    setTitle(e.target.value);
    let localCategories = [...categories];
    if (localCategories.find(category => category === e.target.value) !== undefined) {
        // eslint-disable-next-line no-const-assign
        localCategories = localCategories.filter(category => category !== e.target.value)
      }else{
        // eslint-disable-next-line no-const-assign
        localCategories = [...categories, e.target.value]
    }
    setCategories([...localCategories])
    setOtherCategories([...localCategories])
};

const handleRating = (e) => {
    // console.log(e.target.value)
    setDelivery("");
    setText("");
    setSort("");
    setTitle("");
    setCategories([]);
    let localRating = [...rating];
    if (localRating.find(rating => rating === e.target.value) !== undefined) {
        // eslint-disable-next-line no-const-assign
        localRating = localRating.filter(rating => rating !== e.target.value)
        
      }else{
        // eslint-disable-next-line no-const-assign
        localRating = [...rating, e.target.value]
    }
    setRating([...localRating])
};

useEffect(() => {
    if(rating.length) {
        setFilterMeals([...meals.filter(meal => 
            rating.some(element => parseInt(element) <= meal.rating
        ))])}else {
        setFilterMeals([...meals])
    }
    // console.log('Do something after counter has changed', otherCategories);
 }, [rating, meals]);


useEffect(() => {
    if(text.length){
      setFilterMeals([...meals.filter(meal => meal.name.toLowerCase().includes(text.toLowerCase()))])
      console.log(text)
    }else{
     setFilterMeals([...meals])
    }
    // console.log('Do something after counter has changed', otherCategories);
 }, [meals, text]);

const handleSearch = (e) => {
    setRating("");
    setDelivery("");
    setSort("");
    setCategories([]);
    setTitle(e.target.value);
    setText(e.target.value)
}

useEffect(() => {
    if(otherCategories.length) {
        setFilterMeals([...categoriesMeals.filter(meal => otherCategories.includes(meal.category))])
    }else {
        setFilterMeals([...categoriesMeals])
    }
    // console.log('Do something after counter has changed', otherCategories);
 }, [otherCategories, categoriesMeals]);

  return (
    <div className="App">
      <div className="App-header">
      <main>
       <div className="page_header element_to_stick">
          <div className="container">
            <div className="row">
              <div className="col-xl-8 col-lg-7 col-md-7 d-none d-md-block">
                  <h1>145 restaurants in Convent Street 2983</h1>
                  <a href="!#">Change address</a>
              </div>
              <div className="col-xl-4 col-lg-5 col-md-5">
                <div className="search_bar_list">
                <input type="text" className="form-control" value={text} onChange={handleSearch} placeholder="Dishes, restaurants or cuisines" />
                <button type="submit"><i className="icon_search"></i></button>
              </div>
              </div>
            </div>
          </div>
      </div>

      <div className="container margin_30_20">			
        <div className="row">
          <aside className="col-lg-3" id="sidebar_fixed">
            <div className="type_delivery">
              <ul className="clearfix">
                  <li>
                      <label className="container_radio">Delivery
                          <input type="radio" name="Delivery" value="Delivery" checked={delivery === "Delivery"} onChange={handleDelivery} />
                          <span className="checkmark"></span>
                      </label>
                  </li>
                  <li>
                      <label className="container_radio">Take away
                          <input type="radio" name="Take away" value="Take away" checked={delivery === "Take away"} onChange={handleDelivery}/>
                          <span className="checkmark"></span>
                      </label>
                  </li>
              </ul>
            </div>
          
            <a href="!#" className="open_filters btn_filters"><i className="icon_adjust-vert"></i><span>Filters</span></a>
          
            <div className="filter_col">
              <div className="inner_bt clearfix">Filters<a href="!#" className="open_filters"><i className="icon_close"></i></a></div>
              <div className="filter_type">
                <h4><a href="#filter_1" data-toggle="collapse" className="opened">Sort</a></h4>
                <div className="collapse show" id="filter_1">
                  <ul>
                      <li>
                          <label className="container_radio">Top Rated
                              <input type="radio" name="filter_sort" value="Top Rated" checked={sort === "Top Rated"} onChange={handleSort} />
                              <span className="checkmark"></span>
                          </label>
                      </li>
                      <li>
                          <label className="container_radio">Recommended
                              <input type="radio" name="filter_sort" value="Recommended" checked={sort === "Recommended"} onChange={handleSort} />
                              <span className="checkmark"></span>
                          </label>
                      </li>
                      <li>
                          <label className="container_radio">Price: low to high
                              <input type="radio" name="filter_sort" value="low to high" checked={sort === "low to high"} onChange={handleSort} />
                              <span className="checkmark"></span>
                          </label>
                      </li>
                      <li>
                          <label className="container_radio">Up to 15% off
                              <input type="radio" name="filter_sort" value="15" checked={sort === "15"} onChange={handleSort} />
                              <span className="checkmark"></span>
                          </label>
                      </li>
                       <li>
                          <label className="container_radio">All Offers
                              <input type="radio" name="filter_sort" value="All Offers" checked={sort === "All Offers"} onChange={handleSort}/>
                              <span className="checkmark"></span>
                          </label>
                      </li>
                      <li>
                          <label className="container_radio">Distance
                              <input type="radio" name="filter_sort" value="Distance" checked={sort === "Distance"} onChange={handleSort}/>
                              <span className="checkmark"></span>
                          </label>
                      </li>
                  </ul>
                </div>
              </div>

              <div className="filter_type">
                <h4><a href="#filter_2" data-toggle="collapse" className="opened">Categories</a></h4>
                <div className="collapse show" id="filter_2">
                  <ul>
                      <li>
                          <label className="container_check">Pizza - Italian <small>12</small>
                              <input type="checkbox" value="Pizza - Italian" checked={categories.includes("Pizza - Italian")}
                              onClick={handleCategories}
                              onChange={e => e.stopPropagation()}/>
                              <span className="checkmark"></span>
                          </label>
                      </li>
                      <li>
                          <label className="container_check">Japanese - Sushi <small>24</small>
                              <input type="checkbox" value="Japanese - Sushi" checked={categories.includes("Japanese - Sushi")}
                              onClick={handleCategories}
                              onChange={e => e.stopPropagation()}/>
                              <span className="checkmark"></span>
                          </label>
                      </li>
                      <li>
                          <label className="container_check">Burghers <small>23</small>
                              <input type="checkbox" value="Burghers" checked={categories.includes("Burghers")}
                              onClick={handleCategories}
                              onChange={e => e.stopPropagation()}/>
                              <span className="checkmark"></span>
                          </label>
                      </li>
                      <li>
                          <label className="container_check">Vegetarian <small>11</small>
                              <input type="checkbox" value="Vegetarian" checked={categories.includes("Vegetarian")}
                              onClick={handleCategories}
                              onChange={e => e.stopPropagation()}/>
                              <span className="checkmark"></span>
                          </label>
                      </li>
                      <li>
                          <label className="container_check">Bakery <small>18</small>
                              <input type="checkbox" value="Bakery" checked={categories.includes("Bakery")}
                              onClick={handleCategories}
                              onChange={e => e.stopPropagation()}/>
                              <span className="checkmark"></span>
                          </label>
                      </li>
                      <li>
                          <label className="container_check">Chinese <small>12</small>
                              <input type="checkbox" value="Chinese" checked={categories.includes("Chinese")}
                              onClick={handleCategories}
                              onChange={e => e.stopPropagation()}/>
                              <span className="checkmark"></span>
                          </label>
                      </li>
                      <li>
                          <label className="container_check">Mexican <small>15</small>
                              <input type="checkbox" value="Mexican" checked={categories.includes("Mexican")}
                              onClick={handleCategories}
                              onChange={e => e.stopPropagation()}/>
                              <span className="checkmark"></span>
                          </label>
                      </li>
                  </ul>
                </div>
              </div>

              <div className="filter_type last">
                <h4><a href="#filter_4" data-toggle="collapse" className="opened">Rating</a></h4>
                <div className="collapse show" id="filter_4">
                  <ul>
                      <li>
                          <label className="container_check">Superb 9+ <small>06</small>
                              <input type="checkbox" value={9} checked={rating.includes('9')}
                              onClick={handleRating}
                              onChange={e => e.stopPropagation()}/>
                              <span className="checkmark"></span>
                          </label>
                      </li>
                      <li>
                          <label className="container_check">Very Good 8+ <small>12</small>
                              <input type="checkbox"  value={8} checked={rating.includes('8')}
                              onClick={handleRating}
                              onChange={e => e.stopPropagation()}/>
                              <span className="checkmark"></span>
                          </label>
                      </li>
                      <li>
                          <label className="container_check">Good 7+ <small>17</small>
                              <input type="checkbox"  value={7} checked={rating.includes('7')}
                              onClick={handleRating}
                              onChange={e => e.stopPropagation()}/>
                              <span className="checkmark"></span>
                          </label>
                      </li>
                      <li>
                          <label className="container_check">Pleasant 6+ <small>43</small>
                              <input type="checkbox" value={6} checked={rating.includes('6')}
                              onClick={handleRating}
                              onChange={e => e.stopPropagation()}/>
                              <span className="checkmark"></span>
                          </label>
                      </li>
                  </ul>
                </div>
              </div>

              {/*<p><a href="!#" className="btn_1 outline full-width">Filter</a></p>*/}.
            </div>
          </aside>

          <div className="col-lg-9">
          <div className="row">
              <div className="col-12">
                  <h2 className="title_small">Top Categories</h2>
                  <div className="owl-carousel owl-theme categories_carousel_in listing">
                      <div className="item">
                          <figure>
                              <img src={"img/cat_listing_placeholder.png"} data-src="img/cat_listing_1.jpg" alt="" className="owl-lazy" />
                              <a href="!#"><h3>Pizza</h3></a>
                          </figure>
                      </div>
                      <div className="item">
                          <figure>
                              <img src="img/cat_listing_placeholder.png" data-src="img/cat_listing_2.jpg" alt="" className="owl-lazy" />
                              <a href="!#"><h3>Sushi</h3></a>
                          </figure>
                      </div>
                      <div className="item">
                          <figure>
                              <img src="img/cat_listing_placeholder.png" data-src="img/cat_listing_3.jpg" alt="" className="owl-lazy" />
                              <a href="!#"><h3>Dessert</h3></a>
                          </figure>
                      </div>
                      <div className="item">
                          <figure>
                              <img src="img/cat_listing_placeholder.png" data-src="img/cat_listing_4.jpg" alt="" className="owl-lazy" />
                              <a href="!#"><h3>Hamburgher</h3></a>
                          </figure>
                      </div>
                      <div className="item">
                          <figure>
                              <img src="img/cat_listing_placeholder.png" data-src="img/cat_listing_5.jpg" alt="" className="owl-lazy" />
                              <a href="!#"><h3>Ice Cream</h3></a>
                          </figure>
                      </div>
                      <div className="item">
                          <figure>
                              <img src="img/cat_listing_placeholder.png" data-src="img/cat_listing_6.jpg" alt="" className="owl-lazy" />
                              <a href="!#"><h3>Kebab</h3></a>
                          </figure>
                      </div>
                      <div className="item">
                          <figure>
                              <img src="img/cat_listing_placeholder.png" data-src="img/cat_listing_7.jpg" alt="" className="owl-lazy" />
                              <a href="!#"><h3>Italian</h3></a>
                          </figure>
                      </div>
                      <div className="item">
                          <figure>
                              <img src={"img/cat_listing_placeholder.png"} data-src="img/cat_listing_8.jpg" alt="" className="owl-lazy" />
                              <a href="!#"><h3>Chinese</h3></a>
                          </figure>
                      </div>	
                  </div>



          <div className="promo">
              <h3>Free Delivery for your first 14 days!</h3>
              <p>Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip.</p>
              <i className="icon-food_icon_delivery"></i>
          </div>
          
          <div className="row">

              <div className="col-12"><h2 className="title_small">{['Pizza - Italian', 'Japanese - Sushi', 'Burghers', 'Vegetarian', 'Bakery', 'Chinese', 'Mexican'].includes(title) ? "Categories" : title}</h2></div>
              {filterMeals?.map((meal) => (
                <>
              <div className="col-xl-4 col-lg-6 col-md-6 col-sm-6">
                  <div className="strip">
                      <figure>
                          <span className="ribbon off">15% off</span>
                          <img src={"img/lazy-placeholder.png"} data-src="img/location_1.jpg" className="img-fluid lazy" alt="" />
                          <a href="detail-restaurant.html" className="strip_info">
                              <small>{meal.category}</small>
                              <div className="item_title">
                                  <h3>{meal.name}</h3>
                                  <small>{meal.location}</small>
                              </div>
                          </a>
                      </figure>
                      <ul>
                          <li><span className={"take " + (meal.takeaway ? 'yes' : 'no')}>Takeaway</span> <span className={"deliv " + (meal.delivery ? 'yes' : 'no')}>Delivery</span></li>
                          <li>
                              <div className="score"><strong>{meal.rating}</strong></div>
                          </li>
                      </ul>
                  </div>
              </div>
              </>
              ))}
          </div>

      </div>
      </div>
      </div>
      </div>
    </div>
    </main>
    </div>
    </div>
  );
}

export default Mistake;
