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

    function showPage(pageId) {
        pages.forEach(page => {
            page.classList.remove('active');
        });
        const targetPage = document.getElementById(pageId);
        if (targetPage) {
            targetPage.classList.add('active');
        }
    }

    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const pageId = this.getAttribute('data-page');
            showPage(pageId);
        });
    });

    // Handle "了解更多" button
    const learnMoreBtn = document.querySelector('.btn[data-page="about"]');
    if (learnMoreBtn) {
        learnMoreBtn.addEventListener('click', function(e) {
            e.preventDefault();
            showPage('about');
        });
    }
});
