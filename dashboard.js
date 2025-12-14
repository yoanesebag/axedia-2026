// ============================================
// AXEDIA CLIENT DASHBOARD
// JavaScript functionality
// ============================================

document.addEventListener('DOMContentLoaded', function() {
    // Check authentication first
    if (!Auth.requireAuth()) {
        return; // Will redirect to login
    }

    // Initialize authentication UI
    initAuthUI();

    // Initialize dashboard
    initNavigation();
    initModal();
    initFilters();
    initPlayButtons();
});

// ============================================
// AUTHENTICATION UI
// ============================================

function initAuthUI() {
    const session = Auth.getSession();
    if (!session) return;

    // Update user info in sidebar
    const userAvatar = document.getElementById('userAvatar');
    const userName = document.getElementById('userName');
    const userRole = document.getElementById('userRole');

    if (userAvatar) userAvatar.textContent = session.initials;
    if (userName) userName.textContent = session.name;
    if (userRole) userRole.textContent = session.role === 'admin' ? 'Administrator' : 'Client';

    // Setup logout button
    const logoutBtn = document.getElementById('logoutBtn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', function() {
            if (confirm('Are you sure you want to sign out?')) {
                Auth.logout();
            }
        });
    }

    // Setup client selector for admin
    if (Auth.isAdmin()) {
        setupClientSelector();
    }

    // Update dashboard data based on current client
    updateDashboardForClient();
}

function setupClientSelector() {
    const clientSelector = document.getElementById('clientSelector');
    const clientSelect = document.getElementById('clientSelect');

    if (!clientSelector || !clientSelect) return;

    // Show the selector
    clientSelector.style.display = 'block';

    // Populate options
    const clients = Auth.getAllClients();
    const currentClientId = Auth.getCurrentClientId();

    clients.forEach(client => {
        const option = document.createElement('option');
        option.value = client.id;
        option.textContent = client.name;
        if (client.id === currentClientId) {
            option.selected = true;
        }
        clientSelect.appendChild(option);
    });

    // Handle client change
    clientSelect.addEventListener('change', function() {
        Auth.setSelectedClient(this.value);
        updateDashboardForClient();
    });
}

function updateDashboardForClient() {
    const clientId = Auth.getCurrentClientId();
    const clientData = Auth.getClientData(clientId);

    if (!clientData) return;

    // Update stats if on overview
    const statCards = document.querySelectorAll('.stat-card');
    if (statCards.length >= 5 && clientData.stats) {
        const stats = clientData.stats;

        // Total Leads
        const totalLeadsValue = statCards[0].querySelector('.stat-value');
        if (totalLeadsValue) totalLeadsValue.textContent = stats.totalLeads;

        // Qualified Leads
        const qualifiedValue = statCards[1].querySelector('.stat-value');
        if (qualifiedValue) qualifiedValue.textContent = stats.qualifiedLeads;

        // Live Transfers
        const transfersValue = statCards[2].querySelector('.stat-value');
        if (transfersValue) transfersValue.textContent = stats.liveTransfers;

        // Signed Cases
        const signedValue = statCards[3].querySelector('.stat-value');
        if (signedValue) signedValue.textContent = stats.signedCases;

        // Cost Per Lead
        const cplValue = statCards[4].querySelector('.stat-value');
        if (cplValue) cplValue.textContent = '$' + stats.costPerLead;

        // Update qualification rate
        const qualRate = Math.round((stats.qualifiedLeads / stats.totalLeads) * 100);
        const qualChange = statCards[1].querySelector('.stat-change span');
        if (qualChange) qualChange.textContent = qualRate + '% qualification rate';

        // Update transfer rate
        const transferRate = Math.round((stats.liveTransfers / stats.qualifiedLeads) * 100);
        const transferChange = statCards[2].querySelector('.stat-change span');
        if (transferChange) transferChange.textContent = transferRate + '% of qualified';

        // Update conversion rate
        const convRate = Math.round((stats.signedCases / stats.liveTransfers) * 100);
        const convChange = statCards[3].querySelector('.stat-change span');
        if (convChange) convChange.textContent = convRate + '% conversion';
    }

    // Update page subtitle if admin is viewing a client
    if (Auth.isAdmin()) {
        const pageSubtitle = document.querySelector('.page-subtitle');
        if (pageSubtitle && pageSubtitle.textContent.includes('at a glance')) {
            pageSubtitle.textContent = `Viewing ${clientData.name}'s performance`;
        }
    }
}

// ============================================
// NAVIGATION
// ============================================

