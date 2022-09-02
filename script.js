    const loadData = newsItems => {
        fetch('https://openapi.programming-hero.com/api/news/categories')
        .then(res => res.json())
        .then(data => displayCategories(data.data.news_category))
    }

    const displayCategories = categories => {
     const categoriesContainer = document.getElementById('categories-container');
     categories.forEach(category => {
       console.log(category);
        const categoryDiv = document.createElement('div');
        categoryDiv.classList.add('category');
        categoryDiv.innerHTML = `
        <h3>${category.category_name}</h3>
        `;
        categoriesContainer.appendChild(categoryDiv);
    })
    }

    loadData()