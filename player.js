document.addEventListener('DOMContentLoaded', function() {
    // Video player elements
    const video = document.getElementById('main-video');
    const playPauseBtn = document.querySelector('.play-pause');
    const volumeBtn = document.querySelector('.volume');
    const volumeSlider = document.querySelector('.volume-slider input');
    const currentTime = document.querySelector('.current-time');
    const totalTime = document.querySelector('.total-time');
    const progressBar = document.querySelector('.progress-bar');
    const progressFilled = document.querySelector('.progress-filled');
    const fullscreenBtn = document.querySelector('.fullscreen');
    const videoControls = document.querySelector('.video-controls');
    const videoWrapper = document.querySelector('.video-player-wrapper');
    
    // Set video source (for demo purposes)
    video.src = "https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_1mb.mp4";
    
    // Initialize video
    video.addEventListener('loadedmetadata', function() {
        totalTime.textContent = formatTime(video.duration);
        currentTime.textContent = formatTime(0);
    });
    
    // Play/Pause functionality
    playPauseBtn.addEventListener('click', togglePlayPause);
    video.addEventListener('click', togglePlayPause);
    
    function togglePlayPause() {
        if (video.paused) {
            video.play();
            playPauseBtn.innerHTML = '<i class="fas fa-pause"></i>';
        } else {
            video.pause();
            playPauseBtn.innerHTML = '<i class="fas fa-play"></i>';
        }
    }
    
    // Volume control
    volumeBtn.addEventListener('click', function() {
        if (video.muted) {
            video.muted = false;
            volumeBtn.innerHTML = '<i class="fas fa-volume-up"></i>';
            volumeSlider.value = video.volume * 100;
        } else {
            video.muted = true;
            volumeBtn.innerHTML = '<i class="fas fa-volume-mute"></i>';
            volumeSlider.value = 0;
        }
    });
    
    volumeSlider.addEventListener('input', function() {
        const value = this.value / 100;
        video.volume = value;
        
        if (value === 0) {
            volumeBtn.innerHTML = '<i class="fas fa-volume-mute"></i>';
        } else if (value < 0.5) {
            volumeBtn.innerHTML = '<i class="fas fa-volume-down"></i>';
        } else {
            volumeBtn.innerHTML = '<i class="fas fa-volume-up"></i>';
        }
    });
    
    // Progress bar
    video.addEventListener('timeupdate', function() {
        const percent = (video.currentTime / video.duration) * 100;
        progressFilled.style.width = `${percent}%`;
        currentTime.textContent = formatTime(video.currentTime);
    });
    
    progressBar.addEventListener('click', function(e) {
        const pos = (e.pageX - this.offsetLeft) / this.offsetWidth;
        video.currentTime = pos * video.duration;
    });
    
    // Fullscreen
    fullscreenBtn.addEventListener('click', function() {
        if (!document.fullscreenElement) {
            if (videoWrapper.requestFullscreen) {
                videoWrapper.requestFullscreen();
            } else if (videoWrapper.webkitRequestFullscreen) {
                videoWrapper.webkitRequestFullscreen();
            } else if (videoWrapper.msRequestFullscreen) {
                videoWrapper.msRequestFullscreen();
            }
            fullscreenBtn.innerHTML = '<i class="fas fa-compress"></i>';
        } else {
            if (document.exitFullscreen) {
                document.exitFullscreen();
            } else if (document.webkitExitFullscreen) {
                document.webkitExitFullscreen();
            } else if (document.msExitFullscreen) {
                document.msExitFullscreen();
            }
            fullscreenBtn.innerHTML = '<i class="fas fa-expand"></i>';
        }
    });
    
    // Auto-hide controls
    let controlsTimeout;
    
    videoWrapper.addEventListener('mousemove', function() {
        videoControls.style.opacity = '1';
        clearTimeout(controlsTimeout);
        
        controlsTimeout = setTimeout(function() {
            if (!video.paused) {
                videoControls.style.opacity = '0';
            }
        }, 3000);
    });
    
    videoWrapper.addEventListener('mouseleave', function() {
        if (!video.paused) {
            controlsTimeout = setTimeout(function() {
                videoControls.style.opacity = '0';
            }, 1000);
        }
    });
    
    // Format time to MM:SS
    function formatTime(seconds) {
        const minutes = Math.floor(seconds / 60);
        seconds = Math.floor(seconds % 60);
        return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    }
    
    // Related videos interaction
    const relatedVideos = document.querySelectorAll('.related-video');
    
    relatedVideos.forEach(video => {
        video.addEventListener('click', function() {
            // Simulate video change
            const videoTitle = this.querySelector('h4').textContent;
            document.querySelector('.video-title-section h2').textContent = videoTitle;
            
            // Reset video player
            document.getElementById('main-video').currentTime = 0;
            playPauseBtn.innerHTML = '<i class="fas fa-play"></i>';
            
            // Scroll to top of player
            videoWrapper.scrollIntoView({ behavior: 'smooth' });
            
            // Show loading indicator
            const loadingOverlay = document.createElement('div');
            loadingOverlay.className = 'loading-overlay';
            loadingOverlay.innerHTML = '<i class="fas fa-spinner fa-spin"></i>';
            loadingOverlay.style.cssText = `
                position: absolute;
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
                z-index: 10;
            `;
            videoWrapper.appendChild(loadingOverlay);
            
            // Remove loading after 1.5 seconds
            setTimeout(() => {
                loadingOverlay.remove();
            }, 1500);
        });
    });
});