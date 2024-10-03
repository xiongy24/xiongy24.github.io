document.addEventListener('DOMContentLoaded', function() {
    const searchInput = document.getElementById('search-input');
    const searchButton = document.getElementById('search-button');

    function performSearch() {
        const searchTerm = searchInput.value.toLowerCase().trim();
        if (searchTerm === '') {
            alert('请输入搜索内容');
            return;
        }

        // 获取所有文章标题
        const articles = document.querySelectorAll('#latest-articles li a');
        let found = false;

        articles.forEach(article => {
            const title = article.textContent.toLowerCase();
            if (title.includes(searchTerm)) {
                article.scrollIntoView({ behavior: 'smooth' });
                article.style.backgroundColor = 'yellow';
                setTimeout(() => {
                    article.style.backgroundColor = '';
                }, 3000);
                found = true;
            }
        });

        if (!found) {
            alert('未找到匹配的文章');
        }
    }

    searchButton.addEventListener('click', performSearch);
    searchInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            performSearch();
        }
    });

    // Page navigation functionality
    const navLinks = document.querySelectorAll('nav a[data-page]');
    const pages = document.querySelectorAll('.page');
    const logoLink = document.querySelector('.logo a');

    function showPage(pageId) {
        pages.forEach(page => {
            page.classList.remove('active');
        });
        const targetPage = document.getElementById(pageId);
        if (targetPage) {
            targetPage.classList.add('active');
        }
    }

    function handleNavClick(e) {
        e.preventDefault();
        const pageId = this.getAttribute('data-page');
        showPage(pageId);
    }

    navLinks.forEach(link => {
        link.addEventListener('click', handleNavClick);
    });

    // Add click event listener to logo
    if (logoLink) {
        logoLink.addEventListener('click', handleNavClick);
    }

    // Handle "了解更多" button
    const learnMoreBtn = document.querySelector('.btn[data-page="about"]');
    if (learnMoreBtn) {
        learnMoreBtn.addEventListener('click', function(e) {
            e.preventDefault();
            showPage('about');
        });
    }

    // Load Markdown file functionality
    const articleList = document.getElementById('article-list');
    const articleContent = document.getElementById('article-content');

    articleList.addEventListener('click', function(e) {
        e.preventDefault();
        const link = e.target.closest('a');
        if (link && link.hasAttribute('data-md')) {
            const mdFile = link.getAttribute('data-md');
            loadMarkdownFile(mdFile);
        }
    });

    function loadMarkdownFile(file) {
        fetch(file)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.text();
            })
            .then(text => {
                articleContent.innerHTML = marked.parse(text);
                articleList.style.display = 'none';
                articleContent.style.display = 'block';
            })
            .catch(error => {
                console.error('Error loading the Markdown file:', error);
                articleContent.innerHTML = '<p>Error loading article. Please try again later.</p>';
            });
    }

    // Add return button functionality
    const backButton = document.createElement('button');
    backButton.textContent = '返回文章列表';
    backButton.style.display = 'none';
    articleContent.parentNode.insertBefore(backButton, articleContent);

    backButton.addEventListener('click', function() {
        articleList.style.display = 'block';
        articleContent.style.display = 'none';
        backButton.style.display = 'none';
    });

    articleList.addEventListener('click', function() {
        backButton.style.display = 'block';
    });
});
