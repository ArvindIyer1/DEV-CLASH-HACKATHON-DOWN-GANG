// Functions for the Bill Splitter tab
document.addEventListener('DOMContentLoaded', function() {
  // Handle number of people input change
  const numPeopleInput = document.getElementById('numPeople');
  const peopleContainer = document.getElementById('peopleContainer');
  
  if(numPeopleInput) {
    numPeopleInput.addEventListener('change', function() {
      updatePeopleInputs(parseInt(this.value));
    });
  }
  
  function updatePeopleInputs(count) {
    if(!peopleContainer) return;
    
    // Clear existing inputs
    peopleContainer.innerHTML = '';
    
    // Add new inputs based on count
    for(let i = 1; i <= count; i++) {
      const personDiv = document.createElement('div');
      personDiv.className = 'mb-2';
      
      const label = document.createElement('label');
      label.className = 'form-label';
      label.textContent = `Person ${i}`;
      
      const input = document.createElement('input');
      input.type = 'text';
      input.className = 'form-control person-name';
      input.placeholder = 'Name';
      
      personDiv.appendChild(label);
      personDiv.appendChild(input);
      peopleContainer.appendChild(personDiv);
    }
  }
  
  // Calculate bill split
  const calculateSplitBtn = document.getElementById('calculateSplitBtn');
  const splitResultsContent = document.getElementById('splitResultsContent');
  const amountPerPerson = document.getElementById('amountPerPerson');
  
  if(calculateSplitBtn) {
    calculateSplitBtn.addEventListener('click', function() {
      const billAmount = parseFloat(document.getElementById('billAmount').value);
      const numPeople = parseInt(document.getElementById('numPeople').value);
      const splitMethod = document.querySelector('input[name="splitMethod"]:checked').value;
      
      if(isNaN(billAmount) || billAmount <= 0) {
        showToast('Please enter a valid bill amount.', 'error');
        return;
      }
      
      if(splitMethod === 'equal') {
        const amountPerPersonValue = billAmount / numPeople;
        
        if(splitResultsContent) {
          splitResultsContent.classList.remove('d-none');
        }
        
        if(amountPerPerson) {
          amountPerPerson.innerHTML = '';
          
          const personNames = document.querySelectorAll('.person-name');
          personNames.forEach((input, index) => {
            const name = input.value.trim() || `Person ${index + 1}`;
            
            const personDiv = document.createElement('div');
            personDiv.className = 'alert alert-light d-flex justify-content-between align-items-center mb-2';
            personDiv.innerHTML = `
              <span>${name}</span>
              <span>₹${amountPerPersonValue.toFixed(2)}</span>
            `;
            
            amountPerPerson.appendChild(personDiv);
          });
        }
        
        showToast('Bill split calculated successfully.');
      } else {
        // For percentage split, this would be more complex
        // and require additional inputs for each person's percentage
        showToast('Percentage split is not implemented in this demo.', 'error');
      }
    });
  }
  
  // Goal Based Saving Calculator
  const calculateGoalBtn = document.getElementById('calculateGoalBtn');
  const goalCalculationResult = document.getElementById('goalCalculationResult');
  const monthlyContribution = document.getElementById('monthlyContribution');
  const additionalInfo = document.getElementById('additionalInfo');
  
  if(calculateGoalBtn) {
    calculateGoalBtn.addEventListener('click', function() {
      const goalAmount = parseFloat(document.getElementById('goalAmount').value);
      const timeframe = parseInt(document.getElementById('timeframe').value);
      const initialDeposit = parseFloat(document.getElementById('initialDeposit').value) || 0;
      const interestRate = parseFloat(document.getElementById('interestRate').value) || 0;
      
      if(isNaN(goalAmount) || goalAmount <= 0) {
        showToast('Please enter a valid goal amount.', 'error');
        return;
      }
      
      if(isNaN(timeframe) || timeframe <= 0) {
        showToast('Please enter a valid timeframe.', 'error');
        return;
      }
      
      // Calculate remaining amount after initial deposit
      const remainingAmount = goalAmount - initialDeposit;
      
      let monthlyAmount;
      
      if(interestRate > 0) {
        // Formula for monthly contributions with interest
        // PMT = (FV * r/n) / ((1 + r/n)^(n*t) - 1)
        // Where:
        // FV = Future Value (goal amount)
        // r = annual interest rate (decimal)
        // n = number of compounds per year (12 for monthly)
        // t = time in years
        
        const r = interestRate / 100;  // Convert percentage to decimal
        const n = 12;  // Monthly compounding
        const t = timeframe / 12;  // Convert months to years
        
        const monthlyRate = r / n;
        const numPayments = n * t;
        
        monthlyAmount = (remainingAmount * monthlyRate) / ((Math.pow(1 + monthlyRate, numPayments) - 1));
      } else {
        // Simple calculation without interest
        monthlyAmount = remainingAmount / timeframe;
      }
      
      if(goalCalculationResult) {
        goalCalculationResult.classList.remove('d-none');
      }
      
      if(monthlyContribution) {
        monthlyContribution.textContent = `₹${monthlyAmount.toFixed(2)}`;
      }
      
      if(additionalInfo) {
        let infoText = `To reach your goal of ₹${goalAmount.toFixed(2)} in ${timeframe} months`;
        
        if(initialDeposit > 0) {
          infoText += ` with an initial deposit of ₹${initialDeposit.toFixed(2)}`;
        }
        
        if(interestRate > 0) {
          infoText += ` and ${interestRate}% interest rate`;
        }
        
        additionalInfo.textContent = infoText + '.';
      }
      
      showToast('Monthly contribution calculated!');
    });
  }
  
  // Add Expense Form Submission
  const addExpenseForm = document.getElementById('addExpenseForm');
  if(addExpenseForm) {
    addExpenseForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      const description = document.getElementById('expenseDescription').value;
      const amount = parseFloat(document.getElementById('expenseAmount').value);
      const category = document.getElementById('expenseCategory').value;
      const date = document.getElementById('expenseDate').value;
      const paymentMethod = document.getElementById('expensePaymentMethod').value;
      const notes = document.getElementById('expenseNotes').value;
      
      if(!description || isNaN(amount) || amount <= 0 || !category) {
        showToast('Please fill all required fields.', 'error');
        return;
      }
      
      // In a real app, this would save the expense to a database
      // For demo purposes, we'll just add it to the table
      const transactionTableBody = document.getElementById('transactionTableBody');
      if(transactionTableBody) {
        const dateObj = new Date(date);
        const formattedDate = dateObj.toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' });
        
        const newRow = document.createElement('tr');
        newRow.innerHTML = `
          <td>${formattedDate}</td>
          <td>${description}</td>
          <td>${category}</td>
          <td class="text-danger">-₹${amount.toFixed(2)}</td>
          <td><span class="badge bg-success">Completed</span></td>
        `;
        
        // Insert at the top of the table
        transactionTableBody.insertBefore(newRow, transactionTableBody.firstChild);
      }
      
      // Close modal
      const modal = document.getElementById('addExpenseModal');
      const bsModal = bootstrap.Modal.getInstance(modal);
      if(bsModal) {
        bsModal.hide();
      }
      
      // Reset form
      addExpenseForm.reset();
      
      showToast('Expense added successfully!');
    });
  }
  
  // Add Goal Form Submission
  const addGoalForm = document.getElementById('addGoalForm');
  if(addGoalForm) {
    addGoalForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      const name = document.getElementById('goalName').value;
      const amount = parseFloat(document.getElementById('goalAmount').value);
      const startDate = document.getElementById('goalStartDate').value;
      const endDate = document.getElementById('goalEndDate').value;
      const initialDeposit = parseFloat(document.getElementById('initialDeposit').value) || 0;
      
      if(!name || isNaN(amount) || amount <= 0 || !startDate || !endDate) {
        showToast('Please fill all required fields.', 'error');
        return;
      }
      
      // In a real app, this would save the goal to a database
      // For demo purposes, we'll just add it to the goals container
      const goalsContainer = document.getElementById('goalsContainer');
      if(goalsContainer) {
        const startDateObj = new Date(startDate);
        const endDateObj = new Date(endDate);
        
        const formattedStartDate = startDateObj.toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' });
        const formattedEndDate = endDateObj.toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' });
        
        // Calculate progress percentage based on initial deposit
        const progressPercentage = initialDeposit > 0 ? (initialDeposit / amount) * 100 : 0;
        
        const newGoalCol = document.createElement('div');
        newGoalCol.className = 'col-md-6 col-lg-4 mb-4';
        newGoalCol.innerHTML = `
          <div class="card">
            <div class="card-body">
              <h5 class="card-title">${name}</h5>
              <h6 class="text-muted mb-3">Target: ₹${amount.toFixed(2)}</h6>
              <div class="d-flex justify-content-between mb-2">
                <span>Saved: ₹${initialDeposit.toFixed(2)}</span>
                <span>${progressPercentage.toFixed(0)}% Complete</span>
              </div>
              <div class="progress goal-progress">
                <div class="progress-bar bg-success" role="progressbar" style="width: ${progressPercentage}%" 
                  aria-valuenow="${progressPercentage}" aria-valuemin="0" aria-valuemax="100"></div>
              </div>
              <div class="d-flex justify-content-between mt-3">
                <small>Started: ${formattedStartDate}</small>
                <small>Target: ${formattedEndDate}</small>
              </div>
              <div class="d-grid gap-2 mt-3">
                <button class="btn btn-sm btn-outline-light">Add Funds</button>
              </div>
            </div>
          </div>
        `;
        
        // Insert at the beginning of the container
        goalsContainer.insertBefore(newGoalCol, goalsContainer.firstChild);
      }
      
      // Close modal
      const modal = document.getElementById('addGoalModal');
      const bsModal = bootstrap.Modal.getInstance(modal);
      if(bsModal) {
        bsModal.hide();
      }
      
      // Reset form
      addGoalForm.reset();
      
      showToast('Goal created successfully!');
    });
  }
  
  // Initialize Bootstrap Tooltips, Popovers, and Toasts
  const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
  tooltipTriggerList.map(function (tooltipTriggerEl) {
    return new bootstrap.Tooltip(tooltipTriggerEl);
  });
  
  const popoverTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="popover"]'));
  popoverTriggerList.map(function (popoverTriggerEl) {
    return new bootstrap.Popover(popoverTriggerEl);
  });
  
  // Notifications Dropdown 
  const notificationsLink = document.getElementById('notificationsLink');
  if(notificationsLink) {
    const notificationsMenu = `
      <div class="dropdown-menu dropdown-menu-end p-0 bg-dark" style="width: 300px;">
        <div class="p-2 border-bottom d-flex justify-content-between align-items-center">
          <h6 class="mb-0">Notifications</h6>
          <button class="btn btn-sm btn-link text-light" id="markAllReadBtn">Mark all read</button>
        </div>
        <div style="max-height: 300px; overflow-y: auto;">
          <div class="notification-item unread p-3 border-bottom">
            <div class="d-flex">
              <div class="me-3">
                <i class="fas fa-exclamation-circle text-warning"></i>
              </div>
              <div>
                <p class="mb-1">Your electric bill is due in 3 days.</p>
                <small class="text-muted">1 hour ago</small>
              </div>
            </div>
          </div>
          <div class="notification-item unread p-3 border-bottom">
            <div class="d-flex">
              <div class="me-3">
                <i class="fas fa-chart-line text-success"></i>
              </div>
              <div>
                <p class="mb-1">You've reached 50% of your "New Laptop" savings goal!</p>
                <small class="text-muted">5 hours ago</small>
              </div>
            </div>
          </div>
          <div class="notification-item unread p-3 border-bottom">
            <div class="d-flex">
              <div class="me-3">
                <i class="fas fa-credit-card text-danger"></i>
              </div>
              <div>
                <p class="mb-1">Unusual spending detected in Entertainment category.</p>
                <small class="text-muted">Yesterday</small>
              </div>
            </div>
          </div>
          <div class="notification-item p-3 border-bottom">
            <div class="d-flex">
              <div class="me-3">
                <i class="fas fa-graduation-cap text-info"></i>
              </div>
              <div>
                <p class="mb-1">New financial course "Investing 101" is now available!</p>
                <small class="text-muted">2 days ago</small>
              </div>
            </div>
          </div>
        </div>
        <div class="p-2 text-center">
          <a href="#" class="text-light">View all notifications</a>
        </div>
      </div>
    `;
    
    // Create dropdown container
    const dropdownContainer = document.createElement('div');
    dropdownContainer.className = 'dropdown';
    
    // Move notification link into dropdown container
    const parent = notificationsLink.parentNode;
    parent.replaceChild(dropdownContainer, notificationsLink);
    dropdownContainer.appendChild(notificationsLink);
    
    // Add dropdown attributes
    notificationsLink.setAttribute('data-bs-toggle', 'dropdown');
    notificationsLink.setAttribute('aria-expanded', 'false');
    
    // Add dropdown menu to container
    dropdownContainer.insertAdjacentHTML('beforeend', notificationsMenu);
    
    // Initialize dropdown
    new bootstrap.Dropdown(notificationsLink);
  }
});