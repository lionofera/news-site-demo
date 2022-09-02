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
       .then(data => displayCategoryNews(data.data[0]))
    }

    const displayCategoryNews = allnews => {
        
        
        const allNewsContainer = document.getElementById('all-news');
        allnews.forEach(news => {
        const newsDiv = document.createElement('div');
        newsDiv.classList.add('news');
        newsDiv.innerHTML = `
        <div class="card mb-3" style="max-width: 540px;">
          <div class="row g-0">
            <div class="col-md-4">
               <img src="..." class="img-fluid rounded-start" alt="...">
            </div>
           <div class="col-md-8">
           <div class="card-body">
              <h5 class="card-title">Card title</h5>
              <p class="card-text">This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
              <p class="card-text"><small class="text-muted">Last updated 3 mins ago</small></p>
           </div>
          </div>
         </div>
        </div>
        `;
        allNewsContainer.appendChild(newsDiv);
    })

    }

    loadData()