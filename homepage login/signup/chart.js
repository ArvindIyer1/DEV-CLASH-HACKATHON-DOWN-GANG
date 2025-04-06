// Add this script at the end of the body tag
document.addEventListener('DOMContentLoaded', function() {
  // Initialize charts if Chart.js is loaded
  if (typeof Chart !== 'undefined') {
    // Spending Overview Chart
    const spendingChartCtx = document.getElementById('spendingChart');
    if (spendingChartCtx) {
      const spendingChart = new Chart(spendingChartCtx, {
        type: 'line',
        data: {
          labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
          datasets: [{
            label: 'Expenses',
            data: [24500, 32000, 18000, 24000],
            backgroundColor: 'rgba(255, 57, 57, 0.2)',
            borderColor: '#ff3939',
            borderWidth: 2,
            tension: 0.3,
            pointBackgroundColor: '#ff3939'
          }, {
            label: 'Income',
            data: [0, 65000, 0, 0],
            backgroundColor: 'rgba(57, 255, 20, 0.2)',
            borderColor: '#39ff14',
            borderWidth: 2,
            tension: 0.3,
            pointBackgroundColor: '#39ff14'
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          scales: {
            y: {
              beginAtZero: true,
              grid: {
                color: 'rgba(255, 255, 255, 0.1)'
              },
              ticks: {
                color: '#a0a0a0',
                callback: function(value) {
                  return '₹' + value.toLocaleString('en-IN');
                }
              }
            },
            x: {
              grid: {
                color: 'rgba(255, 255, 255, 0.1)'
              },
              ticks: {
                color: '#a0a0a0'
              }
            }
          },
          plugins: {
            legend: {
              labels: {
                color: '#ffffff'
              }
            }
          }
        }
      });
      
      // Add event listeners for time period buttons
      document.getElementById('weekBtn').addEventListener('click', function() {
        updateActiveButton(this);
        spendingChart.data.labels = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
        spendingChart.data.datasets[0].data = [3500, 2800, 4200, 3000, 5600, 4300, 3600];
        spendingChart.data.datasets[1].data = [0, 0, 0, 65000, 0, 0, 0];
        spendingChart.update();
      });
      
      document.getElementById('monthBtn').addEventListener('click', function() {
        updateActiveButton(this);
        spendingChart.data.labels = ['Week 1', 'Week 2', 'Week 3', 'Week 4'];
        spendingChart.data.datasets[0].data = [24500, 32000, 18000, 24000];
        spendingChart.data.datasets[1].data = [0, 65000, 0, 0];
        spendingChart.update();
      });
      
      document.getElementById('yearBtn').addEventListener('click', function() {
        updateActiveButton(this);
        spendingChart.data.labels = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        spendingChart.data.datasets[0].data = [85000, 92000, 88000, 98500, 0, 0, 0, 0, 0, 0, 0, 0];
        spendingChart.data.datasets[1].data = [60000, 62000, 62000, 65000, 0, 0, 0, 0, 0, 0, 0, 0];
        spendingChart.update();
      });
    }
    
    // Category Chart (Pie chart)
    const categoryChartCtx = document.getElementById('categoryChart');
    if (categoryChartCtx) {
      const categoryChart = new Chart(categoryChartCtx, {
        type: 'doughnut',
        data: {
          labels: ['Housing', 'Food', 'Transport', 'Entertainment', 'Utilities', 'Others'],
          datasets: [{
            data: [30000, 25000, 15000, 12000, 10000, 6500],
            backgroundColor: [
              '#39ff14', // Green
              '#14a4ff', // Blue
              '#ff3939', // Red
              '#ffa500', // Orange
              '#9945ff', // Purple
              '#f7f7f7'  // Light Gray
            ],
            borderColor: '#2c2c2c',
            borderWidth: 2
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: {
              position: 'right',
              labels: {
                color: '#ffffff',
                padding: 15
              }
            },
            tooltip: {
              callbacks: {
                label: function(context) {
                  let label = context.label || '';
                  if (label) {
                    label += ': ';
                  }
                  let value = context.parsed;
                  label += '₹' + value.toLocaleString('en-IN');
                  return label;
                }
              }
            }
          }
        }
      });
    }
  }
  
  // Helper function to update active button state
  function updateActiveButton(clickedBtn) {
    // Remove active class from all buttons in the group
    const btnGroup = clickedBtn.parentElement;
    const buttons = btnGroup.querySelectorAll('.btn');
    buttons.forEach(btn => btn.classList.remove('active'));
    
    // Add active class to clicked button
    clickedBtn.classList.add('active');
  }
  
  // Mark all notifications as read functionality
  const markAllReadBtn = document.getElementById('markAllReadBtn');
  if (markAllReadBtn) {
    markAllReadBtn.addEventListener('click', function() {
      const unreadNotifications = document.querySelectorAll('.notification-item.unread');
      unreadNotifications.forEach(notification => {
        notification.classList.remove('unread');
      });
      
      const notificationBadge = document.querySelector('.notification-badge');
      if (notificationBadge) {
        notificationBadge.style.display = 'none';
      }
      
      showToast('All notifications marked as read.');
    });
  }
  
  // Helper function to show toast notifications
  function showToast(message, type = 'success') {
    // Already defined in the main script, this is just a fallback
    if (typeof window.showToast !== 'function') {
      // Create toast container if it doesn't exist
      if (!document.querySelector('.toast-container')) {
        const toastContainer = document.createElement('div');
        toastContainer.className = 'toast-container';
        document.body.appendChild(toastContainer);
      }
      
      // Create toast element
      const toastId = `toast-${Date.now()}`;
      const toast = document.createElement('div');
      toast.className = `toast custom-toast ${type === 'error' ? 'border-danger' : 'border-success'} show`;
      toast.id = toastId;
      toast.setAttribute('role', 'alert');
      toast.setAttribute('aria-live', 'assertive');
      toast.setAttribute('aria-atomic', 'true');
      
      toast.innerHTML = `
        <div class="toast-header bg-transparent border-0">
          <strong class="me-auto">FinMate</strong>
          <button type="button" class="btn-close" data-bs-dismiss="toast" aria-label="Close"></button>
        </div>
        <div class="toast-body">
          ${message}
        </div>
      `;
      
      // Add toast to container
      document.querySelector('.toast-container').appendChild(toast);
      
      // Remove toast after 3 seconds
      setTimeout(() => {
        toast.remove();
      }, 3000);
    }
  }
});