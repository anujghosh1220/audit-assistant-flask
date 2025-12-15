// Toggle sidebar on button click
$(document).ready(function () {
    // Toggle sidebar
    $('#sidebarCollapse').on('click', function () {
        $('#sidebar').toggleClass('active');
        $('#content').toggleClass('active');
    });

    // Initialize tooltips
    var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
    var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
        return new bootstrap.Tooltip(tooltipTriggerEl);
    });

    // Handle checklist item clicks
    $('.checklist-item').on('click', function() {
        $(this).toggleClass('completed');
        const itemId = $(this).data('item-id');
        // Here you would typically make an AJAX call to update the item status
        console.log(`Toggled item ${itemId}`);
    });

    // Handle form submissions
    $('form.ajax-form').on('submit', function(e) {
        e.preventDefault();
        const form = $(this);
        const submitBtn = form.find('button[type="submit"]');
        const originalText = submitBtn.html();
        
        // Show loading state
        submitBtn.prop('disabled', true).html('<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> Processing...');
        
        // Simulate AJAX call
        setTimeout(function() {
            // Reset button state
            submitBtn.prop('disabled', false).html(originalText);
            
            // Show success message
            const alert = $('<div class="alert alert-success alert-dismissible fade show" role="alert">' +
                          'Changes saved successfully!' +
                          '<button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>' +
                          '</div>');
            
            form.prepend(alert);
            
            // Auto-hide alert after 3 seconds
            setTimeout(function() {
                alert.alert('close');
            }, 3000);
        }, 1000);
    });

    // Initialize DataTables if present
    if ($.fn.DataTable) {
        $('.datatable').DataTable({
            responsive: true,
            pageLength: 10,
            language: {
                search: "_INPUT_",
                searchPlaceholder: "Search...",
            },
            dom: "<'row'<'col-sm-12 col-md-6'l><'col-sm-12 col-md-6'f>>" +
                 "<'row'<'col-sm-12'tr>>" +
                 "<'row'<'col-sm-12 col-md-5'i><'col-sm-12 col-md-7'p>>"
        });
    }

    // Handle chat message submission
    $('#chatForm').on('submit', function(e) {
        e.preventDefault();
        const input = $('#chatInput');
        const message = input.val().trim();
        
        if (message) {
            // Add user message to chat
            addMessage('user', message);
            input.val('');
            
            // Simulate bot response
            setTimeout(function() {
                const responses = [
                    "I understand you're asking about " + message + ". How can I assist you further?",
                    "That's an interesting point about " + message + ". Let me look that up for you.",
                    "I can help you with " + message + ". What specific information do you need?",
                    "For " + message + ", you might want to check the documentation or contact support."
                ];
                const response = responses[Math.floor(Math.random() * responses.length)];
                addMessage('bot', response);
            }, 1000);
        }
    });
});

// Function to add message to chat
function addMessage(sender, message) {
    const chatContainer = $('.chat-messages');
    const messageClass = sender === 'user' ? 'user-message' : 'bot-message';
    const messageHtml = `
        <div class="chat-message ${messageClass} mb-3">
            <div class="message-content">
                <div class="message-text">${message}</div>
                <div class="message-time text-muted small">${new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</div>
            </div>
        </div>
    `;
    
    chatContainer.append(messageHtml);
    chatContainer.scrollTop(chatContainer[0].scrollHeight);
}

// Handle checklist item completion
function toggleChecklistItem(checkbox) {
    const itemId = $(checkbox).data('item-id');
    const isCompleted = $(checkbox).is(':checked');
    
    // Here you would typically make an AJAX call to update the item status
    console.log(`Item ${itemId} ${isCompleted ? 'completed' : 'marked incomplete'}`);
    
    // Update UI
    const listItem = $(checkbox).closest('li');
    if (isCompleted) {
        listItem.addClass('completed');
    } else {
        listItem.removeClass('completed');
    }
}

// Initialize popovers
$(function () {
    $('[data-bs-toggle="popover"]').popover()
});

// Handle file upload preview
function previewFile(input) {
    const file = input.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            $('#filePreview').html(`
                <div class="card">
                    <div class="card-body">
                        <h6 class="card-title">${file.name}</h6>
                        <p class="card-text small text-muted">${(file.size / 1024).toFixed(2)} KB</p>
                        <button type="button" class="btn btn-sm btn-outline-danger" onclick="$('#fileInput').val(''); $('#filePreview').html('');">
                            <i class="bi bi-trash"></i> Remove
                        </button>
                    </div>
                </div>
            `);
        };
        reader.readAsDataURL(file);
    }
}
