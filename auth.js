/**
 * Axedia Dashboard Authentication System
 *
 * This is a demo authentication system using localStorage.
 * In production, this would be replaced with a real backend.
 */

const Auth = {
    // Demo user accounts
    users: [
        {
            id: 'admin-1',
            email: 'admin@axedia.io',
            password: 'demo123',
            role: 'admin',
            name: 'Axedia Admin',
            initials: 'AA'
        },
        {
            id: 'client-1',
            email: 'contact@sharplaw.com',
            password: 'sharp123',
            role: 'client',
            name: 'Sharp Law LLP',
            initials: 'SL',
            clientId: 'sharp-law'
        },
        {
            id: 'client-2',
            email: 'contact@russofirm.com',
            password: 'russo123',
            role: 'client',
            name: 'The Russo Firm',
            initials: 'RF',
            clientId: 'russo-firm'
        }
    ],

    // Client data for demo (different stats per client)
    clientData: {
        'sharp-law': {
            name: 'Sharp Law LLP',
            initials: 'SL',
            stats: {
                totalLeads: 247,
                qualifiedLeads: 183,
                liveTransfers: 156,
                signedCases: 89,
                costPerLead: 127
            }
        },
        'russo-firm': {
            name: 'The Russo Firm',
            initials: 'RF',
            stats: {
                totalLeads: 312,
                qualifiedLeads: 245,
                liveTransfers: 198,
                signedCases: 112,
                costPerLead: 98
            }
        }
    },

    // Storage key
    SESSION_KEY: 'axedia_session',

    /**
     * Attempt to log in with email and password
     * @param {string} email
     * @param {string} password
     * @returns {object} { success: boolean, message?: string, user?: object }
     */
    login(email, password) {
        const user = this.users.find(u =>
            u.email.toLowerCase() === email.toLowerCase() &&
            u.password === password
        );

        if (!user) {
            return {
                success: false,
                message: 'Invalid email or password. Please try again.'
            };
        }

        // Create session
        const session = {
            userId: user.id,
            email: user.email,
            name: user.name,
            initials: user.initials,
            role: user.role,
            clientId: user.clientId || null,
            loginTime: Date.now()
        };

        // Save to localStorage
        localStorage.setItem(this.SESSION_KEY, JSON.stringify(session));

        return {
            success: true,
            user: session
        };
    },

    /**
     * Log out the current user
     */
    logout() {
        localStorage.removeItem(this.SESSION_KEY);
        window.location.href = 'login.html';
    },

    /**
     * Check if user is currently logged in
     * @returns {boolean}
     */
    isLoggedIn() {
        const session = this.getSession();
        return session !== null;
    },

    /**
     * Get current session data
     * @returns {object|null}
     */
    getSession() {
        const data = localStorage.getItem(this.SESSION_KEY);
        if (!data) return null;

        try {
            return JSON.parse(data);
        } catch (e) {
            return null;
        }
    },

    /**
     * Check if current user is admin
     * @returns {boolean}
     */
    isAdmin() {
        const session = this.getSession();
        return session && session.role === 'admin';
    },

    /**
     * Get all clients (for admin dropdown)
     * @returns {array}
     */
    getAllClients() {
        return Object.entries(this.clientData).map(([id, data]) => ({
            id,
            name: data.name,
            initials: data.initials
        }));
    },

    /**
     * Get client data by ID
     * @param {string} clientId
     * @returns {object|null}
     */
    getClientData(clientId) {
        return this.clientData[clientId] || null;
    },

    /**
     * Get current client ID (for clients, their own; for admin, selected or first)
     * @returns {string}
     */
    getCurrentClientId() {
        const session = this.getSession();
        if (!session) return null;

        if (session.role === 'client') {
            return session.clientId;
        }

        // For admin, check if there's a selected client in storage
        const selectedClient = localStorage.getItem('axedia_selected_client');
        if (selectedClient && this.clientData[selectedClient]) {
            return selectedClient;
        }

        // Default to first client
        return Object.keys(this.clientData)[0];
    },

    /**
     * Set selected client (admin only)
     * @param {string} clientId
     */
    setSelectedClient(clientId) {
        if (this.isAdmin() && this.clientData[clientId]) {
            localStorage.setItem('axedia_selected_client', clientId);
            return true;
        }
        return false;
    },

    /**
     * Require authentication - redirects to login if not logged in
     * Call this at the top of protected pages
     */
    requireAuth() {
        if (!this.isLoggedIn()) {
            window.location.href = 'login.html';
            return false;
        }
        return true;
    }
};

// Make Auth available globally
window.Auth = Auth;