function initNavigation() {
    const navItems = document.querySelectorAll('.nav-item');
    const sections = document.querySelectorAll('.dashboard-section');
    const pageTitle = document.querySelector('.page-title');
    const pageSubtitle = document.querySelector('.page-subtitle');

    // Section titles and subtitles
    const sectionInfo = {
        overview: {
            title: 'Overview',
            subtitle: 'Your lead generation performance at a glance'
        },
        leads: {
            title: 'Leads',
            subtitle: 'View and manage all your leads'
        },
        calls: {
            title: 'Call Recordings',
            subtitle: 'Listen to qualification calls and view transcripts'
        },
        compliance: {
            title: 'Compliance',
            subtitle: 'Access consent records and documentation'
        },
        reports: {
            title: 'Reports',
            subtitle: 'Download weekly and monthly reports'
        }
    };

    navItems.forEach(item => {
        item.addEventListener('click', function(e) {
            e.preventDefault();

            const sectionId = this.getAttribute('data-section');

            // Update active nav item
            navItems.forEach(nav => nav.classList.remove('active'));
            this.classList.add('active');

            // Show corresponding section
            sections.forEach(section => {
                section.classList.remove('active');
                if (section.id === sectionId) {
                    section.classList.add('active');
                }
            });

            // Update page title and subtitle
            if (sectionInfo[sectionId]) {
                pageTitle.textContent = sectionInfo[sectionId].title;
                pageSubtitle.textContent = sectionInfo[sectionId].subtitle;
            }
        });
    });

    // Handle "View All" links
    const viewAllLinks = document.querySelectorAll('.view-all');
    viewAllLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetSection = this.getAttribute('data-section');

            // Find and click the corresponding nav item
            const targetNav = document.querySelector(`.nav-item[data-section="${targetSection}"]`);
            if (targetNav) {
                targetNav.click();
            }
        });
    });
}

// ============================================
// MODAL
// ============================================

function initModal() {
    const modal = document.getElementById('leadModal');
    const modalOverlay = modal.querySelector('.modal-overlay');
    const modalClose = modal.querySelector('.modal-close');
    const viewButtons = document.querySelectorAll('.btn-icon[title="View Details"]');

    // Open modal when clicking view details
    viewButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            // Get lead data from the row
            const row = this.closest('tr');
            if (row) {
                const name = row.querySelector('.lead-name')?.textContent || '';
                const phone = row.querySelector('.lead-phone')?.textContent || '';
                const email = row.querySelector('.lead-email')?.textContent || '';
                const status = row.querySelector('.status-tag')?.textContent || '';
                const statusClass = row.querySelector('.status-tag')?.className || '';
                const source = row.querySelector('.source-tag')?.textContent || '';
                const date = row.querySelector('.lead-date')?.textContent || '';

                // Populate modal
                document.getElementById('modalName').textContent = name;
                document.getElementById('modalPhone').textContent = phone;
                document.getElementById('modalEmail').textContent = email || 'N/A';
                document.getElementById('modalSource').textContent = source;
                document.getElementById('modalDate').textContent = date + ' at 2:31 PM';

                const modalStatus = document.getElementById('modalStatus');
                modalStatus.textContent = status;
                modalStatus.className = statusClass;
            }

            modal.classList.add('active');
            document.body.style.overflow = 'hidden';
        });
    });

    // Close modal
    function closeModal() {
        modal.classList.remove('active');
        document.body.style.overflow = '';
    }

    modalOverlay.addEventListener('click', closeModal);
    modalClose.addEventListener('click', closeModal);

    // Close on escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && modal.classList.contains('active')) {
            closeModal();
        }
    });
}

// ============================================
// FILTERS
// ============================================

function initFilters() {
    const statusFilter = document.getElementById('statusFilter');
    const sourceFilter = document.getElementById('sourceFilter');
    const searchInput = document.getElementById('leadSearch');
    const dateRange = document.getElementById('dateRange');

    // Status filter
    if (statusFilter) {
        statusFilter.addEventListener('change', function() {
            filterLeads();
        });
    }

    // Source filter
    if (sourceFilter) {
        sourceFilter.addEventListener('change', function() {
            filterLeads();
        });
    }

    // Search
    if (searchInput) {
        searchInput.addEventListener('input', debounce(function() {
            filterLeads();
        }, 300));
    }

    // Date range
    if (dateRange) {
        dateRange.addEventListener('change', function() {
            // In a real app, this would fetch new data
            console.log('Date range changed to:', this.value);
        });
    }
}

