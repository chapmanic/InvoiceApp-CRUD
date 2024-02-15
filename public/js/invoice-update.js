document.addEventListener('DOMContentLoaded', () => {
    const updateButtons = document.querySelectorAll('.btn-info'); // Assuming .btn-info is your update button class
    
    updateButtons.forEach(button => {
      button.addEventListener('click', function() {
        const invoiceId = this.getAttribute('data-invoice-id');
        const product = this.getAttribute('data-product');
        const amount = this.getAttribute('data-amount');
        const salesTeam = this.getAttribute('data-sales-team');
  
        // Now populate the modal fields
        document.querySelector('#update-modal #product').value = product;
        document.querySelector('#update-modal #amount').value = amount;
        document.querySelector('#update-modal #sales_team').value = salesTeam;
        
        // Set form action to include invoice ID
        document.querySelector('#update-modal form').action = `/update-invoice/${invoiceId}`;
      });
    });
  });

  document.querySelectorAll('.delete-btn').forEach(button => {
    button.addEventListener('click', function() {
      const invoiceId = this.getAttribute('data-invoice-id');
      const form = document.querySelector('#delete-modal form');
      form.action = `/delete-invoice/${invoiceId}`;
    });
  });
  