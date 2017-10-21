const clientId = '21VHRRNF6vuZxGH319WMFg';
const secret = 'dL6jwvTq5oZRXFF9Zmnr0N2B9GvjlvX73MqkI3AZIjgNbBR2KJKqDVejTIiwOHSo';
let accessToken;
const Yelp = {
  // method to get access token
  getAccessToken() {
    // if access token return
    if(accessToken) {
      return new Promise((resolve) => resolve(accessToken));
    }
    // otherwise fetch access token
    return fetch(`https://cors-anywhere.herokuapp.com/https://api.yelp.com/oauth2/token?grant_type=client_credentials&client_id=${clientId}&client_secret=${secret}`,
      { method: 'POST'}
    ).then(response => {
      return response.json();
    }).then(jsonResponse => {
      accessToken = jsonResponse.access_token;
    });
  },

  // method to retrieve search results
  search(term, location, sortBy) {
    return Yelp.getAccessToken().then(() => {
       fetch(`https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/search?term=${term}&location=${location}&sort_by=${sortBy}`,{
         headers: {Authorization: `Bearer ${accessToken}`}})
       .then(response => response.json())
       .then(jsonResponse => {
         if(jsonResponse.businesses) {
           let res = jsonResponse.businesses.map(business => ({
               id: business.id,
               imageSrc: business.image_url,
               name: business.name,
               address: business.location.address1,
               city: business.location.city,
               state: business.location.state,
               zipCode: business.location.zip_code,
               category: business.categories[0].title,
               rating: business.rating,
               reviewCount: business.review_count
             })
           );
           console.log('json response mapped: ', res);
           return res;
         }
       })
    })
  }
};

export default Yelp;
