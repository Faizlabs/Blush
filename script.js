// Blush Chat Application - JavaScript
// Firebase-ready architecture with placeholders for future integration

class BlushApp {
    constructor() {
        this.currentTheme = localStorage.getItem('theme') || 'light';
        this.currentView = 'auth';
        this.currentChat = null;
        this.chats = [];
        this.messages = {};
        this.userProfile = {
            displayName: 'You',
            initials: 'U',
        };

        this.init();
    }

    init() {
        this.setupEventListeners();
        this.applyTheme();
        this.showLoadingScreen();

        // Simulate loading time
        setTimeout(() => {
            this.hideLoadingScreen();
            this.showAuth();
        }, 2000);
    }

    setupEventListeners() {
        // Theme toggle
        const themeToggle = document.getElementById('theme-toggle');
        if (themeToggle) {
            themeToggle.addEventListener('click', () => this.toggleTheme());
        }

        // Auth form switching
        const showSignup = document.getElementById('show-signup');
        const showLogin = document.getElementById('show-login');

        if (showSignup) {
            showSignup.addEventListener('click', (e) => {
                e.preventDefault();
                this.showSignupForm();
            });
        }

        if (showLogin) {
            showLogin.addEventListener('click', (e) => {
                e.preventDefault();
                this.showLoginForm();
            });
        }

        // Auth forms
        const loginForm = document.querySelector('#login-form form');
        const signupForm = document.querySelector('#signup-form form');

        if (loginForm) {
            loginForm.addEventListener('submit', (e) => this.handleLogin(e));
        }

        if (signupForm) {
            signupForm.addEventListener('submit', (e) => this.handleSignup(e));
        }

        const searchInput = document.getElementById('search-input');
        if (searchInput) {
            searchInput.addEventListener('input', (e) => this.filterChats(e.target.value));
        }

        const navItems = document.querySelectorAll('.nav-item');
        navItems.forEach(item => {
            item.addEventListener('click', () => {
                const view = item.getAttribute('data-view');
                if (view === 'settings') {
                    this.showSettings();
                } else if (view === 'chats') {
                    this.showChats();
                }
            });
        });

        const profileForm = document.getElementById('profile-form');
        if (profileForm) {
            profileForm.addEventListener('submit', (e) => this.handleProfileSave(e));
        }
    }

    // Theme Management
    applyTheme() {
        document.documentElement.setAttribute('data-theme', this.currentTheme);
        const themeIcon = document.querySelector('.theme-icon');
        if (themeIcon) {
            themeIcon.textContent = this.currentTheme === 'light' ? '🌙' : '☀️';
        }
    }

    toggleTheme() {
        this.currentTheme = this.currentTheme === 'light' ? 'dark' : 'light';
        localStorage.setItem('theme', this.currentTheme);
        this.applyTheme();
    }

    // Loading Screen
    showLoadingScreen() {
        const loadingScreen = document.getElementById('loading-screen');
        if (loadingScreen) {
            loadingScreen.classList.remove('hidden');
        }
    }

    hideLoadingScreen() {
        const loadingScreen = document.getElementById('loading-screen');
        if (loadingScreen) {
            loadingScreen.classList.add('hidden');
        }
    }

    // Authentication
    showAuth() {
        this.currentView = 'auth';
        const authContainer = document.getElementById('auth-container');
        const app = document.getElementById('app');

        if (authContainer) authContainer.classList.remove('hidden');
        if (app) app.classList.add('hidden');
    }

    showSignupForm() {
        const loginForm = document.getElementById('login-form');
        const signupForm = document.getElementById('signup-form');

        if (loginForm) loginForm.classList.add('hidden');
        if (signupForm) signupForm.classList.remove('hidden');
    }

    showLoginForm() {
        const loginForm = document.getElementById('login-form');
        const signupForm = document.getElementById('signup-form');

        if (signupForm) signupForm.classList.add('hidden');
        if (loginForm) loginForm.classList.remove('hidden');
    }

    async handleLogin(e) {
        e.preventDefault();

        const email = document.getElementById('login-email').value;
        const password = document.getElementById('login-password').value;

        if (!email || !password) {
            alert('Please fill in all fields');
            return;
        }

        // Firebase Auth placeholder
        // In future: await firebase.auth().signInWithEmailAndPassword(email, password);

        // Simulate login success
        this.showMainApp();
    }

    async handleSignup(e) {
        e.preventDefault();

        const email = document.getElementById('signup-email').value;
        const password = document.getElementById('signup-password').value;
        const confirmPassword = document.getElementById('signup-confirm-password').value;

        if (!email || !password || !confirmPassword) {
            alert('Please fill in all fields');
            return;
        }

        if (password !== confirmPassword) {
            alert('Passwords do not match');
            return;
        }

        // Firebase Auth placeholder
        // In future: await firebase.auth().createUserWithEmailAndPassword(email, password);

        // Simulate signup success
        this.showMainApp();
    }

    // Main App
    showMainApp() {
        this.currentView = 'app';
        const authContainer = document.getElementById('auth-container');
        const app = document.getElementById('app');

        if (authContainer) authContainer.classList.add('hidden');
        if (app) app.classList.remove('hidden');

        this.updateUserProfileUI();
        this.showChats();
        this.renderChatList();
    }

    showChats() {
        this.currentView = 'chats';
        this.setActiveNav('chats');
        this.toggleViewVisibility();
    }

    showSettings() {
        this.currentView = 'settings';
        this.setActiveNav('settings');
        this.toggleViewVisibility();
        this.populateProfileForm();
    }

    setActiveNav(view) {
        const navItems = document.querySelectorAll('.nav-item');
        navItems.forEach(item => {
            item.classList.toggle('active', item.getAttribute('data-view') === view);
        });
    }

