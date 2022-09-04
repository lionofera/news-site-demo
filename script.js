    const loadData = newsItems => {
        fetch('https://openapi.programming-hero.com/api/news/categories')
        .then(res => res.json())
        .then(data => displayCategories(data.data.news_category))
    }

    const displayCategories = categories => {
     const categoriesContainer = document.getElementById('categories-container');
     categories.forEach(category => {
       //console.log(category);
        const categoryDiv = document.createElement('div');
        categoryDiv.classList.add('category');
        categoryDiv.innerHTML = `
        <h3 class="p-3" onclick="showNewsInCategory('${category.category_id}')">${category.category_name}</h3>
        `;
        categoriesContainer.appendChild(categoryDiv);
    })
    }

    const showNewsInCategory = (id) => {
       //console.log("show id")
       const url = `https://openapi.programming-hero.com/api/news/category/${id}`
       fetch(url)
       .then(res => res.json())
       .then(data => displayCategoryNews(data.data))
    }

    const displayCategoryNews = allnews => {
      const allNewsContainer = document.getElementById('all-news');
      allNewsContainer.innerHTML = "";
      allnews.forEach(news => {
          const newsDiv = document.createElement('div');
          newsDiv.classList.add('news');
          newsDiv.innerHTML = `
        <div class="card mb-3" style="max-width: 540px;">
          <div class="row g-0">
            <div class="col-md-4">
               <img src="${news.thumbnail_url? news.thumbnail_url : 'no image!'}" class="img-fluid rounded-start" alt="...">
            </div>
           <div class="col-md-8">
           <div class="card-body">
              <h5 class="card-title">${news.title}</h5>
              <p class="card-text text-truncate">${news.details.slice(0,250)}</p>
              <div class="d-flex justify-content-center align-items-center space-around">
                <img src="${news.author.img}" class="rounded-circle w-25" alt="...">
                <h5>${news.author.name}</h5>
                <p class=""><i class="fa-solid fa-eye"></i>${news.total_view}</p>
                <button type="button" class="btn btn-info" data-bs-toggle="modal" data-bs-target="#showNewsDetailsModal" onclick = "showMore('${news._id}')"><i class="fa-solid fa-angles-right"></i></button>
              </div>
           </div>
          </div>
         </div>
        </div>
        `;
        //
        allNewsContainer.appendChild(newsDiv);
      })
  
      }
      const showMore = async news_id => {
         const url= ` https://openapi.programming-hero.com/api/news/${news_id}`;
         const res = await fetch(url);
         const data = await res.json();
         showNewsDetails(data.data[0]);
      }

      const showNewsDetails = news => {
         const modalTitle = document.getElementById('showNewsDetailsModalLabel');
         modalTitle.innerText = news.title;
         const modalPublish = document.getElementById('showPublishDetails');
         modalPublish.innerText = news.author.published_date;
      }

    loadData()