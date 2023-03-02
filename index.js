let movieNameRef = document.getElementById("movie-name");
let searchBtn = document.getElementById("search-btn");
let year = document.getElementById("year");
let result = document.getElementById("result");

// function to fetch data from api

let getMovie = () => {
  let movieName = movieNameRef.value;
  let y = year.value;
  let url = `//www.omdbapi.com/?t=${movieName}&y=${y}&apikey=${key}`;

  // if input failed empty

  if (movieName.length <= 0) {
    result.innerHTML = `<h3 class="msg" >Please enter a movie name...</h3>`;
  }
  // if isn't empty
  else {
    fetch(url)
      .then((resp) => resp.json())
      .then((data) => {
        //if movie exits in database
        if (data.Response == "True") {
          result.innerHTML = `
          <div class="info">
          <img src=${data.Poster} class="poster">
          <div>
              <h2>${data.Title}</h2>
              <div class="rating">
                  <img src="star-svgrepo-com.svg">
                  <h4>${data.imdbRating}</h4>
              </div>
              <div class="details">
                  <span>${data.Rated}</span>
                  <span>${data.Year}</span>
                  <span>${data.Runtime}</span>
              </div>
                    <div class="genre">
                        <div>${data.Genre.split(",").join("</div><div>")}</div>
                    </div>
                </div>
            </div>
                <h3>Plot:</h3>
                <p>${data.Plot}</p>
                <h3>Cast:</h3>
                <p>${data.Actors}</p>
            `;
        }

        // if movie doesn't exist in the database
        else {
          result.innerHTML = `<h3 class="msg">${data.Error}</h3>`;
        }
      })
      // if error occurs
      .catch(() => {
        result.innerHTML = `<h3 class="msg">Error Occured</h3>`;
      });
  }
};

searchBtn.addEventListener("click", getMovie);
window.addEventListener("load", getMovie);