function filterLeads() {
    const statusFilter = document.getElementById('statusFilter');
    const sourceFilter = document.getElementById('sourceFilter');
    const searchInput = document.getElementById('leadSearch');

    const statusValue = statusFilter?.value || 'all';
    const sourceValue = sourceFilter?.value || 'all';
    const searchValue = searchInput?.value.toLowerCase() || '';

    // Get all lead rows in the leads section
    const leadsSection = document.getElementById('leads');
    const rows = leadsSection?.querySelectorAll('.data-table tbody tr') || [];

    rows.forEach(row => {
        let showRow = true;

        // Filter by status
        if (statusValue !== 'all') {
            const statusTag = row.querySelector('.status-tag');
            if (statusTag) {
                const status = statusTag.textContent.toLowerCase().replace(' ', '-');
                if (!status.includes(statusValue)) {
                    showRow = false;
                }
            }
        }

        // Filter by source
        if (sourceValue !== 'all' && showRow) {
            const sourceTag = row.querySelector('.source-tag');
            if (sourceTag) {
                const source = sourceTag.textContent.toLowerCase();
                if (!source.includes(sourceValue)) {
                    showRow = false;
                }
            }
        }

        // Filter by search
        if (searchValue && showRow) {
            const name = row.querySelector('.lead-name')?.textContent.toLowerCase() || '';
            const phone = row.querySelector('.lead-phone')?.textContent.toLowerCase() || '';
            const email = row.querySelector('.lead-email')?.textContent.toLowerCase() || '';

            if (!name.includes(searchValue) && !phone.includes(searchValue) && !email.includes(searchValue)) {
                showRow = false;
            }
        }

        row.style.display = showRow ? '' : 'none';
    });

    // Update pagination info (simplified)
    updatePaginationInfo();
}

function updatePaginationInfo() {
    const leadsSection = document.getElementById('leads');
    const rows = leadsSection?.querySelectorAll('.data-table tbody tr') || [];
    const visibleRows = Array.from(rows).filter(row => row.style.display !== 'none');

    const paginationInfo = leadsSection?.querySelector('.pagination-info');
    if (paginationInfo) {
        paginationInfo.textContent = `Showing ${visibleRows.length} of ${rows.length} leads`;
    }
}

// ============================================
// AUDIO PLAYER
// ============================================

function initPlayButtons() {
    const playButtons = document.querySelectorAll('.play-btn');

    playButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            const icon = this.querySelector('svg');
            const isPlaying = this.classList.contains('playing');

            // Reset all other buttons
            playButtons.forEach(b => {
                b.classList.remove('playing');
                const i = b.querySelector('svg');
                i.innerHTML = '<polygon points="5 3 19 12 5 21 5 3"/>';
            });

            if (!isPlaying) {
                this.classList.add('playing');
                // Change to pause icon
                icon.innerHTML = '<rect x="6" y="4" width="4" height="16"/><rect x="14" y="4" width="4" height="16"/>';

                // Simulate playback (in real app, would control actual audio)
                simulateWaveform(this.closest('.call-player, .modal-player'));
            }
        });
    });

    // Transcript buttons
    const transcriptButtons = document.querySelectorAll('.transcript-btn');
    transcriptButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            // In a real app, this would show the transcript
            // For now, we'll open the modal with the lead details
            const callItem = this.closest('.call-item');
            if (callItem) {
                const name = callItem.querySelector('.call-name')?.textContent || '';
                alert(`Transcript for ${name} would open here.`);
            }
        });
    });
}

function simulateWaveform(container) {
    if (!container) return;

    const bars = container.querySelectorAll('.waveform-bar');
    let progress = 0;

    const interval = setInterval(() => {
        bars.forEach((bar, index) => {
            if (index <= progress) {
                bar.style.opacity = '1';
            }
        });

        progress++;

        if (progress > bars.length) {
            clearInterval(interval);
            // Reset after "playback"
            setTimeout(() => {
                bars.forEach(bar => bar.style.opacity = '0.6');
                const playBtn = container.querySelector('.play-btn');
                if (playBtn) {
                    playBtn.classList.remove('playing');
                    playBtn.querySelector('svg').innerHTML = '<polygon points="5 3 19 12 5 21 5 3"/>';
                }
            }, 500);
        }
    }, 200);
}

// ============================================
// UTILITIES
// ============================================

function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Export button functionality
const exportBtn = document.querySelector('.btn-secondary');
if (exportBtn && exportBtn.textContent.includes('Export')) {
    exportBtn.addEventListener('click', function() {
        // In a real app, this would trigger a CSV export
        alert('Lead data export would download here.');
    });
}

// Report download buttons
const downloadButtons = document.querySelectorAll('.report-item .btn');
downloadButtons.forEach(btn => {
    btn.addEventListener('click', function() {
        const reportName = this.closest('.report-item')?.querySelector('h4')?.textContent || 'Report';
        alert(`Downloading: ${reportName}`);
    });
});

// Archive download buttons
const archiveButtons = document.querySelectorAll('.archive-item .btn-icon');
archiveButtons.forEach(btn => {
    btn.addEventListener('click', function() {
        const reportName = this.closest('.archive-item')?.querySelector('.archive-name')?.textContent || 'Report';
        alert(`Downloading: ${reportName}`);
    });
});
