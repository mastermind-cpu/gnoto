document.addEventListener('DOMContentLoaded', function() {
    // Profile navigation tabs
    const profileNavBtns = document.querySelectorAll('.profile-nav-btn');
    const tabPanes = document.querySelectorAll('.tab-pane');
    
    profileNavBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            // Remove active class from all buttons
            profileNavBtns.forEach(navBtn => navBtn.classList.remove('active'));
            // Add active class to clicked button
            this.classList.add('active');
            
            // Show corresponding tab content
            const tabId = this.dataset.tab;
            tabPanes.forEach(pane => {
                pane.classList.remove('active');
                if (pane.id === tabId) {
                    pane.classList.add('active');
                }
            });
        });
    });
    
    // Watchlist item interactions
    const watchlistItems = document.querySelectorAll('.watchlist-item');
    
    watchlistItems.forEach(item => {
        item.addEventListener('click', function() {
            const title = this.querySelector('h4').textContent;
            const progress = this.querySelector('.progress-filled').style.width;
            
            console.log(`Opening ${title} - Progress: ${progress}`);
            
            // Simulate navigation to player page
            // In a real app, this would redirect to the player page
            simulateLoading();
        });
    });
    
    // Play button in watchlist overlay
    const overlayBtns = document.querySelectorAll('.overlay-btn');
    
    overlayBtns.forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.stopPropagation(); // Prevent triggering the parent click event
            
            const title = this.closest('.watchlist-item').querySelector('h4').textContent;
            console.log(`Playing ${title} immediately`);
            
            // Simulate navigation to player page
            simulateLoading();
        });
    });
    
    // Profile action buttons
    const editProfileBtn = document.querySelector('.profile-btn.primary');
    const settingsBtn = document.querySelector('.profile-btn:not(.primary)');
    
    editProfileBtn.addEventListener('click', function() {
        console.log('Edit profile clicked');
        
        // Create a modal for editing profile
        createModal('Edit Profile', `
            <div class="edit-profile-form">
                <div class="form-group">
                    <label>Display Name</label>
                    <input type="text" value="Sarah Johnson" class="form-input">
                </div>
                <div class="form-group">
                    <label>Username</label>
                    <input type="text" value="sarahj" class="form-input">
                </div>
                <div class="form-group">
                    <label>Email</label>
                    <input type="email" value="sarah.j@example.com" class="form-input">
                </div>
                <div class="form-group">
                    <label>Bio</label>
                    <textarea class="form-input" rows="3">Movie enthusiast and animation lover.</textarea>
                </div>
                <div class="form-actions">
                    <button class="cancel-btn">Cancel</button>
                    <button class="save-btn">Save Changes</button>
                </div>
            </div>
        `);
    });
    
    settingsBtn.addEventListener('click', function() {
        console.log('Settings clicked');
        
        // Switch to settings tab
        document.querySelector('.profile-nav-btn[data-tab="settings"]').click();
    });
    
    // Upgrade plan button
    const upgradeBtn = document.querySelector('.upgrade-btn');
    
    upgradeBtn.addEventListener('click', function() {
        console.log('Upgrade plan clicked');
        
        // Create a modal for plan upgrade
        createModal('Upgrade Your Plan', `
            <div class="upgrade-plans">
                <div class="plan-card">
                    <div class="plan-header">
                        <h4>Standard</h4>
                        <span class="plan-price">$8.99/month</span>
                    </div>
                    <ul class="plan-features">
                        <li>HD Quality</li>
                        <li>Watch on 2 devices</li>
                        <li>Limited downloads</li>
                        <li>Ad-free experience</li>
                    </ul>
                    <button class="plan-btn">Select Plan</button>
                </div>
                
                <div class="plan-card active">
                    <div class="plan-badge">Current</div>
                    <div class="plan-header">
                        <h4>Premium</h4>
                        <span class="plan-price">$12.99/month</span>
                    </div>
                    <ul class="plan-features">
                        <li>4K Ultra HD</li>
                        <li>Watch on 4 devices</li>
                        <li>Unlimited downloads</li>
                        <li>Ad-free experience</li>
                    </ul>
                    <button class="plan-btn active">Current Plan</button>
                </div>
                
                <div class="plan-card">
                    <div class="plan-badge">New</div>
                    <div class="plan-header">
                        <h4>Family</h4>
                        <span class="plan-price">$16.99/month</span>
                    </div>
                    <ul class="plan-features">
                        <li>4K Ultra HD</li>
                        <li>Watch on 6 devices</li>
                        <li>Unlimited downloads</li>
                        <li>Ad-free experience</li>
                        <li>Family controls</li>
                    </ul>
                    <button class="plan-btn">Upgrade</button>
                </div>
            </div>
        `);
    });
    
    // Helper function to create modals
    function createModal(title, content) {
        // Remove any existing modals
        const existingModal = document.querySelector('.modal-overlay');
        if (existingModal) {
            existingModal.remove();
        }
        
        // Create modal elements
        const modalOverlay = document.createElement('div');
        modalOverlay.className = 'modal-overlay';
        
        const modalContent = document.createElement('div');
        modalContent.className = 'modal-content';
        
        const modalHeader = document.createElement('div');
        modalHeader.className = 'modal-header';
        
        const modalTitle = document.createElement('h3');
        modalTitle.textContent = title;
        
        const closeBtn = document.createElement('button');
        closeBtn.className = 'modal-close';
        closeBtn.innerHTML = '<i class="fas fa-times"></i>';
        
        const modalBody = document.createElement('div');
        modalBody.className = 'modal-body';
        modalBody.innerHTML = content;
        
        // Assemble modal
        modalHeader.appendChild(modalTitle);
        modalHeader.appendChild(closeBtn);
        
        modalContent.appendChild(modalHeader);
        modalContent.appendChild(modalBody);
        
        modalOverlay.appendChild(modalContent);
        
        // Add modal to document
        document.body.appendChild(modalOverlay);
        
        // Add modal styles
        const modalStyles = `
            .modal-overlay {
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: rgba(0, 0, 0, 0.8);
                display: flex;
                align-items: center;
                justify-content: center;
                z-index: 1000;
                animation: fadeIn 0.3s ease;
            }
            
            .modal-content {
                background: rgba(30, 39, 46, 0.95);
                border-radius: 16px;
                width: 90%;
                max-width: 600px;
                max-height: 90vh;
                overflow-y: auto;
                animation: scaleIn 0.3s ease;
            }
            
            .modal-header {
                display: flex;
                justify-content: space-between;
                align-items: center;
                padding: 20px;
                border-bottom: 1px solid rgba(255, 255, 255, 0.1);
            }
            
            .modal-header h3 {
                font-size: 18px;
                font-weight: 600;
            }
            
            .modal-close {
                background: transparent;
                border: none;
                color: rgba(255, 255, 255, 0.7);
                font-size: 18px;
                cursor: pointer;
                transition: color 0.3s ease;
            }
            
            .modal-close:hover {
                color: white;
            }
            
            .modal-body {
                padding: 20px;
            }
            
            .form-group {
                margin-bottom: 20px;
            }
            
            .form-group label {
                display: block;
                margin-bottom: 8px;
                font-size: 14px;
                color: rgba(255, 255, 255, 0.7);
            }
            
            .form-input {
                width: 100%;
                padding: 10px;
                background: rgba(255, 255, 255, 0.1);
                border: 1px solid rgba(255, 255, 255, 0.2);
                border-radius: 8px;
                color: white;
                font-size: 14px;
            }
            
            .form-input:focus {
                outline: none;
                border-color: #3498db;
            }
            
            .form-actions {
                display: flex;
                justify-content: flex-end;
                gap: 10px;
                margin-top: 20px;
            }
            
            .cancel-btn {
                background: rgba(255, 255, 255, 0.1);
                border: none;
                color: white;
                padding: 10px 20px;
                border-radius: 20px;
                cursor: pointer;
                font-size: 14px;
                transition: all 0.3s ease;
            }
            
            .cancel-btn:hover {
                background: rgba(255, 255, 255, 0.2);
            }
            
            .save-btn {
                background: linear-gradient(135deg, #3498db 0%, #2980b9 100%);
                border: none;
                color: white;
                padding: 10px 20px;
                border-radius: 20px;
                cursor: pointer;
                font-size: 14px;
                transition: all 0.3s ease;
            }
            
            .save-btn:hover {
                background: linear-gradient(135deg, #2980b9 0%, #2573a7 100%);
            }
            
            .upgrade-plans {
                display: grid;
                grid-template-columns: repeat(auto-fit, minmax(160px, 1fr));
                gap: 15px;
            }
            
            .plan-card {
                background: rgba(255, 255, 255, 0.05);
                border-radius: 12px;
                padding: 20px;
                text-align: center;
                position: relative;
                transition: all 0.3s ease;
            }
            
            .plan-card:hover {
                background: rgba(255, 255, 255, 0.1);
            }
            
            .plan-card.active {
                background: rgba(52, 152, 219, 0.2);
                border: 1px solid rgba(52, 152, 219, 0.5);
            }
            
            .plan-badge {
                position: absolute;
                top: -10px;
                right: -10px;
                background: #e74c3c;
                color: white;
                padding: 5px 10px;
                border-radius: 10px;
                font-size: 12px;
                font-weight: 500;
            }
            
            .plan-header {
                margin-bottom: 15px;
            }
            
            .plan-header h4 {
                font-size: 18px;
                font-weight: 600;
                margin-bottom: 5px;
            }
            
            .plan-price {
                font-size: 14px;
                color: rgba(255, 255, 255, 0.7);
            }
            
            .plan-features {
                list-style: none;
                padding: 0;
                margin: 0 0 20px 0;
                text-align: left;
            }
            
            .plan-features li {
                padding: 8px 0;
                font-size: 14px;
                border-bottom: 1px solid rgba(255, 255, 255, 0.1);
            }
            
            .plan-features li:last-child {
                border-bottom: none;
            }
            
            .plan-btn {
                background: rgba(255, 255, 255, 0.1);
                border: none;
                color: white;
                padding: 8px 16px;
                border-radius: 20px;
                cursor: pointer;
                font-size: 14px;
                width: 100%;
                transition: all 0.3s ease;
            }
            
            .plan-btn:hover {
                background: rgba(255, 255, 255, 0.2);
            }
            
            .plan-btn.active {
                background: #3498db;
                cursor: default;
            }
            
            @keyframes fadeIn {
                from { opacity: 0; }
                to { opacity: 1; }
            }
            
            @keyframes scaleIn {
                from { transform: scale(0.9); opacity: 0; }
                to { transform: scale(1); opacity: 1; }
            }
            
            @media (max-width: 480px) {
                .upgrade-plans {
                    grid-template-columns: 1fr;
                }
            }
        `;
        
        // Add styles to document
        const styleElement = document.createElement('style');
        styleElement.textContent = modalStyles;
        document.head.appendChild(styleElement);
        
        // Add event listeners
        closeBtn.addEventListener('click', function() {
            modalOverlay.remove();
            styleElement.remove();
        });
        
        // Close on overlay click
        modalOverlay.addEventListener('click', function(e) {
            if (e.target === modalOverlay) {
                modalOverlay.remove();
                styleElement.remove();
            }
        });
        
        // Close on cancel button click
        const cancelBtn = modalOverlay.querySelector('.cancel-btn');
        if (cancelBtn) {
            cancelBtn.addEventListener('click', function() {
                modalOverlay.remove();
                styleElement.remove();
            });
        }
        
        // Handle save button click
        const saveBtn = modalOverlay.querySelector('.save-btn');
        if (saveBtn) {
            saveBtn.addEventListener('click', function() {
                console.log('Changes saved');
                modalOverlay.remove();
                styleElement.remove();
                
                // Show success message
                showToast('Profile updated successfully!');
            });
        }
        
        // Handle plan selection
        const planBtns = modalOverlay.querySelectorAll('.plan-btn:not(.active)');
        planBtns.forEach(btn => {
            btn.addEventListener('click', function() {
                const planName = this.closest('.plan-card').querySelector('h4').textContent;
                console.log(`Selected plan: ${planName}`);
                
                modalOverlay.remove();
                styleElement.remove();
                
                // Show success message
                showToast(`Plan changed to ${planName}!`);
            });
        });
    }