    toggleViewVisibility() {
        const chatEmptyState = document.getElementById('chat-empty-state');
        const settingsPanel = document.getElementById('settings-panel');

        if (chatEmptyState) {
            chatEmptyState.classList.toggle('hidden', this.currentView !== 'chats');
        }

        if (settingsPanel) {
            settingsPanel.classList.toggle('hidden', this.currentView !== 'settings');
        }
    }

    populateProfileForm() {
        const displayNameInput = document.getElementById('display-name-input');
        if (displayNameInput) {
            displayNameInput.value = this.userProfile.displayName;
        }

        this.updateProfilePreview();
    }

    updateUserProfileUI() {
        const sidebarName = document.getElementById('sidebar-display-name');
        const sidebarAvatar = document.getElementById('sidebar-avatar');
        const profileAvatarPreview = document.getElementById('profile-avatar-preview');
        const profileNamePreview = document.getElementById('profile-name-preview');

        if (sidebarName) {
            sidebarName.textContent = this.userProfile.displayName;
        }

        if (sidebarAvatar) {
            sidebarAvatar.textContent = this.userProfile.initials;
        }

        if (profileAvatarPreview) {
            profileAvatarPreview.textContent = this.userProfile.initials;
        }

        if (profileNamePreview) {
            profileNamePreview.textContent = this.userProfile.displayName;
        }
    }

    updateProfilePreview() {
        const profileAvatarPreview = document.getElementById('profile-avatar-preview');
        const profileNamePreview = document.getElementById('profile-name-preview');

        if (profileAvatarPreview) {
            profileAvatarPreview.textContent = this.userProfile.initials;
        }

        if (profileNamePreview) {
            profileNamePreview.textContent = this.userProfile.displayName;
        }
    }

    handleProfileSave(e) {
        e.preventDefault();

        const displayNameInput = document.getElementById('display-name-input');
        const saveButton = document.getElementById('save-profile-button');
        if (!displayNameInput) return;

        const newName = displayNameInput.value.trim();
        if (!newName) {
            alert('Please enter a display name.');
            return;
        }

        this.userProfile.displayName = newName;
        this.userProfile.initials = this.getInitials(newName);
        this.updateUserProfileUI();

        if (saveButton) {
            saveButton.textContent = 'Saved';
            saveButton.disabled = true;
            setTimeout(() => {
                if (saveButton) {
                    saveButton.textContent = 'Save changes';
                    saveButton.disabled = false;
                }
            }, 1400);
        }
    }

    getInitials(name) {
        const words = name.split(' ').filter(Boolean);
        if (words.length === 0) return 'U';
        if (words.length === 1) return words[0].slice(0, 2).toUpperCase();
        return (words[0][0] + words[1][0]).toUpperCase();
    }

    // Chat Management
    renderChatList() {
        const chatList = document.getElementById('chat-list');
        if (!chatList) return;

        chatList.innerHTML = '';

        if (!this.chats || this.chats.length === 0) {
            const placeholder = document.createElement('div');
            placeholder.className = 'chat-empty-list';
            placeholder.innerHTML = `
                <p>No conversations are loaded yet.</p>
                <p>Once your account connects, your current chats will appear here.</p>
            `;
            chatList.appendChild(placeholder);
            return;
        }

        Object.values(this.chats).forEach(chat => {
            const chatItem = document.createElement('div');
            chatItem.className = `chat-item ${this.currentChat === chat.id ? 'active' : ''}`;
            chatItem.onclick = () => this.selectChat(chat.id);

            chatItem.innerHTML = `
                <div class="chat-item-avatar">${chat.avatar}</div>
                <div class="chat-item-info">
                    <div class="chat-item-name">${chat.name}</div>
                    <div class="chat-item-last-message">${chat.lastMessage}</div>
                </div>
                <div class="chat-item-time">${chat.time}</div>
            `;

            chatList.appendChild(chatItem);
        });
    }

    filterChats(query) {
        const chatItems = document.querySelectorAll('.chat-item');
        const lowerQuery = query.toLowerCase();

        chatItems.forEach(item => {
            const name = item.querySelector('.chat-item-name').textContent.toLowerCase();
            const message = item.querySelector('.chat-item-last-message').textContent.toLowerCase();

            if (name.includes(lowerQuery) || message.includes(lowerQuery)) {
                item.style.display = 'flex';
            } else {
                item.style.display = 'none';
            }
        });
    }

}

// Firebase placeholders for future integration
class FirebaseService {
    // Authentication
    static async signIn(email, password) {
        // return await firebase.auth().signInWithEmailAndPassword(email, password);
        console.log('Firebase sign in placeholder');
    }

    static async signUp(email, password) {
        // return await firebase.auth().createUserWithEmailAndPassword(email, password);
        console.log('Firebase sign up placeholder');
    }

    static async signOut() {
        // return await firebase.auth().signOut();
        console.log('Firebase sign out placeholder');
    }

    // Realtime Database
    static async sendMessage(chatId, message) {
        // const db = firebase.database();
        // return await db.ref(`chats/${chatId}/messages`).push(message);
        console.log('Firebase send message placeholder');
    }

    static listenForMessages(chatId, callback) {
        // const db = firebase.database();
        // db.ref(`chats/${chatId}/messages`).on('value', callback);
        console.log('Firebase listen messages placeholder');
    }

    // User status
    static async setOnlineStatus(userId, status) {
        // const db = firebase.database();
        // return await db.ref(`users/${userId}/online`).set(status);
        console.log('Firebase online status placeholder');
    }
}

// Initialize app when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.app = new BlushApp();
});