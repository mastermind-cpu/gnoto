// Navigation functionality
document.addEventListener('DOMContentLoaded', function() {
    // Navigation buttons
    const navButtons = document.querySelectorAll('.nav-btn');
    const categoryButtons = document.querySelectorAll('.category-btn');
    const movieCards = document.querySelectorAll('.movie-card');
    const featuredCards = document.querySelectorAll('.featured-card');

    // Handle navigation switching
    navButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove active class from all nav buttons
            navButtons.forEach(btn => btn.classList.remove('active'));
            // Add active class to clicked button
            this.classList.add('active');
            
            // You can add logic here to filter content based on navigation
            const category = this.dataset.category;
            console.log(`Switched to ${category} section`);
        });
    });

    // Handle category filtering
    categoryButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove active class from all category buttons
            categoryButtons.forEach(btn => btn.classList.remove('active'));
            // Add active class to clicked button
            this.classList.add('active');
            
            // Filter content based on category
            const filter = this.dataset.filter;
            filterMovies(filter);
            
            // Update section title
            const sectionTitle = document.querySelector('.section-header h3');
            sectionTitle.textContent = `Trending in ${this.textContent}`;
        });
    });

    // Movie filtering function
    function filterMovies(category) {
        movieCards.forEach(card => {
            // Add fade out effect
            card.style.opacity = '0.5';
            card.style.transform = 'scale(0.95)';
            
            // Reset after animation
            setTimeout(() => {
                card.style.opacity = '1';
                card.style.transform = 'scale(1)';
            }, 200);
        });
        
        console.log(`Filtering movies by: ${category}`);
    }

    // Movie card hover effects
    movieCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-8px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
        
        card.addEventListener('click', function() {
            const movieTitle = this.querySelector('h4').textContent;
            console.log(`Playing: ${movieTitle}`);
            // Add your movie playing logic here
        });
    });

    // Featured card interactions
    featuredCards.forEach(card => {
        const playBtn = card.querySelector('.play-btn');
        
        playBtn.addEventListener('click', function(e) {
            e.stopPropagation();
            const movieTitle = card.querySelector('h2').textContent;
            console.log(`Playing featured movie: ${movieTitle}`);
            
            // Add loading state
            this.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Loading...';
            
            // Reset after 2 seconds (simulate loading)
            setTimeout(() => {
                this.innerHTML = '<i class="fas fa-play"></i> Let Play Moview';
            }, 2000);
        });
    });

    // Search functionality
    const searchBtn = document.querySelector('.search-btn');
    searchBtn.addEventListener('click', function() {
        // Create search input if it doesn't exist
        let searchInput = document.querySelector('.search-input');
        
        if (!searchInput) {
            searchInput = document.createElement('input');
            searchInput.type = 'text';
            searchInput.className = 'search-input';
            searchInput.placeholder = 'Search movies...';
            searchInput.style.cssText = `
                background: rgba(255, 255, 255, 0.1);
                border: none;
                color: white;
                padding: 8px 12px;
                border-radius: 20px;
                margin-left: 8px;
                outline: none;
                width: 200px;
                transition: all 0.3s ease;
            `;
            
            this.parentNode.appendChild(searchInput);
            searchInput.focus();
            
            // Handle search input
            searchInput.addEventListener('input', function() {
                const searchTerm = this.value.toLowerCase();
                filterMoviesBySearch(searchTerm);
            });
            
            // Remove search input when clicking outside
            document.addEventListener('click', function(e) {
                if (!searchInput.contains(e.target) && !searchBtn.contains(e.target)) {
                    searchInput.remove();
                }
            });
        }
    });

    // Search filtering function
    function filterMoviesBySearch(searchTerm) {
        movieCards.forEach(card => {
            const movieTitle = card.querySelector('h4').textContent.toLowerCase();
            
            if (movieTitle.includes(searchTerm)) {
                card.style.display = 'block';
                card.style.opacity = '1';
            } else {
                card.style.opacity = '0.3';
            }
        });
    }

    // Profile dropdown functionality
    const profile = document.querySelector('.profile');
    profile.addEventListener('click', function() {
        console.log('Profile menu clicked');
        // Add profile dropdown logic here
    });

    // Notification functionality
    const notification = document.querySelector('.notification');
    notification.addEventListener('click', function() {
        const badge = this.querySelector('.notification-badge');
        badge.style.display = 'none';
        console.log('Notifications viewed');
    });

    // Smooth scrolling for better UX
    document.querySelectorAll('button').forEach(button => {
        button.addEventListener('click', function() {
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = 'scale(1)';
            }, 100);
        });
    });

    // Add loading states for better UX
    function showLoading() {
        const loadingOverlay = document.createElement('div');
        loadingOverlay.className = 'loading-overlay';
        loadingOverlay.innerHTML = '<i class="fas fa-spinner fa-spin"></i>';
        loadingOverlay.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.5);
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 24px;
            color: white;
            z-index: 1000;
        `;
        document.body.appendChild(loadingOverlay);
        
        setTimeout(() => {
            loadingOverlay.remove();
        }, 1500);
    }

    // Initialize tooltips for better accessibility
    const buttons = document.querySelectorAll('button[data-filter], button[data-category]');
    buttons.forEach(button => {
        button.title = `Switch to ${button.textContent} section`;
    });
});